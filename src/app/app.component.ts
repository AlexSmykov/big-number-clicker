import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import SidebarComponent from 'src/app/components/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
})
export class AppComponent {}
