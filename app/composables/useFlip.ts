import type { RouteLocationNormalized } from '#vue-router'

type PathMatcher = (to: RouteLocationNormalized, from: RouteLocationNormalized) => boolean

export function useFlip() {
  const { $Flip } = useNuxtApp()

  const flipState = useState<Flip.FlipState | null>('flip-state', () => null)

  function capture(...args: Parameters<typeof $Flip.getState>): void {
    flipState.value = $Flip.getState(...args)
  }

  function flip(targets: Flip.FromToVars["targets"]): void {
    if (!flipState.value) return

    $Flip.from(flipState.value, {
      targets,
      ease: "power1.inOut",
    })
  }

  const registerAutoFlip = (pathMatcher: PathMatcher, captureArgs?: Parameters<typeof capture>, flipArgs?: Parameters<typeof flip>) => {
    onBeforeRouteLeave((to, from, next) => {
      const result = pathMatcher(to, from)
      if (result) {
        capture(captureArgs?.[0] ?? '[data-flip-id]', captureArgs?.[1])
      }
      next()
    })

    onMounted(() => {
      flip(flipArgs?.[0] ?? '[data-flip-id]')
      flipState.value = null
    })
  }

  return {
    capture,
    flip,
    registerAutoFlip,
  }
}
