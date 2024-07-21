import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { UntilDestroy } from '@ngneat/until-destroy';

import { ClickService } from 'src/app/core/click/click.service';

@UntilDestroy()
@Component({
  selector: 'app-click-button',
  templateUrl: './click-button.component.html',
  styleUrls: ['./click-button.component.scss'],
  standalone: true,
  imports: [AsyncPipe],
})
export default class ClickButtonComponent {
  private clickService = inject(ClickService);

  clickText$ = this.clickService.clickButtonText$;
  clickGain$ = this.clickService.nextClickMoneyGain$;

  onClick(): void {
    this.clickService.onClick();
  }
}
