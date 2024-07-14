import { Component, input } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SvgIconComponent } from 'angular-svg-icon';
import { TippyDirective } from '@ngneat/helipopper';

import { TResourceData } from 'src/app/core/resources/resources.interface';
import { BigNumber } from 'src/app/core/models/big-number/big-number.model';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss'],
  standalone: true,
  imports: [AsyncPipe, SvgIconComponent, TippyDirective, JsonPipe],
})
export default class ResourceComponent {
  resource = input.required<TResourceData & { value: BigNumber }>();
}
