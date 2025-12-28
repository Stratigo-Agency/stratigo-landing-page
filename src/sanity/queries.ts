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
  backgroundVideo?: {
    asset?: {
      _id?: string
      url?: string
      _type?: string
    }
  }
  backgroundVideoUrl?: string
  ctaButton?: {
    label: string
    link: string
  }
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

export interface Deliverable {
  _id: string
  title: string
  highlight?: string
  description?: string
  image: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string | null
  }
  order?: number
  isActive?: boolean
}

export interface CreateWithUs {
  _id: string
  title: string
  highlight?: string
  description?: string
  image: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string | null
  }
  order?: number
  isActive?: boolean
}

export interface CTA {
  _id: string
  tagline: string
  description: string
  buttonText: string
  whatsappLink: string
  backgroundImage: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string | null
  }
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
    backgroundVideo {
      asset-> {
        _id,
        url,
        _type
      }
    },
    backgroundVideoUrl,
    ctaButton {
      label,
      link
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

export const DELIVERABLES_QUERY = `
  *[_type == "deliverable" && (!defined(isActive) || isActive == true)] | order(order asc, _createdAt desc) {
    _id,
    title,
    highlight,
    description,
    image {
      asset,
      alt
    },
    order,
    isActive
  }
`

export const CREATE_WITH_US_QUERY = `
  *[_type == "createWithUs" && (!defined(isActive) || isActive == true)] | order(order asc, _createdAt desc) {
    _id,
    title,
    highlight,
    description,
    image {
      asset,
      alt
    },
    order,
    isActive
  }
`

export const CTA_QUERY = `
  *[_type == "cta" && (!defined(isActive) || isActive == true)] | order(_createdAt desc) [0] {
    _id,
    tagline,
    description,
    buttonText,
    whatsappLink,
    backgroundImage {
      asset,
      alt
    },
    isActive
  }
`

