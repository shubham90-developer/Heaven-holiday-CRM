import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import Staff from '../modules/staff/staff.model';
import SuperAdmin from '../modules/auth/superAdmin';
import { userInterface } from '../modules/auth/userInterface';
import { appError } from '../errors/appError';

export const auth = (...requiredRoles: string[]) => {
  return async (req: userInterface, res: Response, next: NextFunction) => {
    try {
      // 1) Extract token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return next(
          new appError('Authentication required. No token provided.', 401),
        );
      }

      const parts = authHeader.split(' ');
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return next(
          new appError(
            "Invalid authorization format. Expected 'Bearer <token>'.",
            401,
          ),
        );
      }
      const token = parts[1];

      // 2) Ensure JWT secret is configured
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        return next(
          new appError('Server misconfiguration: JWT secret not set.', 500),
        );
      }

      // 3) Verify and decode token
      const decoded = jwt.verify(token, secret) as JwtPayload | string;

      // Supports both `id` (staff/superadmin tokens) and `userId` (legacy tokens)
      const userId =
        typeof decoded === 'object' && decoded
          ? (decoded as any).id || (decoded as any).userId
          : undefined;

      if (!userId) {
        return next(
          new appError('Invalid token payload: missing user id.', 401),
        );
      }

      let user: any = null;

      user = await Staff.findById(userId);
      if (!user) {
        user = await SuperAdmin.findById(userId);
      }

      if (!user) {
        return next(new appError('User not found or account deleted.', 401));
      }

      // 5) Block archived or inactive staff accounts
      if (user.archived === true || user.status === 'inactive') {
        return next(new appError('Your account has been disabled.', 403));
      }

      // 6) Attach user to request object
      req.user = user;

      // 7) Role-based authorization — check if user's role is allowed
      if (requiredRoles.length > 0) {
        const userRole = (user.role ?? '').toString();
        if (!requiredRoles.includes(userRole)) {
          return next(
            new appError(
              'You do not have permission to perform this action.',
              403,
            ),
          );
        }
      }

      return next();
    } catch (err: any) {
      if (err.name === 'TokenExpiredError') {
        return next(new appError('Token expired. Please login again.', 401));
      }
      if (err.name === 'JsonWebTokenError') {
        return next(new appError('Invalid token. Please login again.', 401));
      }
      return next(new appError('Authentication failed.', 401));
    }
  };
};
