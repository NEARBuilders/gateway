import React, { useContext } from "react"
import { UserDropdown } from "../components/navigation/desktop/UserDropdown"
import { Widget } from "near-social-vm"
import { useBosLoaderStore } from "../stores/bos-loader"
import { AppContext } from "../context/AppContext"

export default function JoinPage() {
  const redirectMapStore = useBosLoaderStore()
  const { signedIn, ...rest } = useContext(AppContext)

  const CurrentView = signedIn
    ? "buildhub.near/widget/JoinSection"
    : "buildhub.near/widget/login";

  return (
    <div className="h-100">
      {signedIn && (
        <div
          className="position-absolute z-2"
          style={{ top: "3rem", right: "3rem" }}
        >
          <UserDropdown {...rest} />
        </div>
      )}
      <Widget
        src={CurrentView}
        props={{
          ...rest,
        }}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />
    </div>
  );
}
