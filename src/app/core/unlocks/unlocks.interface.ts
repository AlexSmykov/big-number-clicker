import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';

export type TUnlocks = Record<keyof typeof EUnlocks, boolean>;
