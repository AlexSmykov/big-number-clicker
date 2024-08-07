import { Component, inject, input, OnInit, output } from '@angular/core';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TippyDirective } from '@ngneat/helipopper';
import { toObservable } from '@angular/core/rxjs-interop';

import { TUpgrade } from 'src/app/core/upgrades/upgrade.interface';
import {
  isCountableUpgrade,
  isEndlessUpgrade,
  isOneTimeUpgrade,
} from 'src/app/core/upgrades/upgrade.utils';
import ResourceComponent from 'src/app/shared/components/resource/resource.component';
import { ResourcesService } from 'src/app/core/resources/resources.service';
import {
  EUpgradeTierNames,
  TIER_COLORS,
} from 'src/app/core/upgrades/upgrade.const';
import { RESOURCE_DATA } from 'src/app/core/resources/resources.const';

import { combineLatest, map, Subject, switchMap, take } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss'],
  standalone: true,
  imports: [AsyncPipe, ResourceComponent, TippyDirective, JsonPipe],
})
export default class UpgradeComponent implements OnInit {
  readonly upgrade = input.required<TUpgrade>();
  readonly tooltipText = input<string | undefined>(undefined);

  readonly buy = output<void>();

  private readonly resourceService = inject(ResourcesService);

  readonly isOneTimeUpgrade = isOneTimeUpgrade;
  readonly isEndlessUpgrade = isEndlessUpgrade;
  readonly isCountableUpgrade = isCountableUpgrade;
  readonly EResourcesData = RESOURCE_DATA;
  readonly EUpgradeTierNames = EUpgradeTierNames;

  private readonly upgrade$ = toObservable(this.upgrade);

  availableToBuy$ = combineLatest([
    this.upgrade$,
    this.resourceService.getAllResources$(),
  ]).pipe(
    map(([upgrade, resources]) => {
      const costs = isOneTimeUpgrade(upgrade)
        ? upgrade.costs
        : upgrade.caps[upgrade.currentCap].costs;

      return costs.every((cost) =>
        resources[cost.resourceType].moreThanOrEqual(cost.cost)
      );
    })
  );

  buyHoldTimer?: number;
  buyTimer?: number;
  buyCount = 0;
  buyTimerTrigger$ = new Subject<void>();

  ngOnInit() {
    this.subOnBuyTimerTrigger();
  }

  subOnBuyTimerTrigger(): void {
    this.buyTimerTrigger$
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.availableToBuy$.pipe(take(1)))
      )
      .subscribe((isAvailable) => {
        if (isAvailable && this.buy) {
          this.onBuy();
          return;
        }

        this.clearTimes();
      });
  }

  onBuy(): void {
    this.buy.emit();
  }

  buyMouseDown(): void {
    this.buyHoldTimer = setTimeout(() => {
      this.setHoldInterval();
    }, 300);
  }

  setHoldInterval(): void {
    this.buyTimer = setTimeout(
      () => {
        this.buyTimerTrigger$.next();
        this.buyCount++;
        this.setHoldInterval();
      },
      Math.max(100 - this.buyCount * 2, 5)
    );
  }

  buyMouseUp(): void {
    this.clearTimes();
  }

  private clearTimes(): void {
    clearTimeout(this.buyHoldTimer);
    clearInterval(this.buyTimer);

    this.buyHoldTimer = undefined;
    this.buyTimer = undefined;
    this.buyCount = 0;
  }

  protected readonly TIER_COLORS = TIER_COLORS;
}
