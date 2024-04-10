import React from "react";
import { Widget } from "near-social-vm";
import { useBosLoaderStore } from "../stores/bos-loader";

export default function OnboardingFlow({ signedIn, widgets }) {
  const redirectMapStore = useBosLoaderStore();

  if (signedIn) {
    return (
      <div>
        <Widget
          src={widgets.onboardingFlow}
          config={{
            redirectMap: redirectMapStore.redirectMap,
          }}
        />
      </div>
    );
  }
}
