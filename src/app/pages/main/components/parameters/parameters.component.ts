import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';

import { PARAMETERS_START_CONFIG } from 'src/app/core/parameters/parameters.const';
import {
  isBigNumber,
  isNumber,
} from 'src/app/core/models/big-number/big-number.guard';
import { AllInfoService } from 'src/app/core/all-info/all-info.service';

import { map } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export default class ParametersComponent {
  private readonly allInfoService = inject(AllInfoService);

  readonly allInfo$ = this.allInfoService.allInfoObject$;

  readonly parametersKeys$ = this.allInfoService.allInfo$.pipe(
    map(([_, parameters]) =>
      parameters
        ? (Object.keys(parameters) as (keyof typeof PARAMETERS_START_CONFIG)[])
        : []
    )
  );

  readonly PARAMETERS_START_CONFIG = PARAMETERS_START_CONFIG;
  readonly isBigNumber = isBigNumber;
  readonly isNumber = isNumber;
}
