if (!context.accountId) {
  return (
    <Widget
      src="${config_account}/widget/components.LoginAction"
      loading=""
      props={{
        text: "Please log in in order to see involved projects.",
      }}
    />
  );
}

const { fetchProjects } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  fetchProjects: () => [],
};

const projects = fetchProjects();

projects = projects.filter((project) =>
  project.contributors.includes(context.accountId),
);

return (
  <Widget
    src="${config_account}/widget/page.projects.MainViewContainer"
    loading=""
    props={{
      description: "See all the projects you are involved in.",
      projects: projects,
    }}
  />
);
