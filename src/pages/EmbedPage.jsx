import React, { useContext, useEffect, useState } from "react"
import { Widget } from "near-social-vm"
import { useParams } from "react-router-dom"
import { useQuery } from "@/hooks/useQuery"
import { useHashRouterLegacy } from "@/hooks/useHashRouterLegacy"
import { AppContext } from "@/context/AppContext"

export default function EmbedPage() {
  useHashRouterLegacy()

  const { widgets } = useContext(AppContext)
  const { widgetSrc } = useParams()
  const query = useQuery()
  const [widgetProps, setWidgetProps] = useState({})
  const src = widgetSrc || widgets.default

  useEffect(() => {
    setWidgetProps(
      [...query.entries()].reduce((props, [key, value]) => {
        props[key] = value
        return props
      }, {})
    )
  }, [query])

  return (
    <div className="d-inline-block position-relative overflow-hidden">
      <Widget key={src} src={src} props={widgetProps} />
    </div>
  )
}
