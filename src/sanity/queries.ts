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

export interface Hero {
  _id: string
  title: string
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
}

// Queries
export const POSTS_QUERY = defineQuery(/* groq */ `
  *[_type == "post"] | order(_createdAt desc) {
    _id,
    title,
    slug
  }
`)

export const HERO_QUERY = defineQuery(/* groq */ `
  *[_type == "hero" && isActive == true] | order(_createdAt desc) [0] {
    _id,
    title,
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
    isActive
  }
`)

