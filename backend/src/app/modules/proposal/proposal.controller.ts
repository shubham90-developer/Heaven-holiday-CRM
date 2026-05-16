import { NextFunction, Request, Response } from 'express';
import Proposal from './proposal.model';
import Query from '../query/query.model';
import Booking from '../booking/booking.model';
import {
  createProposalSchema,
  updateProposalSchema,
} from './proposal.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/proposals
export const createProposal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createProposalSchema.parse(req.body);
    const proposal = new Proposal(validatedData);
    await proposal.save();

    // Update query stage to proposalPending
    await Query.findByIdAndUpdate(validatedData.queryId, {
      stage: 'proposalPending',
    });

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Proposal created successfully',
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/proposals/query/:queryId
export const getProposalsByQuery = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const proposals = await Proposal.find({ queryId: req.params.queryId })
      .populate('leadId', 'customerName phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Proposals retrieved successfully',
      data: proposals,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/proposals/:id
export const updateProposal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      next(new appError('Proposal not found', 404));
      return;
    }

    const validatedData = updateProposalSchema.parse(req.body);
    const updated = await Proposal.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Proposal updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/proposals/:id/send  → mark as sent
export const sendProposal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      next(new appError('Proposal not found', 404));
      return;
    }

    proposal.status = 'sent';
    proposal.sentAt = new Date();
    await proposal.save();

    // Update query stage
    await Query.findByIdAndUpdate(proposal.queryId, { stage: 'proposalSent' });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Proposal marked as sent',
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/proposals/:id/accept  → accept + auto create booking
export const acceptProposal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const proposal = await Proposal.findById(req.params.id).populate('queryId');
    if (!proposal) {
      next(new appError('Proposal not found', 404));
      return;
    }

    // Check no other proposal already accepted for this query
    const alreadyAccepted = await Proposal.findOne({
      queryId: proposal.queryId,
      status: 'accepted',
      _id: { $ne: proposal._id },
    });

    if (alreadyAccepted) {
      next(
        new appError(
          'Another proposal is already accepted for this query',
          400,
        ),
      );
      return;
    }

    proposal.status = 'accepted';
    await proposal.save();

    // Update query stage to confirmed
    await Query.findByIdAndUpdate(proposal.queryId, { stage: 'confirmed' });

    // Auto-create booking
    const query = proposal.queryId as any;
    const booking = new Booking({
      proposalId: proposal._id,
      queryId: proposal.queryId,
      leadId: proposal.leadId,
      totalAmount: proposal.totalPrice,
      paidAmount: 0,
      balance: proposal.totalPrice,
      status: 'confirmed',
      paymentStatus: 'pending',
    });
    await booking.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Proposal accepted and booking created',
      data: { proposal, booking },
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/proposals/:id/reject
export const rejectProposal = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      next(new appError('Proposal not found', 404));
      return;
    }

    proposal.status = 'rejected';
    await proposal.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Proposal rejected',
      data: proposal,
    });
  } catch (error) {
    next(error);
  }
};
