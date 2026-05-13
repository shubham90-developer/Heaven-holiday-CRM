import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import SuperAdmin from './superAdmin';
import Staff from '../staff/staff.model';

// ─── Seed Superadmin ──────────────────────────────────────────────────────────
export const seedSuperAdmin = async () => {
  const email = process.env.SUPERADMIN_EMAIL!;
  const password = process.env.SUPERADMIN_PASSWORD!;
  if (!email || !password) {
    console.error('Superadmin credentials not set in .env');
    return;
  }
  const existing = await SuperAdmin.findOne({ email });
  if (!existing) {
    await SuperAdmin.create({ email, password });
    console.log('Superadmin seeded successfully');
  } else {
    console.log('Superadmin already exists');
  }
};

// ─── Superadmin Login ─────────────────────────────────────────────────────────
export const superadminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const SECRET = process.env.JWT_SECRET!;
    if (!email || !password) {
      res.status(400).json({ message: 'Email and password required' });
      return;
    }

    const superadmin = await SuperAdmin.findOne({ email }).select('+password');
    if (!superadmin || !(await superadmin.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: superadmin._id, role: 'superadmin' }, SECRET, {
      expiresIn: '1d',
    });

    res.json({
      success: true,
      message: 'Superadmin logged in successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── Staff Login ──────────────────────────────────────────────────────────────
export const staffLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const SECRET = process.env.JWT_SECRET!;
    const staff = await Staff.findOne({ email }).select('+password');
    if (!staff || !(await staff.comparePassword(password))) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    if (staff.archived || staff.status !== 'active') {
      res.status(403).json({ message: 'Account is disabled' });
      return;
    }

    const token = jwt.sign({ id: staff._id, role: 'staff' }, SECRET, {
      expiresIn: '1d',
    });

    res.json({
      success: true,
      message: 'Staff logged in successfully',
      token,
      permissions: staff.permissions, // ← add this
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// ─── Authenticate Middleware ──────────────────────────────────────────────────
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization?.split(' ')[1];
  const SECRET = process.env.JWT_SECRET!;
  if (!token) {
    res.status(401).json({ message: 'No token provided' });
    return;
  }
  try {
    (req as any).user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// ─── Role Guard ───────────────────────────────────────────────────────────────
export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || !roles.includes(user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
};

// ─── Permission Guard ─────────────────────────────────────────────────────────
export const checkPermission = (permissionKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = (req as any).user;
      const staff = await Staff.findById(user.id);
      if (!staff) {
        res.status(404).json({ message: 'Staff not found' });
        return;
      }
      const section = staff.permissions.find((p) => p.key === permissionKey);
      if (!section?.isAllowed) {
        res.status(403).json({ message: 'Permission denied' });
        return;
      }
      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};
