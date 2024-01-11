import React, { useContext } from "react"
import { Widget } from "near-social-vm"
import { useBosLoaderStore } from "@/stores/bos-loader"
import { AppContext } from "context/AppContext"

export default function LibraryPage() {
    const redirectMapStore = useBosLoaderStore();
    const props = useContext(AppContext)

    return (
        <div className="h-100">
            <Widget
                src="buildhub.near/widget/components.Library"
                props={{
                    ...props,
                }}
                config={{
                    redirectMap: redirectMapStore.redirectMap,
                }}
            />
        </div>
    );
}
