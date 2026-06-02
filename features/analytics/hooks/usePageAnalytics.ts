'use client';

import {
  useEffect,
} from 'react';

import {
  track,
} from '@/lib/analytics/events';

export function
  usePageAnalytics() {
  useEffect(() => {
    track(
      'homepage_viewed'
    );
  }, []);
}
