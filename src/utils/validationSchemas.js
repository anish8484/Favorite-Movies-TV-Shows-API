// src/utils/validationSchemas.js
import { z } from 'zod';

const entryTypeEnum = z.enum(['Movie', 'TVShow'], {
    required_error: "Type is required",
    invalid_type_error: "Type must be 'Movie' or 'TVShow'",
});

const baseEntrySchema = z.object({
    title: z.string().trim().min(1, "Title is required."),
    type: entryTypeEnum,
    director: z.string().trim().min(1, "Director is required."),
    budget: z.string().trim().min(1, "Budget is required."),
    location: z.string().trim().min(1, "Location is required."),
    duration: z.string().trim().min(1, "Duration is required."),
    yearTime: z.string().trim().min(1, "Year/Time is required."),
});

// Schema for creating a new entry
export const createEntrySchema = baseEntrySchema;

// Schema for updating an existing entry (all fields are optional, but if provided, must be valid)
export const updateEntrySchema = z.object({
    title: z.string().trim().min(1, "Title cannot be empty.").optional(),
    type: entryTypeEnum.optional(),
    director: z.string().trim().min(1, "Director cannot be empty.").optional(),
    budget: z.string().trim().min(1, "Budget cannot be empty.").optional(),
    location: z.string().trim().min(1, "Location cannot be empty.").optional(),
    duration: z.string().trim().min(1, "Duration cannot be empty.").optional(),
    yearTime: z.string().trim().min(1, "Year/Time cannot be empty.").optional(),
}).refine(data => Object.keys(data).length > 0, {
    message: "Request body must contain at least one field to update.",
});

// Schema for query parameters in list endpoint
export const listEntryQuerySchema = z.object({
    page: z.string().optional().default('1').transform(val => parseInt(val) || 1).pipe(z.number().int().min(1)),
    limit: z.string().optional().default('10').transform(val => parseInt(val) || 10).pipe(z.number().int().min(1).max(100)),
    search: z.string().trim().optional(), // For Bonus feature
});
