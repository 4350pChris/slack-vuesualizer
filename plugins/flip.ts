import { gsap } from 'gsap'
import { Flip } from 'gsap/Flip'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(Flip)

  return {
    provide: {
      gsap,
      Flip,
    }
  }
})
