/** This may be moved to a separate, common SDK */
const fetchThings = ({ app, type, options }) => {
  const keys = Social.keys(
    `*/${app}/${type}/*`,
    "final",
    options || {
      order: "desc",
    },
  );

  let flattenedKeys = flattenObject(keys);
  const things = Social.get(flattenedKeys, "final");
  // check if things is singular (since we have to update the return format for parsing)
  const isSingular = flattenedKeys.length === 1;
  if (isSingular) {
    const [_app, _type, _id] = flattenedKeys?.[0]?.split("/").slice(0, 3);
    return {
      [_app]: {
        [_type]: {
          [_id]: things,
        },
      },
    };
  }
  return things;
};

const flattenObject = (obj, app, type) => {
  let paths = [];

  try {
    Object.keys(obj).forEach((key) => {
      const items = Object.keys(obj?.[key]?.[app]?.[type] ?? {});
      items.map((path) => {
        if (!path || !path.includes("_")) {
          return;
        }
        const convertedStr = path.replace(/_/g, "/");
        paths.push(convertedStr);
      });
    });
  } catch (e) {}
  return paths;
};

return { flattenObject, fetchThings };
