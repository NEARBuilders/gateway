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

const data = Social.get(id + "/**", "final");

if (!id || !data) {
  return "Loading...";
}

function transformKeys(obj) {
  obj.tags = obj.tracks;
  delete obj.tracks;

  obj.contributors = obj.teammates;
  delete obj.teammates;

  return obj;
}

const project = transformKeys(JSON.parse(data[""]));

const profile = Social.getr(`${accountId}/profile`, "final");

const { SidebarLayout } = VM.require(
  "${config_account}/widget/template.SidebarLayout",
) || {
  SidebarLayout: () => <></>,
};

const config = {
  theme: {},
  layout: {
    src: "devs.near/widget/Layout",
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
