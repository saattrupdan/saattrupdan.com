export const SITE_URL = "https://saattrupdan.com";
export const SITE_NAME = "Dan Saattrup Smart";
export const AUTHOR_NAME = "Dan Saattrup Smart";
export const AUTHOR_JOB_TITLE = "Principal AI Specialist";
export const AUTHOR_AFFILIATION = "Alexandra Institute";

export const SAME_AS = [
  "https://github.com/saattrupdan",
  "https://www.linkedin.com/in/saattrupdan/",
  "https://scholar.google.com/citations?user=aNojQDEAAAAJ&hl=en",
  "https://orcid.org/0000-0001-9227-1470",
];

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
