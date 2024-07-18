const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};

const { fetchProjects } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  fetchProjects: () => [],
};

const projects = fetchProjects();

return (
  <Widget
    src="${config_account}/widget/page.projects.MainViewContainer"
    loading=""
    props={{
      subheading: "Discover Projects",
      description:
        "Easily create, share, and track all projects within our vibrant builder community",
      projects: projects,
      showOpenRoles: true,
      showCreateProject: true,
    }}
  />
);
