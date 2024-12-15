export function validateSpinEligibility(): { eligible: boolean; reason?: string } {
  const lastSpin = getLastSpinTime();
  if (!lastSpin) {
    return { eligible: true };
  }

  const now = new Date();
  const hoursSinceLastSpin = (now.getTime() - lastSpin.getTime()) / (1000 * 60 * 60);

  if (hoursSinceLastSpin < 24) {
    return {
      eligible: false,
      reason: `Please wait ${Math.ceil(24 - hoursSinceLastSpin)} hours before spinning again.`
    };
  }

  return { eligible: true };
}

function getLastSpinTime(): Date | null {
  // In a real app, this would retrieve from storage
  return null;
}

export function setLastSpinTime(): void {
  // In a real app, this would persist to storage
  const now = new Date();
  console.log('Setting last spin time:', now);
}