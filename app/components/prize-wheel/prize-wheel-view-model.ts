import { Observable, ImageSource } from '@nativescript/core';
import { PrizeService } from '../../shared/services/prize.service';
import { WheelAnimationService } from '../../shared/services/wheel-animation.service';
import { AnalyticsService } from '../../shared/services/analytics.service';
import { validateSpinEligibility, setLastSpinTime } from '../../shared/utils/validation.util';

export class PrizeWheelViewModel extends Observable {
  private prizeService: PrizeService;
  private wheelAnimationService: WheelAnimationService;
  private analyticsService: AnalyticsService;
  private _wheelRotation: number = 0;
  private _isSpinning: boolean = false;
  private _showResult: boolean = false;
  private _resultMessage: string = '';
  private _prizeCode: string = '';
  private _errorMessage: string = '';

  constructor() {
    super();
    this.prizeService = new PrizeService();
    this.wheelAnimationService = new WheelAnimationService();
    this.analyticsService = new AnalyticsService();
  }

  get wheelRotation(): number {
    return this._wheelRotation;
  }

  set wheelRotation(value: number) {
    if (this._wheelRotation !== value) {
      this._wheelRotation = value;
      this.notifyPropertyChange('wheelRotation', value);
    }
  }

  get isSpinning(): boolean {
    return this._isSpinning;
  }

  set isSpinning(value: boolean) {
    if (this._isSpinning !== value) {
      this._isSpinning = value;
      this.notifyPropertyChange('isSpinning', value);
    }
  }

  get showResult(): boolean {
    return this._showResult;
  }

  set showResult(value: boolean) {
    if (this._showResult !== value) {
      this._showResult = value;
      this.notifyPropertyChange('showResult', value);
    }
  }

  get resultMessage(): string {
    return this._resultMessage;
  }

  set resultMessage(value: string) {
    if (this._resultMessage !== value) {
      this._resultMessage = value;
      this.notifyPropertyChange('resultMessage', value);
    }
  }

  get prizeCode(): string {
    return this._prizeCode;
  }

  set prizeCode(value: string) {
    if (this._prizeCode !== value) {
      this._prizeCode = value;
      this.notifyPropertyChange('prizeCode', value);
    }
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    if (this._errorMessage !== value) {
      this._errorMessage = value;
      this.notifyPropertyChange('errorMessage', value);
    }
  }

  onSpin() {
    if (this.isSpinning) return;

    const eligibility = validateSpinEligibility();
    if (!eligibility.eligible) {
      this.errorMessage = eligibility.reason || 'Not eligible to spin';
      return;
    }

    this.isSpinning = true;
    this.showResult = false;
    this.errorMessage = '';

    const targetRotation = this.wheelAnimationService.calculateTargetRotation(
      this.wheelRotation,
      { minSpins: 3, maxSpins: 5, duration: 3000 }
    );

    this.animateWheel(targetRotation).then(() => {
      const result = this.prizeService.spinWheel();
      this.prizeCode = result.code;
      this.resultMessage = `¡Felicitaciones! Ganaste: ${result.prize.name}`;
      this.showResult = true;
      this.isSpinning = false;

      setLastSpinTime();
      this.analyticsService.logSpin(result);
    });
  }

  private animateWheel(targetRotation: number): Promise<void> {
    return new Promise((resolve) => {
      const animation = this.wheelAnimationService.createSpinAnimation(
        this,
        this.wheelRotation,
        targetRotation
      );

      animation.play()
        .then(() => {
          this.wheelRotation = targetRotation;
          resolve();
        })
        .catch(error => {
          console.error('Animation error:', error);
          resolve();
        });
    });
  }
}