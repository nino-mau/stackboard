/**
 * Check if a given github repo exist with github API
 */
export async function isGithubRepoValid(url: string) {
  const repoInfo = extractGitHubRepoPath(url);

  if (!repoInfo) return false;

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`,
      {
        method: 'HEAD'
      }
    );

    return response.status === 200;
  } catch {
    return false;
  }
}

/**
 * Extract owner/repo name from a github repo url
 */
export function extractGitHubRepoPath(url: string) {
  if (!url) return null;
  const match = url.match(
    /^https?:\/\/(www\.)?github.com\/([\w.-]+)\/([\w.-]+?)(?:\.git)?(?:\/|$|\?|#)/
  );

  if (!match || !match[2] || !match[3]) return null;

  return { owner: match[2], repo: match[3] };
}
