// src/routes/entry.routes.js
import { Router } from 'express';
import * as entryController from '../controllers/entry.controller.js';
import { validate } from '../middlewares/validation.middleware.js';
import { createEntrySchema, updateEntrySchema, listEntryQuerySchema } from '../utils/validationSchemas.js';

const router = Router();

// POST /api/entries - Add New Entry
router.post(
    '/', 
    validate(createEntrySchema), 
    entryController.addEntry
);

// GET /api/entries - List Entries with Pagination & Search
router.get(
    '/', 
    validate(listEntryQuerySchema), 
    entryController.listEntries
);

// PUT /api/entries/:id - Edit Entry
router.put(
    '/:id', 
    validate(updateEntrySchema), 
    entryController.editEntry
);

// DELETE /api/entries/:id - Delete Entry
router.delete(
    '/:id', 
    entryController.deleteEntry
);

export default router;
