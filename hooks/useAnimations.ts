'use client'

import { useEffect, useRef } from 'react'

// Custom hook for Anime.js animations
export function useAnimeAnimation() {
  const animeRef = useRef<any>(null)

  useEffect(() => {
    // Dynamically import anime.js
    const loadAnime = async () => {
      if (typeof window !== 'undefined') {
        const anime = await import('animejs')
        animeRef.current = anime.default
      }
    }
    
    loadAnime()
  }, [])

  const animateHero = () => {
    if (!animeRef.current) return

    const tl = animeRef.current.timeline({ easing: 'easeOutQuad' })
    
    tl.add({
      targets: '.hero-headline',
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 700
    })
    .add({
      targets: '.hero-sub',
      translateY: [16, 0],
      opacity: [0, 1],
      duration: 600
    }, '-=400')
    .add({
      targets: '.hero-cta',
      scale: [0.9, 1],
      opacity: [0, 1],
      duration: 500
    }, '-=300')
    .add({
      targets: '.hero-badge',
      opacity: [0, 1],
      translateY: [10, 0],
      delay: animeRef.current.stagger(80),
      duration: 400
    }, '-=300')
  }

  const animateGridStagger = () => {
    if (!animeRef.current) return

    animeRef.current({
      targets: '.category-card',
      opacity: [0, 1],
      translateY: [14, 0],
      delay: animeRef.current.stagger(80, { start: 200 }),
      duration: 420,
      easing: 'easeOutCubic'
    })
  }

  const animateOnScroll = () => {
    if (!animeRef.current) return

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animeRef.current({
            targets: entry.target,
            opacity: [0, 1],
            translateY: [12, 0],
            duration: 500
          })
          observer.unobserve(entry.target)
        }
      })
    })

    document.querySelectorAll('.reveal').forEach(node => {
      observer.observe(node)
    })
  }

  const animateMicroInteractions = () => {
    if (!animeRef.current) return

    document.querySelectorAll('.btn-quote').forEach(button => {
      button.addEventListener('mouseenter', () => {
        animeRef.current({
          targets: button,
          scale: [1, 1.04],
          duration: 180
        })
      })
      
      button.addEventListener('mouseleave', () => {
        animeRef.current({
          targets: button,
          scale: [1.04, 1],
          duration: 180
        })
      })
    })
  }

  const animateOrbit = () => {
    if (!animeRef.current) return

    animeRef.current({
      targets: '.hero-orbit img',
      rotate: 360,
      duration: 12000,
      loop: true,
      easing: 'linear'
    })
  }

  return {
    animateHero,
    animateGridStagger,
    animateOnScroll,
    animateMicroInteractions,
    animateOrbit
  }
}

