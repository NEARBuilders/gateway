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
          currentRoute: "/${config_index}?page=projects",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      allProjects: {
        path: "${config_account}/widget/page.projects.List",
        blockHeight: "final",
        init: {
          name: "All Projects",
          icon: "bi bi-text-left",
        },
        default: true,
      },
      myProjects: {
        path: "${config_account}/widget/page.projects.MyProjects",
        blockHeight: "final",
        init: {
          name: "My Projects",
          icon: "bi bi-star",
        },
      },
      watchList: {
        path: "${config_account}/widget/page.projects.Watchlist",
        blockHeight: "final",
        init: {
          name: "Watchlist",
          icon: "bi bi-eye",
        },
      },
      involvedProjects: {
        path: "${config_account}/widget/page.projects.Involved",
        blockHeight: "final",
        init: {
          name: "Projects Involved",
          icon: "bi bi-journal-text",
        },
      },
      editor: {
        path: "${config_account}/widget/page.projects.Editor",
        blockHeight: "final",
        init: {
          name: "Create Project",
        },
        hide: true,
      },
      potlockImport: {
        path: "${config_account}/widget/page.projects.PotlockImport",
        blockHeight: "final",
        init: {
          name: "Import Project",
        },
        hide: true,
      },
    },
  },
};

return (
  <div className="mt-3 container-xl">
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </div>
);
