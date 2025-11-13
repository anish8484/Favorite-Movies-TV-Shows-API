// src/services/entry.service.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 1. Add New Entry
export const createEntry = (data) => {
    return prisma.entry.create({ data });
};

// 2. List Entries (with Pagination & Search)
export const findEntries = async (page, limit, search) => {
    const skip = (page - 1) * limit;
    
    const where = search ? {
        title: {
            contains: search, // Case-sensitive by default in PostgreSQL
            mode: 'insensitive', // Use 'insensitive' for case-insensitive search (requires Prisma >= 2.17)
        }
    } : {};

    const [entries, totalEntries] = await prisma.$transaction([
        prisma.entry.findMany({
            where,
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc',
            }
        }),
        prisma.entry.count({ where }),
    ]);

    const totalPages = Math.ceil(totalEntries / limit);

    return { entries, totalEntries, totalPages, currentPage: page };
};

// 3. Edit Entry
export const updateEntry = (id, data) => {
    return prisma.entry.update({
        where: { id },
        data,
    });
};

// 4. Delete Entry
export const deleteEntry = (id) => {
    return prisma.entry.delete({
        where: { id },
    });
};

// Helper to check if an entry exists
export const getEntryById = (id) => {
    return prisma.entry.findUnique({
        where: { id },
    });
};
