import { defineQuery } from 'groq'

// Types
export interface Post {
  _id: string
  title: string
  slug: { current: string } | null
}

export interface Statistic {
  number: string
  label: string
}

export interface CTAButton {
  label: string
  link: string
  isExternal?: boolean
  variant?: 'primary' | 'secondary' | 'outline'
}

export interface Hero {
  _id: string
  title: string
  subtitle?: string
  imageGallery: Array<{
    image: {
      asset: {
        _ref: string
        _type: string
      }
      alt?: string
      hotspot?: {
        x: number
        y: number
        height: number
        width: number
      }
      crop?: {
        top: number
        bottom: number
        left: number
        right: number
      }
    }
    orientation: 'portrait' | 'landscape'
  }>
  ctaButtons?: CTAButton[]
  isActive?: boolean
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

export interface PageSections {
  _id: string
  caseStudiesTitle: string
  deliverablesTitle: string
  createWithUsTitle: string
  isActive?: boolean
}

export interface PricingFeature {
  feature: string
  description?: string
}

export interface PricingPackage {
  _id: string
  packageName: string
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string | null
  }
  price: string
  features: PricingFeature[]
  isPopular?: boolean
  ctaButton?: {
    label: string
    link: string
  }
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
    title,
    subtitle,
    imageGallery[] {
      image {
        asset,
        alt,
        hotspot,
        crop
      },
      orientation
    },
    ctaButtons[] {
      label,
      link,
      isExternal,
      variant
    },
    isActive
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

export const PAGE_SECTIONS_QUERY = `
  *[_type == "pageSections" && (!defined(isActive) || isActive == true)] | order(_createdAt desc) [0] {
    _id,
    caseStudiesTitle,
    deliverablesTitle,
    createWithUsTitle,
    isActive
  }
`

export const PRICING_PACKAGES_QUERY = `
  *[_type == "pricingPackage" && (!defined(isActive) || isActive == true)] | order(order asc, _createdAt desc) {
    _id,
    packageName,
    image {
      asset,
      alt
    },
    price,
    features[] {
      feature,
      description
    },
    isPopular,
    ctaButton {
      label,
      link
    },
    order,
    isActive
  }
`

export interface ContactCategory {
  category: string
  email?: string
  phone?: string
  address?: string[]
}

export interface SocialLink {
  platform: 'twitter' | 'instagram' | 'linkedin' | 'facebook' | string
  url: string
}

export interface Contact {
  _id: string
  title: string
  subtitle: string
  whatsappLink?: string
  contactCategories: ContactCategory[]
  socialLinks?: SocialLink[]
  image?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  isActive?: boolean
}

export interface TextSectionCard {
  title: string
  subtitle?: string
  image: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string | null
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  ctaLink?: {
    label: string
    url: string
    isExternal?: boolean
  }
  order?: number
}

export interface TextSection {
  _id: string
  sectionTitle: string
  categoryTags?: string[]
  description: string
  cards?: TextSectionCard[]
  slug: {
    current: string
  }
  isActive?: boolean
}

export const CONTACT_QUERY = `
  *[_type == "contact" && (!defined(isActive) || isActive == true)] | order(_createdAt desc) [0] {
    _id,
    title,
    subtitle,
    whatsappLink,
    contactCategories[] {
      category,
      email,
      phone,
      address
    },
    socialLinks[] {
      platform,
      url
    },
    image {
      asset,
      alt,
      hotspot,
      crop
    },
    isActive
  }
`

export const TEXT_SECTION_QUERY = `
  *[_type == "textSection" && (!defined(isActive) || isActive == true)] | order(_createdAt desc) {
    _id,
    sectionTitle,
    categoryTags,
    description,
    cards[] {
      title,
      subtitle,
      image {
        asset,
        alt,
        hotspot,
        crop
      },
      ctaLink {
        label,
        url,
        isExternal
      },
      order
    } | order(order asc),
    slug,
    isActive
  }
`

export const TEXT_SECTION_BY_SLUG_QUERY = `
  *[_type == "textSection" && slug.current == $slug && (!defined(isActive) || isActive == true)] [0] {
    _id,
    sectionTitle,
    categoryTags,
    description,
    cards[] {
      title,
      subtitle,
      image {
        asset,
        alt,
        hotspot,
        crop
      },
      ctaLink {
        label,
        url,
        isExternal
      },
      order
    } | order(order asc),
    slug,
    isActive
  }
`

// Blog Post Types
export interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  author?: string
  publishedAt: string
  category?: string
  tags?: string[]
  content: any[] // Portable Text content
  readTime?: number
  isFeatured?: boolean
  isActive?: boolean
}

// Blog Queries
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && (!defined(isActive) || isActive == true)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },
    author,
    publishedAt,
    category,
    tags,
    readTime,
    isFeatured,
    isActive
  }
`

export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug && (!defined(isActive) || isActive == true)] [0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },
    author,
    publishedAt,
    category,
    tags,
    content,
    readTime,
    isFeatured,
    isActive
  }
`

export const FEATURED_BLOG_POSTS_QUERY = `
  *[_type == "blogPost" && isFeatured == true && (!defined(isActive) || isActive == true)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },
    author,
    publishedAt,
    category,
    tags,
    readTime,
    isFeatured,
    isActive
  }
`

// Case Study Page Types
export interface CaseStudyPageVideo {
  _type: 'video'
  url: string
  caption?: string
  autoplay?: boolean
}

export interface CaseStudyPageHeading {
  _type: 'heading'
  text: string
  level: 'h1' | 'h2' | 'h3' | 'h4'
}

export interface CaseStudyPageTextBlock {
  _type: 'textBlock'
  text: string
  alignment: 'left' | 'center' | 'right'
}

export interface CaseStudyPage {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
    hotspot?: {
      x: number
      y: number
      height: number
      width: number
    }
    crop?: {
      top: number
      bottom: number
      left: number
      right: number
    }
  }
  client?: string
  category?: string
  tags?: string[]
  content: any[] // Flexible content blocks
  publishedAt: string
  isFeatured?: boolean
  isActive?: boolean
}

// Case Study Page Queries
export const CASE_STUDY_PAGES_QUERY = `
  *[_type == "caseStudyPage" && (!defined(isActive) || isActive == true)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },
    client,
    category,
    tags,
    publishedAt,
    isFeatured,
    isActive
  }
`

export const CASE_STUDY_PAGE_BY_SLUG_QUERY = `
  *[_type == "caseStudyPage" && slug.current == $slug && (!defined(isActive) || isActive == true)][0] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },
    client,
    category,
    tags,
    content[] {
      _type == "block" => {
        _type,
        _key,
        style,
        children[] {
          _key,
          _type,
          text,
          marks[]
        },
        markDefs[] {
          _key,
          _type,
          href
        },
        listItem,
        level
      },
      _type == "image" => {
        _type,
        _key,
        asset,
        alt,
        caption,
        hotspot,
        crop
      },
      _type == "video" => {
        _type,
        _key,
        url,
        caption,
        autoplay
      },
      _type == "heading" => {
        _type,
        _key,
        text,
        level
      },
      _type == "textBlock" => {
        _type,
        _key,
        text,
        alignment
      },
      _type == "table" => {
        _type,
        _key,
        rows[] {
          cells[]
        }
      }
    },
    publishedAt,
    isFeatured,
    isActive
  }
`

export const FEATURED_CASE_STUDY_PAGES_QUERY = `
  *[_type == "caseStudyPage" && isFeatured == true && (!defined(isActive) || isActive == true)] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset,
      alt,
      hotspot,
      crop
    },
    client,
    category,
    tags,
    publishedAt,
    isFeatured,
    isActive
  }
`

