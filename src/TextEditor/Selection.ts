export class Selection {
  start = -1;
  end = -1;
  cursor = 0;

  select = (start: number, end: number) => {
    this.start = start;
    this.end = end;
  };

  contains = (index: number) => {
    return index >= this.start && index <= this.end;
  };
}
