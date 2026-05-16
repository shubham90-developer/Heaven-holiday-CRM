import { NextFunction, Request, Response } from 'express';
import Booking from './booking.model';
import { updateBookingSchema } from './booking.validation';
import { appError } from '../../errors/appError';

// GET /v1/api/bookings
export const getAllBookings = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { status, paymentStatus, page = 1, limit = 20 } = req.query;

    const filter: any = {};
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const skip = (Number(page) - 1) * Number(limit);

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate('leadId', 'customerName phone email type')
        .populate('queryId', 'queryNumber goingTo travelDate travelers')
        .populate('proposalId', 'totalPrice')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Booking.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Bookings retrieved successfully',
      data: bookings,
      pagination: { total, page: Number(page), limit: Number(limit) },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/bookings/:id
export const getBookingById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('leadId', 'customerName phone email type')
      .populate(
        'queryId',
        'queryNumber goingTo goingFrom travelDate travelers noOfDays',
      )
      .populate('proposalId');

    if (!booking) {
      next(new appError('Booking not found', 404));
      return;
    }

    res.json({
      success: true,
      statusCode: 200,
      message: 'Booking retrieved successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/bookings/:id  (update payment)
export const updateBooking = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      next(new appError('Booking not found', 404));
      return;
    }

    const validatedData = updateBookingSchema.parse(req.body);

    // Auto-calculate balance and payment status if paidAmount changes
    if (validatedData.paidAmount !== undefined) {
      booking.paidAmount = validatedData.paidAmount;
      booking.balance = booking.totalAmount - validatedData.paidAmount;

      if (booking.balance <= 0) {
        booking.paymentStatus = 'completed';
      } else if (validatedData.paidAmount > 0) {
        booking.paymentStatus = 'partial';
      } else {
        booking.paymentStatus = 'pending';
      }
    }

    if (validatedData.status) booking.status = validatedData.status;
    await booking.save();

    res.json({
      success: true,
      statusCode: 200,
      message: 'Booking updated successfully',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
