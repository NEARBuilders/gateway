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
          currentRoute: "/builddao.near/widget/Index?page=build",
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
        default: true,
        hide: true,
      },
      activity: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        init: {
          name: "See Activity",
        },
      },
      requestFeedback: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        init: {
          name: "Request Feedback",
          icon: "bi bi-volume-down fs-6",
        },
      },
      fundingProgram: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        init: {
          name: "Funding Program",
          icon: "bi bi-coin",
        },
      },
      guide: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        init: {
          name: "Guide",
          icon: "bi bi-journal-text",
        },
        routes: {
          gettingStarted: {
            init: { name: "Getting Started" },
          },
          migrationGuide: {
            init: { name: "MG" },
          },
          Installation: {
            init: { name: "INS" },
          },
          Setup: {
            init: { name: "Setup" },
          },
        },
      },
      gettingStarted: {
        path: "${alias_old}/widget/Resources",
        blockHeight: "final",
        init: {
          name: "Getting Started",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/develop/md/getting_started/index.md",
        },
        hide: true,
      },
      migrationGuide: {
        init: { name: "MG" },
        hide: true,
      },
      Installation: {
        init: { name: "INS" },
        hide: true,
      },
      Setup: {
        init: { name: "Setup" },
        hide: true,
      },
      learn: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        label: "LEARN",
        init: {
          name: "All",
          icon: "bi bi-text-left",
        },
      },
      read: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        init: {
          name: "Read",
          icon: "bi bi-journal-text",
        },
      },
      watch: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        init: {
          name: "Watch",
          icon: "bi bi-camera-video",
        },
      },
      tools: {
        path: "${config_account}/widget/dummy",
        blockHeight: "final",
        init: {
          name: "Tools",
          icon: "bi bi-gear",
        },
      },
      components: {
        path: "${config_account}/widget/dummy",
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
  <div className="mt-3 container-xl">
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </div>
);
