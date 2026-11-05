/**
 * Represents a feature displayed in the footer.
 */
export interface FooterFeature {
  id: number;
  icon: string;
  title: string;
  description: string;
}

/**
 * Represents a navigation link displayed in the footer.
 */
export interface FooterLink {
  id: number;
  label: string;
  route: string;
}