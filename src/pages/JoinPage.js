import React from "react";
import { UserDropdown } from "../components/navigation/UserDropdown";
import { Widget } from "near-social-vm";
import { useBosLoaderStore } from "../stores/bos-loader";
import OnboardingFlow from "../components/OnboardingFlow";
import { useLocation } from "react-router-dom";

export default function JoinPage(props) {
  const redirectMapStore = useBosLoaderStore();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const from = searchParams.get("from");

  const CurrentView = props.signedIn
    ? "buildhub.near/widget/app"
    : from === "trial"
      ? "buildhub.near/widget/TrialAccountBanner"
      : "buildhub.near/widget/login";

  return (
    <>
      <OnboardingFlow signedIn={props.signedIn} />
      <div className="h-100">
        <Widget
          src={CurrentView}
          props={{
            ...props,
          }}
          config={{
            redirectMap: redirectMapStore.redirectMap,
          }}
        />
      </div>
    </>
  );
}
