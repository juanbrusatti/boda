export interface GalleryImage {
  src: string
  alt: string
}

export interface EventDetail {
  label: string
  value: string
  caption?: string
  icon?: string
}

export interface StoryParagraph {
  text: string
}

export interface EventLocation {
  /** Display name of the venue */
  venue: string
  /** Full readable address */
  address: string
  /** A query string used to build map links (e.g. "Salón Los Robles, Buenos Aires") */
  mapQuery: string
}

export interface TypographyConfig {
  /** Font family name */
  fontFamily: string
  /** Font weight (100-900 in increments of 100) */
  fontWeight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  /** Font style (normal, italic) */
  fontStyle?: 'normal' | 'italic'
  /** Text color for this specific element */
  color?: string
}

export interface SectionTypography {
  /** Typography for main title */
  title?: TypographyConfig
  /** Typography for subtitle */
  subtitle?: TypographyConfig
  /** Typography for body text */
  body?: TypographyConfig
  /** Typography for labels/small text */
  label?: TypographyConfig
}

export interface EventTypography {
  /** Hero section typography */
  hero?: SectionTypography
  /** Countdown section typography */
  countdown?: SectionTypography
  /** Story section typography */
  story?: SectionTypography
  /** Gallery section typography */
  gallery?: SectionTypography
  /** Location section typography */
  location?: SectionTypography
  /** RSVP section typography */
  rsvp?: SectionTypography
  /** Footer typography */
  footer?: SectionTypography
}

export interface ColorConfig {
  /** Background color */
  background?: string
  /** Text color */
  text?: string
  /** Accent color */
  accent?: string
  /** Secondary color */
  secondary?: string
}

export interface SectionColors {
  /** Colors for the section */
  colors?: ColorConfig
}

export interface EventColors {
  /** Hero section colors */
  hero?: SectionColors
  /** Countdown section colors */
  countdown?: SectionColors
  /** Story section colors */
  story?: SectionColors
  /** Gallery section colors */
  gallery?: SectionColors
  /** Location section colors */
  location?: SectionColors
  /** RSVP section colors */
  rsvp?: SectionColors
  /** Footer section colors */
  footer?: SectionColors
  /** Details section colors */
  details?: SectionColors
  /** Details section typography */
  detailsTypography?: SectionTypography
}

export interface EventConfig {
  /** Primary title, e.g. "María & Juan" */
  title: string
  /** Short emotional tagline shown under the title */
  tagline: string
  /** Human readable date, e.g. "20 Febrero 2027" */
  dateLabel: string
  /** ISO date string used by the countdown, e.g. "2027-02-20T19:00:00" */
  dateISO: string
  /** Whether to show the countdown section */
  showCountdown: boolean
  /** Countdown section title */
  countdownTitle: string
  /** Countdown section subtitle */
  countdownSubtitle: string
  /** Short location label for the hero */
  locationLabel: string
  /** Longer marketing/intro description */
  description: string
  /** Hero background image path */
  coverImage: string
  /** Whether to show the story section */
  showStory: boolean
  /** Story title */
  storyTitle: string
  /** Story subtitle */
  storySubtitle: string
  /** Story images (multiple images) */
  storyImages: string[]
  /** Story body paragraphs */
  story: StoryParagraph[]
  /** Key event detail cards (date, time, venue, dress code, etc.) */
  details: EventDetail[]
  /** Whether to show the location section */
  showLocation: boolean
  /** Venue + map info */
  location: EventLocation
  /** Whether to show the gallery section */
  showGallery: boolean
  /** Gallery images */
  gallery: GalleryImage[]
  /** Whether to show the RSVP section */
  showRSVP: boolean
  /** RSVP section copy */
  rsvp: {
    heading: string
    subheading: string
    buttonLabel: string
    /** Optional deadline note */
    deadline: string
  }
  /** Branding shown in the footer */
  brand: {
    name: string
    tagline: string
  }
  /** Typography configuration for each section */
  typography?: EventTypography
  /** Color configuration for each section */
  colors?: EventColors
}

/**
 * Event configuration stored in the database for a client user
 * Links a tenant/user to their selected template and customized event data
 */
export interface EventConfigDB {
  id: string
  /** The tenant this event belongs to */
  tenant_id: string
  /** The user who owns this event configuration */
  user_id: string
  /** The template ID that was selected */
  template_id: string
  /** The customized event configuration data */
  config: EventConfig
  /** Whether the event is published/visible to guests */
  is_published: boolean
  created_at: string
  updated_at: string
  /** Joined tenant data from queries */
  tenants: {
    slug: string
    is_active?: boolean
  }
}
