import type * as HugeiconsCore from '@hugeicons/core-free-icons';

export type HugeiconsName = Extract<
  keyof typeof HugeiconsCore,
  `${string}Icon`
>;
