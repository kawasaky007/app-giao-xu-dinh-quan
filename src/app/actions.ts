'use server';

import { checkResourceAccess, CheckResourceAccessInput, CheckResourceAccessOutput } from '@/ai/flows/role-based-resource-access';
import { z } from 'zod';

const CheckResourceAccessInputSchema = z.object({
  userRole: z.enum(['admin', 'editor', 'author']),
  resourceType: z.string(),
  operationType: z.enum(['view', 'edit', 'create', 'delete']),
});

export async function handleCheckAccess(
  data: Omit<CheckResourceAccessInput, "resourceId">
): Promise<CheckResourceAccessOutput> {
  const parsedData = CheckResourceAccessInputSchema.safeParse(data);

  if (!parsedData.success) {
    return {
      hasAccess: false,
      reason: 'Invalid input data provided to the server.',
    };
  }

  // The AI flow expects resourceId to be optional, so we'll pass null for this simulation.
  const inputWithId = { ...parsedData.data, resourceId: null };

  try {
    const result = await checkResourceAccess(inputWithId);
    return result;
  } catch (error) {
    console.error('Error calling GenAI flow:', error);
    return {
      hasAccess: false,
      reason: 'An unexpected error occurred while checking access with the AI model.',
    };
  }
}
