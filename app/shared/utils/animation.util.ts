import { AnimationDefinition, Animation } from '@nativescript/core';

export function createRotationAnimation(
  target: any,
  startRotation: number,
  endRotation: number,
  duration: number = 3000
): Animation {
  return new Animation([{
    target: target,
    rotate: endRotation,
    duration: duration,
    curve: {
      type: 'cubicBezier',
      x1: 0.33,
      y1: 0,
      x2: 0.67,
      y2: 1
    }
  }]);
}