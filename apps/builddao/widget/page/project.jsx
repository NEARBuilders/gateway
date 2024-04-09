const { page, tab, type, app, ...passProps } = props;

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

const Root = styled.div``;

function Router({ active, routes }) {
  // this may be converted to a module at devs.near/widget/Router
  const routeParts = active.split(".");

  let currentRoute = routes;
  let src = "";
  let defaultProps = {};

  for (let part of routeParts) {
    if (currentRoute[part]) {
      currentRoute = currentRoute[part];
      src = currentRoute.path;

      if (currentRoute.init) {
        defaultProps = { ...defaultProps, ...currentRoute.init };
      }
    } else {
      // Handle 404 or default case for unknown routes
      return <p>404 Not Found</p>;
    }
  }
  return (
    <div key={active}>
      <Widget
        src={src}
        props={{
          currentPath: `/${config_account}/widget/app?page=${page}&tab=${tab}`,
          page: tab,
          ...passProps,
          ...defaultProps,
        }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

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

return (
  <Root>
    <Container>
      <ProjectLayout
        profile={profileData}
        projectAccountId={data.projectAccountId}
        tab={page}
        routes={routes}
        project={project}
        id={id}
        {...props}
      >
        <Content>
          <Router active={page} routes={routes} />
        </Content>
      </ProjectLayout>
    </Container>
  </Root>
);
