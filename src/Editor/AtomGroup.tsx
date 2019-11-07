import { Atom } from "./Atom";
import shortid from "shortid";

export class AtomGroup extends Atom {
  id = shortid();
  value: Atom[] = [];
  render(): React.ReactNode | React.ReactNode[] {
    return this.value.map(atom => atom.render());
  };
}
