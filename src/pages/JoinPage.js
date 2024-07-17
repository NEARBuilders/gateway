import { Widget } from "near-social-vm";
import React from "react";
import OnboardingFlow from "../components/OnboardingFlow";
import { useBosLoaderStore } from "../stores/bos-loader";

export default function JoinPage({ signedIn, widgets, ...passProps }) {
  const redirectMapStore = useBosLoaderStore();

  const CurrentView = signedIn ? widgets.default : widgets.login;

  return (
    <>
      <OnboardingFlow signedIn={signedIn} widgets={widgets} />
      <div className="h-100">
        <Widget
          src={CurrentView}
          props={{
            ...passProps,
          }}
          config={{
            redirectMap: redirectMapStore.redirectMap,
          }}
        />
      </div>
    </>
  );
}
