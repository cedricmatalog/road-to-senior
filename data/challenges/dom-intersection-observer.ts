import type { Challenge } from '@/lib/types'

const challenge: Challenge = {
  slug: 'dom-intersection-observer',
  title: 'Lazy Load with IntersectionObserver',
  description: 'A product page loads 50 full-size images on mount and takes 8 seconds on mobile. Only load each image when it scrolls into view.',
  type: 'code',
  difficulty: 'mid',
  skills: ['dom-browser', 'performance'],
  content: {
    overview: `Lazy loading defers loading off-screen images until they're needed. The IntersectionObserver API does this efficiently — no scroll event listeners, no getBoundingClientRect() calls. It's how every modern image lazy loading library works.`,
    starterCode: `// lazyLoad(images) observes each image element.
// When an image enters the viewport, set its src from data-src
// and stop observing it.

function lazyLoad(images) {
  // your code here
}`,
    solution: `function lazyLoad(images) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        observer.unobserve(img)
      }
    })
  })
  images.forEach(img => observer.observe(img))
}`,
    explanation: `IntersectionObserver fires a callback with entries when observed elements enter or leave the viewport. \`entry.isIntersecting\` is true when the element enters. After loading, call \`observer.unobserve(img)\` — no point continuing to observe an already-loaded image. The image source is stored in \`data-src\` (not \`src\`) so the browser doesn't load it upfront. Threshold defaults to 0 — fires when even 1px is visible.`,
    hints: [
      'Create an IntersectionObserver with a callback that checks entry.isIntersecting.',
      'When an image intersects: copy img.dataset.src to img.src, then unobserve it.',
      'Call observer.observe(img) for each image to start watching it.',
    ],
    testCases: [
      {
        description: 'sets src from data-src when image intersects',
        explanation: 'When the observer fires with isIntersecting: true, img.src must be set from data-src.',
        testCode: `
function lazyLoad(images) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        observer.unobserve(img)
      }
    })
  })
  images.forEach(img => observer.observe(img))
}
let observeCallback
const mockObserver = { observe: () => {}, unobserve: () => {} }
const OriginalIO = global.IntersectionObserver
global.IntersectionObserver = function(cb) { observeCallback = cb; return mockObserver }
const img = { src: '', dataset: { src: 'photo.jpg' }, target: null }
img.target = img
lazyLoad([img])
observeCallback([{ isIntersecting: true, target: img }])
if (img.src === 'photo.jpg') { console.log("PASS") } else { console.log("FAIL: src=" + img.src) }
global.IntersectionObserver = OriginalIO`,
      },
      {
        description: 'does not set src when not intersecting',
        explanation: 'If isIntersecting is false, the image is off-screen — src must remain empty.',
        testCode: `
function lazyLoad(images) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.src = entry.target.dataset.src }
    })
  })
  images.forEach(img => observer.observe(img))
}
let cb
const OriginalIO = global.IntersectionObserver
global.IntersectionObserver = function(fn) { cb = fn; return { observe: () => {}, unobserve: () => {} } }
const img = { src: '', dataset: { src: 'photo.jpg' } }
lazyLoad([img])
cb([{ isIntersecting: false, target: img }])
if (img.src === '') { console.log("PASS") } else { console.log("FAIL: src was set to " + img.src) }
global.IntersectionObserver = OriginalIO`,
      },
    ],
  },
}
export default challenge
