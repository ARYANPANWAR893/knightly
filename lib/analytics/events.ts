'use client';

import {
  posthog,
} from './posthog';

export function track(
  event: string,
  properties = {}
) {
  posthog.capture(
    event,
    properties
  );
}
