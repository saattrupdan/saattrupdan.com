import type { Router } from "vue-router";

// Placeholder kept so main.ts's import is stable across phases.
// Per-route <head> updates are now driven by useHead() in each view.
export function setupRouterHooks(_router: Router, _isClient: boolean) {
  // intentionally empty
}
