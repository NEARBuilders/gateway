import React from "react"
import { Widget } from "near-social-vm"
import { useBosLoaderStore } from "@/stores/BOSLoader"

export default function ProposePage(props) {
  const { redirectMap } = useBosLoaderStore()
  
  return (
    <div className="h-100">
      <Widget
        src="buildhub.near/widget/Propose"
        props={{
          ...props,
        }}
        config={{
          redirectMap,
        }}
      />
    </div>
  );
}
