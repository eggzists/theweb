export type Teardown = {
  slug: string;
  /** The product being torn down, e.g. "Swiggy Instamart". */
  product: string;
  title: string;
  /** YYYY-MM-DD */
  date: string;
  excerpt: string;
  /** Optional link to a full write-up hosted elsewhere (Notion, Medium, a PDF…). */
  href?: string;
};

/**
 * Product teardowns, newest first. They show up in the Teardowns section of /projects.
 * Until there's at least one, that section shows a "coming soon" state.
 */
export const teardowns: Teardown[] = [];
