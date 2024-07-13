import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { ResourcesService } from 'src/app/core/resources/resources.service';
import {
  EResources,
  EResourcesData,
} from 'src/app/core/resources/resources.enum';
import ResourceComponent from 'src/app/shared/components/resource/resource.component';

import { map } from 'rxjs';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ResourceComponent],
})
export default class ResourcesComponent {
  private readonly resourcesService = inject(ResourcesService);

  resources$ = this.resourcesService.getAllResources$().pipe(
    map((resourcesObject) => {
      return Object.entries(resourcesObject).map(([key, value]) => {
        return {
          id: key,
          value: value,
          ...EResourcesData[key as EResources],
        };
      });
    })
  );
}
