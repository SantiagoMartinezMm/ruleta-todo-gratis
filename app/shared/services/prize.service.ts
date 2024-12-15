import { Observable } from '@nativescript/core';
import { Prize, SpinResult } from '../models/prize.model';
import { DEFAULT_PRIZES } from '../config/prizes.config';
import { generateUniqueCode } from '../utils/code-generator.util';

export class PrizeService extends Observable {
  private prizes: Prize[] = DEFAULT_PRIZES;

  getPrizes(): Prize[] {
    return this.prizes.filter(prize => prize.isAvailable);
  }

  spinWheel(): SpinResult {
    const prize = this.selectPrize();
    const code = generateUniqueCode();
    
    return {
      prize,
      code,
      timestamp: new Date()
    };
  }

  private selectPrize(): Prize {
    const availablePrizes = this.getPrizes();
    const random = Math.random();
    let cumulativeProbability = 0;

    for (const prize of availablePrizes) {
      cumulativeProbability += prize.probability;
      if (random <= cumulativeProbability) {
        return prize;
      }
    }

    return availablePrizes[availablePrizes.length - 1];
  }
}