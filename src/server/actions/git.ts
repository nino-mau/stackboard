'use server';

import { isGithubRepoValid } from '@/lib/git';

/**
 * Server function to validate a github repo url
 */
export async function validateGithubRepoUrl(url: string) {
  return await isGithubRepoValid(url);
}
