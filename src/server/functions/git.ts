import { createServerFn } from '@tanstack/react-start';
import { isGithubRepoValid } from '@/lib/git';

/**
 * Validate a github repo url
 */
export const validateGithubRepoUrl = createServerFn({ method: 'GET' })
  .inputValidator((url: string) => url)
  .handler(async ({ data: url }) => {
    return await isGithubRepoValid(url);
  });
