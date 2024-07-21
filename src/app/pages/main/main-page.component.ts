import { Component } from '@angular/core';

import ResourcesComponent from 'src/app/components/resources/resources.component';
import ClickButtonComponent from 'src/app/pages/main/components/click-button/click-button.component';
import ParametersComponent from 'src/app/pages/main/components/parameters/parameters.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  standalone: true,
  imports: [ResourcesComponent, ClickButtonComponent, ParametersComponent],
})
export default class MainPageComponent {}
