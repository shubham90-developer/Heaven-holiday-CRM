import { NextFunction, Request, Response } from 'express';
import FollowUp from './followUp.model';
import {
  createFollowUpSchema,
  updateFollowUpSchema,
} from './followUp.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/followups
export const createFollowUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createFollowUpSchema.parse(req.body);
    const followUp = new FollowUp(validatedData);
    await followUp.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Follow up created successfully',
      data: followUp,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/followups  (today's + upcoming)
export const getAllFollowUps = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { assignedTo, leadId, isCompleted, date } = req.query;

    const filter: any = {};
    if (assignedTo) filter.assignedTo = assignedTo;
    if (leadId) filter.leadId = leadId;
    if (isCompleted !== undefined) filter.isCompleted = isCompleted === 'true';

    // Filter by specific date (today by default)
    if (date) {
      const start = new Date(date as string);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date as string);
      end.setHours(23, 59, 59, 999);
      filter.followUpDate = { $gte: start, $lte: end };
    }

    const followUps = await FollowUp.find(filter)
      .populate('leadId', 'customerName phone')
      .populate('assignedTo', 'firstName lastName')
      .populate('queryId', 'queryNumber')
      .sort({ followUpDate: 1, followUpTime: 1 });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Follow ups retrieved successfully',
      data: followUps,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/followups/lead/:leadId  (all followups of a lead = touch point history)
export const getFollowUpsByLead = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const followUps = await FollowUp.find({ leadId: req.params.leadId })
      .populate('assignedTo', 'firstName lastName')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      statusCode: 200,
      message: 'Touch point history retrieved',
      data: followUps,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/followups/:id
export const updateFollowUp = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const followUp = await FollowUp.findById(req.params.id);
    if (!followUp) {
      next(new appError('Follow up not found', 404));
      return;
    }

    const validatedData = updateFollowUpSchema.parse(req.body);
    const updated = await FollowUp.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    )
      .populate('leadId', 'customerName phone')
      .populate('assignedTo', 'firstName lastName');

    res.json({
      success: true,
      statusCode: 200,
      message: 'Follow up updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/followups/:id/complete
export const markComplete = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const followUp = await FollowUp.findById(req.params.id);
    if (!followUp) {
      next(new appError('Follow up not found', 404));
      return;
    }

    followUp.isCompleted = true;
    await followUp.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Follow up marked as completed',
      data: followUp,
    });
  } catch (error) {
    next(error);
  }
};
