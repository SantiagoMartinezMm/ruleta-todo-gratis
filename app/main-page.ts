import { EventData, Page } from '@nativescript/core';
import { onNavigatingTo as prizeWheelNavigatingTo } from './components/prize-wheel';

export function navigatingTo(args: EventData) {
  const page = <Page>args.object;
  prizeWheelNavigatingTo(args);
}