const { Layout } = VM.require(
  "${config_account}/widget/page.project.Layout",
) || {
  Layout: () => <></>,
};
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
          currentRoute: "/${config_account}/widget/Index?page=projects",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      myProjects: {
        init: {
          name: "My Projects",
          icon: "bi bi-star",
        },
      },
      myToolkits: {
        init: {
          name: "My Toolkits",
          icon: "bi bi-database",
        },
      },
      projectsInvolved: {
        init: {
          name: "Projects Involved",
          icon: "bi bi-clipboard",
        },
      },
      project: {
        path: "${config_account}/widget/page.project.Main",
        blockHeight: "final",
        default: true,
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
