import { Atom } from "./Atom";
import { observable } from "mota";
import shortid from "shortid";

@observable
export class AtomGroup extends Atom {
  id = shortid();
  value: Atom[] = [];
  render(): React.ReactNode | React.ReactNode[] {
    return this.value.map(atom => atom.render());
  };
}
