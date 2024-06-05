const { Layout } = VM.require(
  "${config_account}/widget/page.project.Layout",
) || {
  Layout: () => <></>,
};

const projectId = props.id.split("/")[2] ?? null;

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
          currentRoute: `/${config_account}/widget/Index?page=project&id=${props.id}`,
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      project: {
        path: "${config_account}/widget/page.project.Main",
        blockHeight: "final",
        default: true,
        init: {
          name: "Project",
          icon: "bi bi-list-task",
        },
      },
      allFeed: {
        label: "Activity",
        path: "${alias_old}/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: `${projectId}`,
          name: "All",
          icon: "bi bi-list",
          requiredHashtags: ["build", projectId],
        },
      },
      updatesFeed: {
        path: "${alias_old}/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: `${projectId} Updates`,
          name: "Updates",
          icon: "bi bi-bell",
          requiredHashtags: ["build", projectId, "updates"],
        },
      },
      feedbackFeed: {
        path: "${alias_old}/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: `${projectId} Feedback`,
          name: "Feedback",
          icon: "bi bi-chat-left-text",
          requiredHashtags: ["build", projectId, "feedback"],
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
