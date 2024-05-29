const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { item } = props;

const starredProjects =
  Social.get(`${context.accountId}/project/starred`) || [];

const data = {
  project: {
    starred: JSON.parse(starredProjects).includes(item.id)
      ? JSON.parse(starredProjects).filter((project) => project != item.id)
      : [...JSON.parse(starredProjects), item.id],
  },
};

return (
  <Button
    type="icon"
    variant={
      JSON.parse(starredProjects).includes(item.id) ? "primary" : "outline"
    }
    className="rounded-2"
    onClick={(event) => {
      event.stopPropagation();
      event.preventDefault();
      Social.set(data);
    }}
  >
    <i
      className={
        JSON.parse(starredProjects).includes(item.id)
          ? "bi bi-star-fill"
          : "bi bi-star"
      }
    ></i>
  </Button>
);
