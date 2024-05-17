import { Widget } from "near-social-vm";
import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const SESSION_STORAGE_REDIRECT_MAP_KEY = "nearSocialVMredirectMap";

function Viewer({ code, widgets }) {
  const { path } = useParams(); // get path from url, could be socialdb path or relative to "core"
  const location = useLocation(); // get query params from url
  const searchParams = new URLSearchParams(location.search);

  // create props from params
  const passProps = useMemo(() => {
    return Array.from(searchParams.entries()).reduce((props, [key, value]) => {
      props[key] = value;
      return props;
    }, {});
  }, [location]);

  const src = useMemo(() => {
    const defaultSrc = widgets.default; // default widget to load
    const pathSrc = path || defaultSrc; // if no path, load default widget
    return pathSrc;
  }, [path]);

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

  const routes = {
    home: {
      path: "buildhub.near/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    feed: {
      path: "buildhub.near/widget/page.feed",
      blockHeight: "final",
      init: {
        name: "Activity",
      },
    },
    resources: {
      path: "buildhub.near/widget/page.resources",
      blockHeight: "final",
      init: {
        name: "Resources",
      },
    },
    library: {
      path: "buildhub.near/widget/page.library",
      blockHeight: "final",
      init: {
        name: "Library",
      },
    },
  };

  return (
    <div className="bg-white">
      {src !== "buildhub.near/widget/app" && (
        <Widget
          src="buildhub.near/widget/components.Navbar"
          props={{ routes }}
        />
      )}
      <Widget
        src={!code && src}
        code={code} // prioritize code
        props={{
          path: src,
          ...passProps,
        }}
        config={{ redirectMap }}
      />
    </div>
  );
}

export default Viewer;
