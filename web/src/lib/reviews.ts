/**
 * Guest reviews. Powers the home-page rail, the /reviews page and the
 * AggregateRating JSON-LD.
 *
 * Only put genuine reviews here: fabricated testimonials with
 * Review schema attached are a Google policy violation and a real legal risk.
 * Add more from the Google Business Profile as they come in.
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

/**
 * Empty on purpose. The testimonials that shipped with this codebase belonged
 * to another business. Add Falcon Trails' own guest reviews here (with the
 * guest's permission) as they come in; the home-page rail, the /reviews page
 * and the header/footer links stay hidden while this list is empty.
 */
export const REVIEWS: Review[] = [];
