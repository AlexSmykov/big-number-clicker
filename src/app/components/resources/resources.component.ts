import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

import { ResourcesService } from 'src/app/core/resources/resources.service';
import { EResources } from 'src/app/core/resources/resources.enum';
import ResourceComponent from 'src/app/shared/components/resource/resource.component';
import { UnlocksService } from 'src/app/core/unlocks/unlocks.service';
import { EUnlocks } from 'src/app/core/unlocks/unlocks.enum';
import { RESOURCE_DATA } from 'src/app/core/resources/resources.const';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ResourceComponent],
})
export default class ResourcesComponent {
  private readonly resourcesService = inject(ResourcesService);
  private readonly unlocksService = inject(UnlocksService);

  unlocks = toSignal(this.unlocksService.getAllUnlocks$());

  resources$ = this.resourcesService.getAllResources$();

  readonly RESOURCE_DATA = RESOURCE_DATA;
  readonly EResources = EResources;
  readonly EUnlocks = EUnlocks;
}
