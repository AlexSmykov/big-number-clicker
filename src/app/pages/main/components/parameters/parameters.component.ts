import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ParametersService } from 'src/app/core/parameters/parameters.service';
import { UpgradeService } from 'src/app/core/upgrades/upgrade.service';
import { PARAMETERS_START_CONFIG } from 'src/app/core/parameters/parameters.const';
import {
  isBigNumber,
  isNumber,
} from 'src/app/core/models/big-number/big-number.guard';

import { map, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export default class ParametersComponent {
  private readonly parametersService = inject(ParametersService);
  private readonly upgradeService = inject(UpgradeService);

  parameters$ = this.parametersService.getAllParameters$().pipe(
    tap((x) => {
      console.log(x);
    })
  );
  upgrades$ = this.upgradeService.getAllUpgrades$();

  parametersKeys$ = this.parameters$.pipe(
    map((parameters) =>
      parameters
        ? (Object.keys(parameters) as (keyof typeof PARAMETERS_START_CONFIG)[])
        : []
    )
  );

  protected readonly PARAMETERS_START_CONFIG = PARAMETERS_START_CONFIG;
  protected readonly isBigNumber = isBigNumber;
  protected readonly isNumber = isNumber;
}
