import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'web-performance-core-vitals',
  title: 'Diagnose a Slow Page with Core Web Vitals',
  description: 'A product page has poor LCP and CLS scores. Identify the causes and fix them.',
  type: 'scenario',
  difficulty: 'senior',
  skills: ['web-performance'],
  content: {
    overview: 'Core Web Vitals are Google\'s user-centric performance metrics: LCP (Largest Contentful Paint) measures loading, FID/INP measures interactivity, CLS measures visual stability. Poor scores hurt both UX and SEO. Senior engineers know what causes each metric to degrade and how to fix it.',
    situation: `A product page scores: LCP 5.2s (poor, threshold: <2.5s), CLS 0.28 (poor, threshold: <0.1).\n\nInvestigation reveals:\n- The hero image (800KB JPEG) is loaded with a standard <img> tag, no width/height attributes\n- A cookie banner is injected by a third-party script after page load, pushing content down\n- Google Fonts is loaded with a <link rel="stylesheet"> in the <head>\n- The main product image is below the fold but has loading="eager"\n\nYou have one sprint to fix LCP and CLS. What do you do?`,
    options: [
      {
        id: 'a',
        label: 'Compress the hero image and add loading="lazy" to all images',
        explanation: 'Compression helps LCP but lazy loading the hero image makes it worse — the browser delays fetching it until it\'s needed, which is immediately. The LCP element should never be lazy loaded. And compression alone won\'t fix CLS from the cookie banner or missing image dimensions.',
        isRecommended: false,
      },
      {
        id: 'b',
        label: 'Fix LCP: convert hero to WebP, add fetchpriority="high", preload it, swap Google Fonts to font-display:swap with preconnect. Fix CLS: add width/height to all images, reserve space for the cookie banner in CSS before the script loads',
        explanation: 'This targets each metric precisely. LCP: WebP is ~30% smaller than JPEG, fetchpriority="high" tells the browser this is the most important resource, and preloading starts the fetch before the parser reaches the img tag. Google Fonts blocks rendering — preconnect + font-display:swap eliminates the render-blocking. CLS: missing width/height on images is the #1 cause of layout shift (browser doesn\'t know the space to reserve). Cookie banners should have space pre-reserved in CSS so when they appear they don\'t push content. These changes together typically move both metrics from poor to good.',
        isRecommended: true,
      },
      {
        id: 'c',
        label: 'Implement server-side rendering to deliver a fully-rendered HTML page faster',
        explanation: 'SSR helps Time to First Byte and can improve LCP, but it doesn\'t fix CLS from missing image dimensions or a cookie banner, and it\'s a much larger architectural change than the targeted fixes available here. Start with the quick wins.',
        isRecommended: false,
      },
      {
        id: 'd',
        label: 'Remove the third-party cookie banner script entirely',
        explanation: 'Removing the banner fixes CLS from it, but may have legal implications (GDPR compliance). You can fix the CLS without removing the banner by pre-reserving the space in CSS. Also doesn\'t address LCP.',
        isRecommended: false,
      },
    ],
  },
}
export default challenge
