const config = {
  theme: {
    "--color": "white",
    color: "var(--color)",
  },
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "sidebar",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => <></>,
    Sidebar: () => (
      <Widget
        src="${config_account}/widget/components.sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/builddao.near/widget/build",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      projects: {
        label: "BUILD",
        init: {
          name: "Projects",
          icon: "bi bi-gear",
        },
        routes: {
          allProjects: {
            init: {
              name: "All Projects",
            },
          },
        },
      },
      allProjects: {
        path: "${config_account}/widget/page.projects",
        blockHeight: "final",
        init: {
          name: "All Projects",
        },
        hide: true,
      },
      activity: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "See Activity",
        },
        default: true,
      },
      requestFeedback: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "Request Feedback",
          icon: "bi bi-volume-down fs-6",
        },
      },
      fundingProgram: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "Funding Program",
          icon: "bi bi-coin",
        },
      },
      guide: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "Guide",
          icon: "bi bi-journal-text",
        },
      },
      learn: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        label: "LEARN",
        init: {
          name: "All",
          icon: "bi bi-text-left",
        },
      },
      read: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "Read",
          icon: "bi bi-journal-text",
        },
      },
      watch: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "Watch",
          icon: "bi bi-camera-video",
        },
      },
      tools: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "Tools",
          icon: "bi bi-gear",
        },
      },
      components: {
        path: "${config_account}/widget/Index",
        blockHeight: "final",
        init: {
          name: "Components",
          icon: "bi bi-x-diamond",
        },
      },
    },
  },
};

return (
  <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
);
