import { Animation } from '@nativescript/core';
import { SpinConfig } from '../models/wheel.model';

export class WheelAnimationService {
  private readonly defaultConfig: SpinConfig = {
    minSpins: 3,
    maxSpins: 5,
    duration: 3000
  };

  createSpinAnimation(
    target: any,
    currentRotation: number,
    targetRotation: number,
    config: Partial<SpinConfig> = {}
  ): Animation {
    const finalConfig = { ...this.defaultConfig, ...config };
    
    return new Animation([{
      target: target,
      rotate: targetRotation,
      duration: finalConfig.duration,
      curve: {
        type: 'cubicBezier',
        x1: 0.33,
        y1: 0,
        x2: 0.67,
        y2: 1
      }
    }]);
  }

  calculateTargetRotation(currentRotation: number, config: SpinConfig): number {
    const spins = config.minSpins + (Math.random() * (config.maxSpins - config.minSpins));
    return currentRotation + (spins * 360);
  }
}