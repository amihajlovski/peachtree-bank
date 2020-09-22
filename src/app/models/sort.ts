export interface ISort {
  property: string;
  direction: DirectionType;
}

export type DirectionType = 'asc' | 'desc';
