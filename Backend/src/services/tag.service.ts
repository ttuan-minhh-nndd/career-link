// ============================================
// FILE: src/services/tag.service.ts (NEW)
// ============================================
import { db } from '../config/db';
import { tags } from '../models/schema';
import { asc } from 'drizzle-orm';

/**
 * @desc    Get all expertise tags from the database
 * @returns An array of all tag objects
 */
export const getAllTags = async () => {
  try {
    const allTags = await db
      .select({
        id: tags.id,
        name: tags.name,
      })
      .from(tags)
      .orderBy(asc(tags.name)); // Order them alphabetically

    return allTags;
  } catch (error) {
    console.error('Error fetching tags:', error);
    // Re-throw the error to be handled by the controller
    throw new Error('Database error while fetching tags');
  }
};