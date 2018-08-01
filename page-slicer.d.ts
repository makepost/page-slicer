export class ItemZoomer<T> {
  constructor(props: { padding: number, spacer: T }, items: Range<T>);

  zoom(current: number): T[];
}

export class PageSlicer<T> {
  state: number;

  constructor(props: { itemsOnPage: number }, items: Range<T>);

  count(): number;

  go(page: number): void;

  goFirst(): void;

  goLast(): void;

  goNext(): void;

  goPrev(): void;

  isValid(page: string): boolean;

  move(diff: number): void;

  slice(): T[];
}

export class Range<T = number> {
  constructor(length: number);

  length: number;

  slice(start?: number, end?: number): T[];
}
