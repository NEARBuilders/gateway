import { Widget } from "near-social-vm";
import React from "react";
import { useBosLoaderStore } from "../stores/bos-loader";

export default function LogoutPage({ signedIn, widgets, ...passProps }) {
  const redirectMapStore = useBosLoaderStore();
  const CurrentView = signedIn ? widgets.logout : widgets.default;

  return (
    <Widget
      src={CurrentView}
      props={{
        ...passProps,
      }}
      config={{
        redirectMap: redirectMapStore.redirectMap,
      }}
    />
  );
}
