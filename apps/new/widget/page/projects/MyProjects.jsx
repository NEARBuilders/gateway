if (!context.accountId) {
  return (
    <Widget
      src="${config_account}/widget/components.LoginAction"
      loading=""
      props={{
        text: "Please log in in order to see your projects!",
      }}
    />
  );
}

const { fetchProjects } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  fetchProjects: () => {},
};

if (!fetchProjects) {
  return "";
}

const projects = fetchProjects() || [];
projects = projects.filter(
  (project) => project.accountId === context.accountId,
);

if (!projects) {
  return "";
}

return (
  <Widget
    src="${config_account}/widget/page.projects.MainViewContainer"
    loading=""
    props={{
      subheading: "Find your projects",
      description: "Projects created by you or which you own",
      projects: projects,
      showOpenRoles: true,
      showCreateProject: true,
    }}
  />
);
