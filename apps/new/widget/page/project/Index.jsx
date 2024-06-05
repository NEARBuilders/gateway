const { id } = props;
const { getProjectMeta, getProjectIdFromPath } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  getProjectMeta: () => {},
  getProjectIdFromPath: () => {},
};

const data = getProjectMeta(id);
if (!id || !data) {
  return "Loading...";
}

const { Layout } = VM.require(
  "${config_account}/widget/page.project.Layout",
) || {
  Layout: () => <></>,
};

const projectId = getProjectIdFromPath(id);

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
      overview: {
        label: "Project",
        path: "${config_account}/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "overview",
          name: "Overview",
          icon: "bi bi-house",
        },
        default: "true",
      },
      tasks: {
        path: "${config_account}/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "tasks",
          name: "Tasks",
          icon: "bi bi-check-square",
        },
      },
      discussion: {
        path: "${config_account}/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "discussion",
          name: "Discussion",
          icon: "bi bi-chat-dots",
        },
      },
      code: {
        path: "${config_account}/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "code",
          name: "Code",
          icon: "bi bi-code-slash",
        },
      },
      roadmap: {
        path: "${config_account}/widget/page.project.Main",
        blockHeight: "final",
        init: {
          tab: "roadmap",
          name: "Roadmap",
          icon: "bi bi-map",
        },
      },
      activity: {
        path: "${alias_old}/widget/Feed",
        blockHeight: "final",
        label: "Activity",
        init: {
          feedName: `${data.title}`,
          name: "Activity",
          icon: "bi bi-list",
          requiredHashtags: ["build", projectId],
        },
      },
      updatesFeed: {
        path: "${alias_old}/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: `${data.title} Updates`,
          name: "Updates",
          icon: "bi bi-bell",
          requiredHashtags: ["build", projectId, "updates"],
        },
      },
      feedbackFeed: {
        path: "${alias_old}/widget/Feed",
        blockHeight: "final",
        init: {
          feedName: `${data.title} Feedback`,
          name: "Feedback",
          icon: "bi bi-chat-left-text",
          requiredHashtags: ["build", projectId, "feedback"],
        },
      },
    },
  },
};

// remove unselected tabs
if (Array.isArray(data?.tabs)) {
  Object.keys(config.router.routes).forEach((key) => {
    if (!data.tabs.includes(key.toLowerCase())) {
      delete config.router.routes[key];
    }
  });
}

return (
  <div className="mt-3 container-xl">
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </div>
);
