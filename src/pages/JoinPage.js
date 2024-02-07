import React from "react";
import { UserDropdown } from "../components/navigation/UserDropdown";
import { Widget } from "near-social-vm";
import { useBosLoaderStore } from "../stores/bos-loader";

export default function JoinPage(props) {
  const redirectMapStore = useBosLoaderStore();

  const CurrentView = props.signedIn
    ? "buildhub.near/widget/app"
    : "buildhub.near/widget/login";

  return (
    <div className="h-100">
      <Widget
        src={CurrentView}
        props={{
          ...props
        }}
        config={{
          redirectMap: redirectMapStore.redirectMap
        }}
      />
    </div>
  );
}
