import { Widget } from "near-social-vm"
import React, { useContext, useEffect, useState } from "react"
import { useQuery } from "@/hooks/useQuery"
import { useHashRouterLegacy } from "@/hooks/useHashRouterLegacy"
import { useBosLoaderStore } from "@/stores/bos-loader"
import { AppContext } from "@/context/AppContext"

export default function FeedPage() {
  useHashRouterLegacy()
  const redirectMapStore = useBosLoaderStore()

  const { widgets, requestSignIn } = useContext(AppContext)

  const src = widgets.feed;

  const query = useQuery()
  const [widgetProps, setWidgetProps] = useState({})

  useEffect(() => {
    setWidgetProps(Object.fromEntries([...query.entries()]));
  }, [query])

  return (
    <div className="container-xl mt-3" style={{ backgroundColor: "#0b0c14" }}>
      <Widget
        key={src}
        src={src}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
        props={{ requestSignIn, ...widgetProps }}
      />
    </div>
  )
}
