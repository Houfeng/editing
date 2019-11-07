import React from "react";
import { AtomGroup } from "./AtomGroup";

export class AtomListItem extends AtomGroup {
  render(): React.ReactNode {
    return <li>{super.render()}</li>
  }
}
