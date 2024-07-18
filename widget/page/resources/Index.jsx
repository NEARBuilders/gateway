const config = {
  theme: {},
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
        src="${config_account}/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/${config_index}?page=resources",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      guide: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        label: "BOS-WORKSPACE DOCS",
        init: {
          name: "Guide",
          icon: "bi bi-journal-text",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/gateway/main/resources.md",
        },
        default: true,
      },
      VM: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          name: "Working with VM",
          icon: "bi bi-journal-text",
          mdPath:
            "https://raw.githubusercontent.com/saadiqbal-dev/bos-workspace-docs/main/md/deploying_widgets/VM.md",
        },
      },

      starter: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          name: "Getting Started",
          icon: "bi bi-journal-text",
        },
        routes: {
          gettingStarted: {
            init: {
              name: "Getting Started",
            },
          },
          migrationGuide: {
            init: {
              name: "Migration Guide",
            },
          },
          installation: {
            init: {
              name: "Installation",
            },
          },
          // Hidden because not available yet
          // setup: {
          //   init: {
          //     name: "Setup",
          //   },
          // },
        },
      },
      migrationGuide: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          feedName: "Migration Guide",
          name: "Migration Guide",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/getting_started/migration_guide.md",
        },
        hide: true,
      },
      installation: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          feedName: "Installation",
          name: "Installation",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/getting_started/installation.md",
        },
        hide: true,
      },
      // setup: {
      //   path: "${config_account}/widget/components.Document",
      //   blockHeight: "final",
      //   init: {
      //     feedName: "Setup",
      //     name: "Setup",
      //     mdPath:
      //       "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/getting_started/setup.md",
      //   },
      //   hide: true,
      // },
      gettingStarted: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          feedName: "Getting Started",
          name: "Getting Started",
          mdPath:
            "https://raw.githubusercontent.com/saadiqbal-dev/bos-workspace-docs/main/md/getting_started/index.md",
        },
        hide: true,
      },
      usageHeading: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          name: "Usage",
          icon: "bi bi-journal-text",
        },

        routes: {
          usage: {
            init: {
              name: "Usage",
            },
          },
          aliases: {
            init: {
              name: "Aliases",
            },
          },
          deploy: {
            init: {
              name: "Deploy",
            },
          },
        },
      },
      aliases: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          feedName: "Aliases",
          name: "Aliases",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/usage/aliases.md",
        },
        hide: true,
      },
      deploy: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          feedName: "Deploy",
          name: "Deploy",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/usage/deploy.md",
        },
        hide: true,
      },
      usage: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        init: {
          feedName: "Usage",
          name: "Usage",
          mdPath:
            "https://raw.githubusercontent.com/NEARBuilders/bos-workspace-docs/main/md/usage/index.md",
        },
        hide: true,
      },
      deploying_widgets: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        label: "Deploying Widgets",
        init: {
          name: "Deploying Widgets",
          icon: "bi bi-database-fill-up ",
          mdPath:
            "https://raw.githubusercontent.com/saadiqbal-dev/bos-workspace-docs/main/md/deploying_widgets/deploying_widgets.md",
        },
      },
      deploying_web4: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",

        init: {
          name: "Web 4.0 Deployment",
          icon: "bi bi-4-square-fill",
          mdPath:
            "https://raw.githubusercontent.com/saadiqbal-dev/bos-workspace-docs/main/md/deploying_widgets/deploying_web4.md",
        },
      },
      adding_new_resouces: {
        path: "${config_account}/widget/components.Document",
        blockHeight: "final",
        label: "Update Resources",
        init: {
          name: "Adding New Resources",
          icon: "bi bi-journal-text",
          mdPath:
            "https://raw.githubusercontent.com/saadiqbal-dev/bos-workspace-docs/main/md/deploying_widgets/adding_new_resources.md",
        },
      },
    },
  },
};

return (
  <div className="mt-3 container-xl">
    <Widget src="${alias_every}/widget/app.view" props={{ config, ...props }} />
  </div>
);
