import { NextFunction, Request, Response } from 'express';
import EmailTemplate from './email.model';
import {
  createEmailTemplateSchema,
  updateEmailTemplateSchema,
  emailTemplateQuerySchema,
} from './email.validation';
import { appError } from '../../errors/appError';

// POST /v1/api/email-templates
export const createEmailTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const validatedData = createEmailTemplateSchema.parse(req.body);
    const template = new EmailTemplate(validatedData);
    await template.save();

    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Email template created successfully',
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/email-templates
// Supports: ?templateName=&subject=&status=&search=&page=&limit=
export const getAllEmailTemplates = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { templateName, subject, status, search, page, limit } =
      emailTemplateQuerySchema.parse(req.query);

    const filter: any = {};

    if (status) filter.status = status;
    if (templateName) filter.templateName = new RegExp(templateName, 'i');
    if (subject) filter.subject = new RegExp(subject, 'i');
    if (search) filter.$text = { $search: search };

    const skip = (page - 1) * limit;

    const [templates, total] = await Promise.all([
      EmailTemplate.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      EmailTemplate.countDocuments(filter),
    ]);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Email templates retrieved successfully',
      data: templates,
      pagination: { total, page, limit },
    });
  } catch (error) {
    next(error);
  }
};

// GET /v1/api/email-templates/:id
export const getEmailTemplateById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return next(new appError('Email template not found', 404));

    res.json({
      success: true,
      statusCode: 200,
      message: 'Email template retrieved successfully',
      data: template,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/email-templates/:id
export const updateEmailTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return next(new appError('Email template not found', 404));

    const validatedData = updateEmailTemplateSchema.parse(req.body);
    const updated = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      validatedData,
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: 'Email template updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /v1/api/email-templates/:id
export const deleteEmailTemplate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return next(new appError('Email template not found', 404));

    await EmailTemplate.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      statusCode: 200,
      message: 'Email template deleted successfully',
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

// PATCH /v1/api/email-templates/:id/status  — toggle active/deactive
export const toggleEmailTemplateStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const template = await EmailTemplate.findById(req.params.id);
    if (!template) return next(new appError('Email template not found', 404));

    const newStatus = template.status === 'active' ? 'deactive' : 'active';
    const updated = await EmailTemplate.findByIdAndUpdate(
      req.params.id,
      { status: newStatus },
      { new: true },
    );

    res.json({
      success: true,
      statusCode: 200,
      message: `Email template ${newStatus === 'active' ? 'activated' : 'deactivated'} successfully`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};
