import { Prize } from '../models/prize.model';

export const DEFAULT_PRIZES: Prize[] = [
  {
    id: '1',
    name: 'Grand Prize',
    probability: 0.1,
    isAvailable: true,
    imageUrl: '~/assets/images/grand-prize.png'
  },
  {
    id: '2',
    name: 'Second Prize',
    probability: 0.2,
    isAvailable: true,
    imageUrl: '~/assets/images/second-prize.png'
  },
  {
    id: '3',
    name: 'Third Prize',
    probability: 0.3,
    isAvailable: true,
    imageUrl: '~/assets/images/third-prize.png'
  },
  {
    id: '4',
    name: 'Better Luck Next Time',
    probability: 0.4,
    isAvailable: true,
    imageUrl: '~/assets/images/try-again.png'
  }
];