const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { item } = props;

// Get the list of starred projects for the current user
const starredProjects =
  Social.get(`${context.accountId}/project/starred`) || [];
const parsedStarredProjects = JSON.parse(starredProjects);

// Check if the current item is starred
const isStarred = parsedStarredProjects.includes(item.id);

// Prepare data for updating the starred projects
const updatedStarredProjects = isStarred
  ? parsedStarredProjects.filter((project) => project !== item.id)
  : [...parsedStarredProjects, item.id];

const data = {
  project: {
    starred: updatedStarredProjects,
  },
};

const handleButtonClick = (event) => {
  event.stopPropagation();
  event.preventDefault();
  Social.set(data);
};

return (
  <Button
    type="icon"
    variant={isStarred ? "primary" : "outline"}
    className="rounded-2"
    onClick={handleButtonClick}
  >
    <i className={isStarred ? "bi bi-star-fill" : "bi bi-star"}></i>
  </Button>
);
