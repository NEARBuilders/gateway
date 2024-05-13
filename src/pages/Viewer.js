import { Widget } from "near-social-vm";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const SESSION_STORAGE_REDIRECT_MAP_KEY = "nearSocialVMredirectMap";

function Viewer({ code, page, tab, widgets }) {
  // get path from url, could be socialdb path or relative to "core"
  const { path, feedTab, widgetSrc, projectId } = useParams();
  const location = useLocation(); // get query params from url
  const searchParams = new URLSearchParams(location.search);

  const [redirectMap, setRedirectMap] = useState(null);

  useEffect(() => {
    const fetchRedirectMap = async () => {
      try {
        const localStorageFlags = JSON.parse(
          localStorage.getItem("flags") || "{}",
        );
        let redirectMapData;

        if (localStorageFlags.bosLoaderUrl) {
          const response = await fetch(localStorageFlags.bosLoaderUrl);
          const data = await response.json();
          redirectMapData = data.components;
        } else {
          redirectMapData = JSON.parse(
            sessionStorage.getItem(SESSION_STORAGE_REDIRECT_MAP_KEY) || "{}",
          );
        }
        setRedirectMap(redirectMapData);
      } catch (error) {
        console.error("Error fetching redirect map:", error);
      }
    };
    fetchRedirectMap();
  }, []);

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value;
      return props;
    }, {});
  }, [location]);

  if (page) {
    return (
      <Widget
        src={"buildhub.near/widget/app"}
        props={{
          page: page,
          tab: feedTab || tab,
          widgetPath: widgetSrc ?? "buildhub.near/widget/app",
          id: projectId,
          fromGateway: true,
          ...passProps,
        }}
        config={{ redirectMap }}
      />
    );
  }

  const src = useMemo(() => {
    const defaultSrc = widgets.default; // default widget to load
    const pathSrc = path || defaultSrc; // if no path, load default widget
    return pathSrc;
  }, [path]);

  return (
    <Widget
      src={!code && src}
      code={code} // prioritize code
      props={{
        path: src,
        fromGateway: true,
        ...passProps,
      }}
      config={{ redirectMap }}
    />
  );
}

export default Viewer;
