import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { EResources } from 'src/app/core/resources/resources.enum';
import ResourceComponent from 'src/app/shared/components/resource/resource.component';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';
import { RESOURCE_DATA } from 'src/app/core/resources/resources.const';
import { AllInfoService } from 'src/app/core/all-info/all-info.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ResourceComponent],
})
export default class ResourcesComponent {
  private readonly AllInfoService = inject(AllInfoService);

  readonly allInfo$ = this.AllInfoService.allInfoObject$;

  readonly RESOURCE_DATA = RESOURCE_DATA;
  readonly EResources = EResources;
  readonly EUnlocks = EUnlocks;
}
