import { Component } from '@angular/core';

import ResourcesComponent from 'src/app/components/resources/resources.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [ResourcesComponent],
})
export default class MainPageComponent {}
