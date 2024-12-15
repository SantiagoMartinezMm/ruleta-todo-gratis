export interface Prize {
  id: string;
  name: string;
  probability: number;
  isAvailable: boolean;
  code?: string;
  imageUrl?: string;
}

export interface SpinResult {
  prize: Prize;
  code: string;
  timestamp: Date;
}