'use server';

/**
 * @fileOverview A blog post summarization and keyword generation AI agent.
 *
 * - summarizeBlogPost - A function that handles the blog post summarization and keyword generation process.
 * - SummarizeBlogPostInput - The input type for the summarizeBlogPost function.
 * - SummarizeBlogPostOutput - The return type for the summarizeBlogPost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeBlogPostInputSchema = z.object({
  blogPostContent: z.string().describe('The content of the blog post.'),
});
export type SummarizeBlogPostInput = z.infer<typeof SummarizeBlogPostInputSchema>;

const SummarizeBlogPostOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the blog post.'),
  keywords: z.array(z.string()).describe('Relevant keywords for the blog post.'),
});
export type SummarizeBlogPostOutput = z.infer<typeof SummarizeBlogPostOutputSchema>;

export async function summarizeBlogPost(input: SummarizeBlogPostInput): Promise<SummarizeBlogPostOutput> {
  return summarizeBlogPostFlow(input);
}

const summarizeBlogPostPrompt = ai.definePrompt({
  name: 'summarizeBlogPostPrompt',
  input: {schema: SummarizeBlogPostInputSchema},
  output: {schema: SummarizeBlogPostOutputSchema},
  prompt: `You are an expert content summarizer and SEO optimizer for technical blog posts. Read the following blog post and provide a concise summary of the main idea and generate relevant keywords to improve SEO and reader understanding.

Blog Post Content: {{{blogPostContent}}}

Summary:
Keywords:`, // Removed Handlebars `{{#each keywords}}` as Handlebars cannot perform complex logic or function calls.
});

const summarizeBlogPostFlow = ai.defineFlow(
  {
    name: 'summarizeBlogPostFlow',
    inputSchema: SummarizeBlogPostInputSchema,
    outputSchema: SummarizeBlogPostOutputSchema,
  },
  async input => {
    const {output} = await summarizeBlogPostPrompt(input);
    return output!;
  }
);
