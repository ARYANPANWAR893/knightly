'use client';

import {
  useEffect,
  useState,
} from 'react';

type Vote =
  | 'yes'
  | 'no'
  | null;

export function
  useMultiplayerVote() {
  const [
    vote,
    setVote,
  ] =
    useState<
      Vote
    >(null);

  useEffect(() => {
    const saved =
      localStorage.getItem(
        'knightly_multiplayer_vote'
      ) as Vote;

    if (
      saved
    ) {
      setVote(
        saved
      );
    }
  }, []);

  function submitVote(
    value:
      | 'yes'
      | 'no'
  ) {
    localStorage.setItem(
      'knightly_multiplayer_vote',
      value
    );

    setVote(
      value
    );

    console.log(
      'MULTIPLAYER VOTE:',
      value
    );
  }

  function resetVote() {
    localStorage.removeItem(
      'knightly_multiplayer_vote'
    );

    setVote(
      null
    );
  }

  return {
    vote,
    submitVote,
    resetVote,
  };
}
