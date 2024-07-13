import { Component } from '@angular/core';

import ResourcesComponent from 'src/app/components/resources/resources.component';

@Component({
  selector: 'app-upgrades-page',
  templateUrl: './upgrades-page.component.html',
  styleUrls: ['./upgrades-page.component.scss'],
  standalone: true,
  imports: [ResourcesComponent],
})
export default class UpgradesPageComponent {}
