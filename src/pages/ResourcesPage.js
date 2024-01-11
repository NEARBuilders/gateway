import { Widget } from "near-social-vm"
import React, { useContext } from "react"
import { useHashRouterLegacy } from "@/hooks/useHashRouterLegacy"
import { useBosLoaderStore } from "@/stores/bos-loader"
import { AppContext } from "context/AppContext"

export default function ResourcesPage() {
    useHashRouterLegacy()
    const { redirectMap } = useBosLoaderStore()
    const props = useContext(AppContext)

    const src = props.widgets.resources

    return (
        <div className="container-xl mt-3" style={{ backgroundColor: "#0b0c14" }}>
            <Widget
                key={src}
                src={src}
                config={{
                    redirectMap,
                }}
                props={props}
            />
        </div>
    )
}
