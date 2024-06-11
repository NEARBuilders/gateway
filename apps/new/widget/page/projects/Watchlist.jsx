if (!context.accountId) {
  return (
    <Widget
      src="${config_account}/widget/components.LoginAction"
      loading=""
      props={{
        text: "Please log in in order to see watchlist projects!",
      }}
    />
  );
}

const { fetchProjects } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  fetchProjects: () => [],
};

const stars = Social.getr(
  `${context.accountId}/graph/star/*/project`,
  "final",
  {
    withBlockHeight: true,
  },
);
const StorageKey = "order";
const order = Storage.privateGet(StorageKey);
const starredProjects = useMemo(() => {
  if (stars === null || order === null) {
    return [];
  }
  const starredApps = new Map();
  const path = [];

  const buildSrc = (node) => {
    if (node.hasOwnProperty("")) {
      starredApps.set(path.join("/"), node[":block"]);
    }
    Object.entries(node).forEach(([key, value]) => {
      if (typeof value === "object") {
        path.push(key);
        buildSrc(value);
        path.pop();
      }
    });
  };

  buildSrc(stars ?? {}, [], starredApps);
  let apps = [...starredApps.entries()];
  apps.sort((a, b) => b[1] - a[1]);
  apps = apps.map((a) => a[0]);
  apps.sort((a, b) => (order?.[a] || 0) - (order?.[b] || 0));
  Storage.privateSet(
    StorageKey,
    Object.fromEntries(apps.map((a, i) => [a, i + 1])),
  );
  return apps;
}, [stars, order]);

const starredProjectIds = starredProjects.map(
  (project) => project.split("/")[2],
);

const projects =
  fetchProjects().filter((project) =>
    starredProjectIds.includes(project.projectID),
  );

return (
  <Widget
    src="${config_account}/widget/page.projects.MainViewContainer"
    loading=""
    props={{
      description: "Keep track of projects on your watch list.",
      heading: "Watchlist",
      projects: projects,
    }}
  />
);
