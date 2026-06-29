'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init('phc_BgT7WYeRLHoS7YRQGmxtuuobcLj9kAUcXnjcHUoHTtJ5', {
      api_host: 'https://us.i.posthog.com',
      defaults: '2026-05-30',
      person_profiles: 'identified_only',
      capture_pageview: 'history_change',
    })
  }, [])

  return <PHProvider client={posthog}>{children}</PHProvider>
}
