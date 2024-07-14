import { TResources } from 'src/app/core/resources/resources.interface';
import { EResources } from 'src/app/core/resources/resources.enum';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

export const RESOURCES_START_CONFIG: TResources = {
  [EResources.MONEY]: new BigNumber(),
  [EResources.CRYSTAL]: new BigNumber(),
  [EResources.RUBY]: new BigNumber(),
  [EResources.PRESTIGE_POINT]: new BigNumber(),
};
