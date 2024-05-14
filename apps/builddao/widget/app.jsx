const { CSS } = VM.require("${config_account}/widget/components.CSS") || {
  CSS: () => <></>,
};

const config = {
  theme: {
    // add key values to define colors
    "--main-color": "black",
    "--secondary-color": "white",
    background: "var(--main-color)",
    color: "var(--secondary-color)",
    height: "100vh",
  },
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget
        src="${config_account}/widget/components.Navbar"
        props={{ routes: config.router.routes, ...passProps, page: props.page }}
      />
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "${config_account}/widget/page.home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      feed: {
        path: "${config_account}/widget/page.feed",
        blockHeight: "final",
        init: {
          name: "Activity",
        },
      },
      projects: {
        path: "${config_account}/widget/page.projects",
        blockHeight: "final",
        init: {
          name: "Projects",
        },
        hide: true,
      },
      proposal: {
        path: "${config_account}/widget/Proposals",
        blockHeight: "final",
        init: {
          name: "Proposals",
        },
        hide: true,
      },
      resources: {
        path: "${config_account}/widget/page.resources",
        blockHeight: "final",
        init: {
          name: "Resources",
        },
      },
      library: {
        path: "${config_account}/widget/page.library",
        blockHeight: "final",
        init: {
          name: "Library",
        },
      },
      profile: {
        path: "${config_account}/widget/page.profile",
        blockHeight: "final",
        init: {
          name: "Profile",
        },
        hide: true,
      },
      inspect: {
        path: "${config_account}/widget/page.inspect",
        blockHeight: "final",
        init: {
          name: "Inspect",
        },
        hide: true,
      },
      project: {
        path: "${config_account}/widget/page.project",
        blockHeight: "final",
        init: {
          name: "Project Page",
        },
        hide: true,
      },
      notifications: {
        path: "${config_account}/widget/page.notifications",
        blockHeight: "final",
        init: {
          name: "Notifications",
        },
        hide: true,
      },
    },
  },
};

return (
  <CSS>
    <Widget
      src="${config_account}/widget/app.view"
      props={{ config, ...props }}
    />
  </CSS>
);
