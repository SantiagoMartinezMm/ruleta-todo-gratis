import { EventData } from '@nativescript/core';
import { PrizeWheelViewModel } from './prize-wheel-view-model';

export function onNavigatingTo(args: EventData) {
  const page = args.object;
  page.bindingContext = new PrizeWheelViewModel();
}