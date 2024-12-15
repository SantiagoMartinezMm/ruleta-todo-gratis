export interface WheelConfig {
  segments: number;
  radius: number;
  startAngle: number;
  colors: string[];
}

export interface WheelState {
  currentRotation: number;
  isSpinning: boolean;
  lastSpinTime?: Date;
}

export interface SpinConfig {
  minSpins: number;
  maxSpins: number;
  duration: number;
}