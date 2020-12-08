import { AtomGroup } from "./AtomGroup";
import React from "react";
import { observable } from "mota";

@observable
export class AtomListItem extends AtomGroup {
  render(): React.ReactNode {
    return <li>{super.render()}</li>
  }
}
