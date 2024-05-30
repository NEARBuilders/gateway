const { id } = props;

const data = JSON.parse(Social.get(id, "final") ?? {});
if (!id || !data) {
  return "Loading...";
}

const profileData = {
  name: data.title,
  description: data.description,
  linktree: {
    github: data.github,
    telegram: data.telegram,
    twitter: data.twitter,
    website: data.website,
  },
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
  theme: {},
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
          routes={config.router.routes}
          project={project}
          id={id}
          {...props}
        ></Layout>
      </>
    ),
    Sidebar: () => (
      <Widget
        src="${config_account}/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/${config_account}/widget/Index?page=project",
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
        path: "${config_account}/widget/components.project.pages.Overview",
        blockHeight: "final",
        init: {
          ...props,
        },
        default: "true",
      },
      activity: {
        path: "${config_account}/widget/components.project.pages.Activity",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      discussion: {
        path: "${config_account}/widget/components.project.pages.Discussion",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      tasks: {
        path: "${config_account}/widget/components.project.pages.Task",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      code: {
        path: "${config_account}/widget/components.project.pages.Code",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      roadmap: {
        path: "${config_account}/widget/components.project.pages.Roadmap",
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
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </div>
);
