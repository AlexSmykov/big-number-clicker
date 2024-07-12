import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import SidebarComponent from 'src/app/components/sidebar/sidebar.component';
import { ResourcesService } from 'src/app/core/resources/resources.service';
import { UpgradeService } from 'src/app/core/upgrades/upgrade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
})
export class AppComponent {
  constructor(
    private resourcesService: ResourcesService,
    private upgradeService: UpgradeService
  ) {}

  @HostListener('window:beforeunload')
  onClose() {
    this.resourcesService.saveResources();
    this.upgradeService.saveUpgrades();
  }
}
