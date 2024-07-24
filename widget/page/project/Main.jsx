const { id } = props;
const { getProjectMeta } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  getProjectMeta: () => {},
};

const data = getProjectMeta(id);
if (!id || !data) {
  return "Loading...";
}

const profileData = {
  name: data.title,
  description: data.description,
  linktree: data.linktree,
  backgroundImage: data.backgroundImage?.image ?? data.backgroundImage,
  image: data.profileImage?.image ?? data.profileImage,
};

const profile = Social.getr(`${data.projectAccountId}/profile`);

const { Layout } = VM.require(
  "${config_account}/widget/page.project.Layout",
) || {
  Layout: () => <></>,
};
const config = {
  theme: {
    "--font-family": "Poppins, sans-serif",
    fontFamily: "var(--font-family)",
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
      <>
        <Layout
          profile={profileData}
          projectAccountId={data.projectAccountId}
          page={page}
          project={project}
          projectId={id}
          accountId={context.accountId}
          {...props}
        ></Layout>
      </>
    ),
    Sidebar: () => (
      <Widget
        src="${config_account}/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/${config_index}?page=project",
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
        path: "${config_account}/widget/page.project.tabs.Overview",
        blockHeight: "final",
        init: {
          ...props,
        },
        default: true,
      },
      activity: {
        path: "${config_account}/widget/page.project.tabs.Discussion",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      discussion: {
        path: "${config_account}/widget/page.project.tabs.Discussion",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      tasks: {
        path: "${config_account}/widget/page.project.tabs.Task",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      code: {
        path: "${config_account}/widget/page.project.tabs.Code",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      roadmap: {
        path: "${config_account}/widget/page.project.tabs.Roadmap",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
    },
  },
};

// remove unselected tabs
if (Array.isArray(data?.tabs)) {
  Object.keys(config.router.routes).forEach((key) => {
    if (!data.tabs.includes(key)) {
      delete config.router.routes[key];
    }
  });
}

return (
  <div className="mt-3 container-xl">
    <Widget src="${alias_every}/widget/app.view" props={{ config, ...props }} />
  </div>
);
