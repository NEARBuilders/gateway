const { routes } = VM.require("${config_account}/widget/config.project") ?? {
  routes: {},
};

const { ProjectLayout } = VM.require(
  "${config_account}/widget/template.ProjectLayout",
) || {
  ProjectLayout: () => <></>,
};

const { SidebarLayout } = VM.require(
  "${config_account}/widget/template.SidebarLayout",
) || {
  SidebarLayout: () => <></>,
};

const { id } = props;

const data = JSON.parse(Social.get(id, "final") ?? {});
if (!id || !data) {
  return "Loading...";
}

const profile = Social.getr(`${data.projectAccountId}/profile`);

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
        <ProjectLayout
          profile={profile}
          projectAccountId={data.projectAccountId}
          page={page}
          routes={config.router.routes}
          project={project}
          id={id}
          {...props}
        ></ProjectLayout>
      </>
    ),
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "tab",
    routes: {
      overview: {
        path: "${config_account}/widget/components.project.page.Overview",
        blockHeight: "final",
        init: {
          ...props,
        },
        default: "true",
      },
      activity: {
        path: "${config_account}/widget/components.project.page.Activity",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      discussion: {
        path: "${config_account}/widget/components.project.page.Discussion",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      task: {
        path: "${config_account}/widget/components.project.page.Task",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      code: {
        path: "${config_account}/widget/components.project.page.Code",
        blockHeight: "final",
        init: {
          ...props,
        },
      },
      roadmap: {
        path: "${config_account}/widget/components.project.page.Roadmap",
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

const profileData = {
  name: data.title,
  description: data.description,
  linktree: {
    github: data.github,
    telegram: data.telegram,
    twitter: data.twitter,
    website: data.website,
  },
  backgroundImage: data.backgroundImage?.image,
  image: data.profileImage?.image,
};

const Root = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;
  width: 100%;

  padding: 24px 40px;
`;

return (
  <Root>
    <Widget
      src="${config_account}/widget/app.view"
      props={{ config, ...props }}
    />
  </Root>
);
