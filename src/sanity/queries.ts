import { defineQuery } from 'groq'

// Types
export interface Post {
  _id: string
  title: string
  slug: { current: string } | null
}

export interface CTAButton {
  label: string
  link: string
  variant: 'primary' | 'secondary' | 'outline'
}

export interface Statistic {
  number: string
  label: string
}

export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'linkedin' | 'facebook'
  url: string
}

export interface Hero {
  _id: string
  titlePart1: string
  titlePart2: string
  subtitle?: string
  description?: string
  backgroundImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  ctaButtons?: CTAButton[]
  alignment?: 'left' | 'center' | 'right'
  isActive?: boolean
  statistics?: Statistic[]
  socialLinks?: SocialLink[]
  availabilityStatus?: string
}

export interface CaseStudy {
  _id: string
  title: string
  client?: string
  highlight?: string
  description?: string
  image: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string | null
  }
  backgroundColor?: string
  isFeatured?: boolean
  link?: string
  order?: number
  isActive?: boolean
}

// Queries
export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug
  }
`)

export const HERO_QUERY = `
  *[_type == "hero" && (!defined(isActive) || isActive == true)] | order(_createdAt desc) [0] {
    _id,
    titlePart1,
    titlePart2,
    subtitle,
    description,
    backgroundImage {
      asset,
      alt
    },
    ctaButtons[] {
      label,
      link,
      variant
    },
    alignment,
    isActive,
    statistics[] {
      number,
      label
    },
    socialLinks[] {
      platform,
      url
    },
    availabilityStatus
  }
`

export const CASE_STUDIES_QUERY = `
  *[_type == "caseStudy" && (!defined(isActive) || isActive == true)] | order(order asc, _createdAt desc) {
    _id,
    title,
    client,
    highlight,
    description,
    image {
      asset,
      alt
    },
    backgroundColor,
    isFeatured,
    link,
    order,
    isActive
  }
`

