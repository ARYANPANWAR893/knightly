'use client';

import posthog from 'posthog-js';

let initialized =
  false;

export function initPostHog() {
  if (
    typeof window ===
      'undefined' ||
    initialized
  )
    return;
console.log(
  'POSTHOG INIT',
  process.env
    .NEXT_PUBLIC_POSTHOG_KEY
);
  posthog.init(
    process.env.NEXT_PUBLIC_POSTHOG_KEY!,
    {
      api_host:
        process.env
          .NEXT_PUBLIC_POSTHOG_HOST,

      capture_pageview:
        true,

      autocapture:
        true,

      persistence:
        'localStorage',
    }
  );

  initialized =
    true;
}

export {
  posthog,
};
