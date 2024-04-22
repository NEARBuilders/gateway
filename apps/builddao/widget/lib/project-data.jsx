// Get id from the file as a parameter

const getProjectMeta = (id) => {
  if (!id) {
    throw new Error("Invalid project ID");
  }

  const data = Social.get(id, "final");

  if (!data) {
    throw new Error("Failed to fetch project data");
  }

  try {
    const pj = JSON.parse(data);
    return pj;
  } catch (error) {
    console.error("Error parsing project data:", error);
    return null;
  }
};

return { getProjectMeta };
