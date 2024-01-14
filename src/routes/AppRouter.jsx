import React from "react"
import { Route, BrowserRouter as Router, Switch } from "react-router-dom"

import Flags from "@/pages/Flags"
import JoinPage from "@/pages/JoinPage"
import ProposePage from "@/pages/ProposePage"
import LibraryPage from "@/pages/LibraryPage"
import FeedPage from "@/pages/FeedPage"
import ResourcesPage from "@/pages/ResourcesPage"
import EmbedPage from "@/pages/EmbedPage"
import EditorPage from "@/pages/EditorPage"
import ViewPage from "@/pages/ViewPage"

import { Navbar } from "@/components/navigation/Navbar"
import { BosLoaderBanner } from "@/components/BosLoaderBanner"

export function AppRouter() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path={"/flags"}>
          <Flags />
        </Route>
        <Route path={"/join"}>
          <JoinPage />
        </Route>
        <Route path={"/propose"}>
          <ProposePage />
        </Route>
        <Route path={"/library"}>
          <Navbar />
          <LibraryPage />
        </Route>
        <Route path={"/feed"}>
          <Navbar />
          <FeedPage />
        </Route>
        <Route path={"/resources"}>
          <Navbar />
          <ResourcesPage />
        </Route>
        <Route path={"/embed/:widgetSrc*"}>
          <EmbedPage />
        </Route>
        <Route path={"/edit/:widgetSrc*"}>
          <Navbar/>
          <EditorPage />
        </Route>
        <Route path={"/:widgetSrc*"}>
          <BosLoaderBanner />
          <Navbar />
          <ViewPage />
        </Route>
      </Switch>
    </Router>
  )
}