import React, { useContext, useEffect, useState } from "react"
import { Widget } from "near-social-vm"
import { useParams } from "react-router-dom"
import { useQuery } from "@/hooks/useQuery"
import { useHashRouterLegacy } from "@/hooks/useHashRouterLegacy"
import { useBosLoaderStore } from "@/stores/BOSLoader"
import { AppContext } from "context/AppContext"

export default function ViewPage() {
  useHashRouterLegacy()

  const { setWidgetSrc, widgets } = useContext(AppContext)
  const { widgetSrc } = useParams()
  const query = useQuery()
  const [widgetProps, setWidgetProps] = useState({})
  const redirectMapStore = useBosLoaderStore()

  const src =
    widgetSrc || window?.InjectedConfig?.defaultWidget || widgets.default
  const showMenu = !window?.InjectedConfig?.hideMenu
  const viewSourceWidget = widgets.viewSource

  useEffect(() => {
    setWidgetProps(Object.fromEntries([...query.entries()]));
  }, [query]);

  useEffect(() => {
    setTimeout(() => {
      setWidgetSrc(
        src === viewSourceWidget && query.get("src")
          ? {
              edit: query.get("src"),
              view: null,
            }
          : {
              edit: src,
              view: src,
            }
      )
    }, 1)
  }, [src, query, setWidgetSrc, viewSourceWidget])

  return showMenu ? (
    <div>
      <Widget
        key={src}
        src={src}
        props={widgetProps}
        config={{
          redirectMap: redirectMapStore.redirectMap,
        }}
      />{" "}
    </div>
  ) : (
    <Widget
      key={src}
      src={src}
      props={widgetProps}
      config={{
        redirectMap: redirectMapStore.redirectMap,
      }}
    />
  )
}
