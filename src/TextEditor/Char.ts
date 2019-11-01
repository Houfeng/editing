import shortid from "shortid";

export class Char {
  value = "";
  style: React.CSSProperties = {};
  id = shortid();
  constructor(value: string) {
    this.value = value[0];
  }
}

export class BrChar extends Char {}
