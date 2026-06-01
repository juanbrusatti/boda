export interface GalleryImage {
  src: string
  alt: string
}

export interface EventDetail {
  label: string
  value: string
  caption?: string
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

export interface EventConfig {
  /** Primary title, e.g. "María & Juan" */
  title: string
  /** Short emotional tagline shown under the title */
  tagline: string
  /** Human readable date, e.g. "20 Febrero 2027" */
  dateLabel: string
  /** ISO date string used by the countdown, e.g. "2027-02-20T19:00:00" */
  dateISO: string
  /** Short location label for the hero */
  locationLabel: string
  /** Longer marketing/intro description */
  description: string
  /** Hero background image path */
  coverImage: string
  /** Image used in the story section */
  storyImage: string
  /** Story heading */
  storyHeading: string
  /** Story body paragraphs */
  story: StoryParagraph[]
  /** Key event detail cards (date, time, venue, dress code, etc.) */
  details: EventDetail[]
  /** Venue + map info */
  location: EventLocation
  /** Gallery images */
  gallery: GalleryImage[]
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
}
