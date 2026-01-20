'use server';

/**
 * @fileOverview Dynamically determines Firestore resource access based on user role.
 *
 * - checkResourceAccess - Checks if a user with a specific role can access a Firestore resource.
 * - CheckResourceAccessInput - The input type for the checkResourceAccess function.
 * - CheckResourceAccessOutput - The return type for the checkResourceAccess function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CheckResourceAccessInputSchema = z.object({
  userRole: z.enum(['admin', 'editor', 'author']).describe('The role of the user.'),
  resourceType: z.string().describe('The type of Firestore resource being accessed (e.g., posts, comments).'),
  operationType: z.enum(['view', 'edit', 'create', 'delete']).describe('The type of operation being performed on the resource.'),
  resourceId: z.string().optional().describe('The ID of the specific resource being accessed.').nullable(),
});
export type CheckResourceAccessInput = z.infer<typeof CheckResourceAccessInputSchema>;

const CheckResourceAccessOutputSchema = z.object({
  hasAccess: z.boolean().describe('Whether the user has access to the resource.'),
  reason: z.string().describe('The reason for the access decision.'),
});
export type CheckResourceAccessOutput = z.infer<typeof CheckResourceAccessOutputSchema>;

export async function checkResourceAccess(input: CheckResourceAccessInput): Promise<CheckResourceAccessOutput> {
  return checkResourceAccessFlow(input);
}

const prompt = ai.definePrompt({
  name: 'checkResourceAccessPrompt',
  input: {schema: CheckResourceAccessInputSchema},
  output: {schema: CheckResourceAccessOutputSchema},
  prompt: `You are an access control expert determining whether a user has access to a Firestore resource.

  Based on the user's role, the resource type, and the operation type, determine if the user has access.

  Consider the following access control rules:

  - Admins have full access to all resources.
  - Editors can view, create, and edit posts and comments, but cannot delete them.
  - Authors can view and create posts, but can only edit their own posts and cannot delete any posts or comments.

  User Role: {{{userRole}}}
  Resource Type: {{{resourceType}}}
  Operation Type: {{{operationType}}}
  Resource ID: {{{resourceId}}}

  Respond with a JSON object indicating whether the user has access and the reason for the decision.

  Make sure that the "hasAccess" field is set to true or false.  If you do not know if the user has access or not, default to "false".
  `,
});

const checkResourceAccessFlow = ai.defineFlow(
  {
    name: 'checkResourceAccessFlow',
    inputSchema: CheckResourceAccessInputSchema,
    outputSchema: CheckResourceAccessOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
