/**
 * Guest reviews. Powers the home-page rail and the /reviews page.
 *
 * Only genuine Falcon Trails reviews go here, each one traceable to the
 * Google Business Profile or a written message from the guest. Fabricated or
 * borrowed testimonials are a consumer-protection and Google policy risk.
 * Sections that show reviews hide themselves while this list is empty.
 */
export type Review = {
  quote: string;
  author: string;
  from: string;
  trip: string;
  /** Travel month, when known. */
  month?: string;
  rating: 5 | 4;
};

export const REVIEWS: Review[] = [];
