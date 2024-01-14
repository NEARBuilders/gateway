import React, { useContext } from "react"
import { Widget } from "near-social-vm"
import { UserDropdown } from "@/components/navigation/desktop/UserDropdown"
import { AppContext } from "@/context/AppContext"

export function SigninOrJoinNow() {
  const { signedIn, redirectMap, requestSignIn } = useContext(AppContext)

  return (
    <>
      {signedIn ? (
        <button
          className="sign-in"
          onClick={requestSignIn}
        >
          Sign In
        </button>
      ): (
        <Widget
          src="buildhub.near/widget/components.button.join-now"
          config={{
            redirectMap,
          }}
          props={{
            children: <UserDropdown />,
          }}
        />
      )}
    </>
  )
}