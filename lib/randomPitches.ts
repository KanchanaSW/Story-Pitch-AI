const RANDOM_PITCHES = [
  "A retired lighthouse keeper discovers the beam reveals alternate timelines every night at midnight.",
  "Two rival food truck owners fall in love while competing for the last parking spot outside a haunted courthouse.",
  "An AI therapist starts treating its own creator, who doesn't know they're already dead.",
  "A jazz pianist can only play songs that predict crimes 24 hours before they happen.",
  "The world's worst superhero must save his hometown from a villain who is literally his accountant.",
  "A deep-sea welder finds a sunken city where everyone speaks in movie quotes from films that were never made.",
  "Every time she tells a lie, a stranger somewhere wins the lottery—and she's running for mayor.",
  "A time-traveling barista keeps delivering coffee to historical figures who all order the same impossible drink.",
];

export function getRandomPitch(): string {
  return RANDOM_PITCHES[Math.floor(Math.random() * RANDOM_PITCHES.length)];
}
