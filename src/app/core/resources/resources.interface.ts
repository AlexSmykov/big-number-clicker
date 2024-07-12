import { EResources } from 'src/app/core/resources/resources.enum';
import { BigNumber } from 'src/app/core/models/big-number/big-number';

export type TResources = Record<keyof typeof EResources, BigNumber>;
