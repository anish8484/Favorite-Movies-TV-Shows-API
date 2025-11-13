// src/controllers/entry.controller.js
import * as entryService from '../services/entry.service.js';

// 1. Add New Entry
export const addEntry = async (req, res) => {
    try {
        const newEntry = await entryService.createEntry(req.body);
        res.status(201).json({ 
            message: "Entry added successfully", 
            data: newEntry 
        });
    } catch (error) {
        // Handle unique constraint violation (Prisma error code P2002)
        if (error.code === 'P2002') {
            return res.status(409).json({ message: `Entry with title '${req.body.title}' already exists.` });
        }
        console.error("Error adding entry:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// 2. List Entries
export const listEntries = async (req, res) => {
    try {
        const { page, limit, search } = req.query; // req.query is pre-parsed by validation middleware

        const result = await entryService.findEntries(page, limit, search);

        res.status(200).json({
            message: "Entries retrieved successfully",
            ...result,
        });
    } catch (error) {
        console.error("Error listing entries:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// 3. Edit Entry
export const editEntry = async (req, res) => {
    const { id } = req.params;
    try {
        // Check if entry exists before updating
        const existingEntry = await entryService.getEntryById(id);
        if (!existingEntry) {
            return res.status(404).json({ message: "Entry not found." });
        }

        const updatedEntry = await entryService.updateEntry(id, req.body);
        res.status(200).json({ 
            message: "Entry updated successfully", 
            data: updatedEntry 
        });
    } catch (error) {
        if (error.code === 'P2025') { // Not found error from Prisma
             return res.status(404).json({ message: "Entry not found." });
        }
        console.error("Error editing entry:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};

// 4. Delete Entry
export const deleteEntry = async (req, res) => {
    const { id } = req.params;
    try {
        await entryService.deleteEntry(id);
        res.status(204).send(); // No content response for successful deletion
    } catch (error) {
        if (error.code === 'P2025') { // Not found error from Prisma
            return res.status(404).json({ message: "Entry not found." });
        }
        console.error("Error deleting entry:", error);
        res.status(500).json({ message: "Internal server error." });
    }
};
