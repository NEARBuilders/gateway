const flattenObject = (obj, app, type) => {
  const paths = [];
  for (const key of Object.keys(obj)) {
    const projects = Object.keys(obj?.[key]?.[app]?.[type] ?? {});
    for (const project of projects) {
      if (project && project.includes("_")) {
        const convertedStr = project.replace(/_/g, "/");
        paths.push(convertedStr);
      }
    }
  }
  return paths;
};

const fetchThings = (props, app, type) => {
  const keys = Social.keys(`*/${app}/${type}/*`, "final", {
    order: props.order ?? "desc",
    subscribe: props.subscribe ?? true,
  });

  if (!keys) {
    return "Loading...";
  }

  const flattenedKeys = flattenObject(keys, app, type);
  const projects = Social.get(flattenedKeys, "final");

  // Check if projects is singular (since we have to update the return format for parsing)
  if (flattenedKeys.length === 1) {
    const [name, project, projectName] = flattenedKeys[0]
      .split("/")
      .slice(0, 3);
    return {
      [name]: {
        [project]: {
          [projectName]: projects,
        },
      },
    };
  }

  return projects;
};

const processData = (data, type) => {
  return Object.entries(data ?? {}).flatMap(([accountId, accountData]) => {
    return Object.entries(accountData?.[type] ?? {}).map(
      ([projectID, metadataStr]) => {
        const metadata = JSON.parse(metadataStr);
        return {
          ...metadata,
          accountId,
          type,
          title: metadata.title,
          metadata,
          tags: metadata.tags || [],
          collaborators: metadata.contributors,
          projectID,
        };
      },
    );
  });
};

const fetchProjects = (props) => {
  const app = props.app || "${alias_old}";
  const type = props.type || "project";

  const data = fetchThings(props, app, type);

  if (!data) {
    return "Loading...";
  }

  return processData(data, type);
};

const getProjectMeta = (id) => {
  if (!id) {
    throw new Error("Invalid project ID");
  }

  const data = Social.get(id, "final");

  if (!data) {
    console.log("Failed to fetch project data");
  }

  try {
    const pj = JSON.parse(data);
    return pj;
  } catch (error) {
    console.error("Error parsing project data:", error);
    return null;
  }
};

return {
  fetchProjects,
  getProjectMeta,
};
