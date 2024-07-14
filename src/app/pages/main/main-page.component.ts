import { Component } from '@angular/core';

import ResourcesComponent from 'src/app/components/resources/resources.component';
import ClickButtonComponent from 'src/app/components/click-button/click-button.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [ResourcesComponent, ClickButtonComponent],
})
export default class MainPageComponent {}
