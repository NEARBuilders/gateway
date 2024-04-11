const { routes } = VM.require("${config_account}/widget/config.project") ?? {
  routes: {},
};

const { ProjectLayout } = VM.require(
  "${config_account}/widget/template.ProjectLayout",
) || {
  ProjectLayout: () => <></>,
};

const { id } = props;
const extractNearAddress = (id) => {
  const parts = id.split("/");
  if (parts.length > 0) {
    return parts[0];
  }
  return "";
};
const accountId = extractNearAddress(id);

const data = JSON.parse(Social.get(id, "final") ?? {});
if (!id || !data) {
  return "Loading...";
}

const project = JSON.parse(data);

const projectSelectedRoutes = routes;

// remove unselected tabs
if (Array.isArray(project?.tabs)) {
  Object.keys(projectSelectedRoutes).forEach((key) => {
    if (!project.tabs.includes(key)) {
      delete projectSelectedRoutes[key];
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

const { SidebarLayout } = VM.require(
  "${config_account}/widget/template.SidebarLayout",
) || {
  SidebarLayout: () => <></>,
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
        <ProjectLayout
          profile={profile}
          accountId={accountId}
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
        init: {},
        default: "true",
      },
      discussion: {
        path: "${config_account}/widget/components.project.page.Discussion",
        blockHeight: "final",
        init: {},
      },
      task: {
        path: "${config_account}/widget/components.project.page.Task",
        blockHeight: "final",
        init: {},
      },
      code: {
        path: "${config_account}/widget/components.project.page.Code",
        blockHeight: "final",
        init: {},
      },
      roadmap: {
        path: "${config_account}/widget/components.project.page.Roadmap",
        blockHeight: "final",
        init: {},
      },
    },
  },
};

const Root = styled.div`
  padding: 24px 56px;
`;

return (
  <Root>
    <Widget
      src="${config_account}/widget/app.view"
      props={{ config, ...props }}
    />
  </Root>
);
