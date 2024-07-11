const { Feed } = VM.require("${alias_devs}/widget/Feed") || {
  Feed: () => <></>,
};

const { CardSkeleton } = VM.require(
  "${alias_new}/widget/page.projects.CardSkeleton",
) || {
  CardSkeleton: () => <></>,
};

const indexer = "https://nearcatalog.xyz/wp-json/nearcatalog/v1";
const query = "";

let projects = {};

projects = useCache(() => {
  return asyncFetch(indexer + "/projects").then((res) => {
    if (res.ok) {
      return res.body;
    } else {
      return {};
    }
  });
}, ["near-catalog-projects"]);

const [filteredProjects, setFilteredProjects] = useState({});

useEffect(() => {
  if (projects) {
    setFilteredProjects(projects);
  }
}, [projects]);

const [searchTerm, setSearch] = useState(null);

const Search = useMemo(() => {
  return (
    <Widget
      src={"${alias_new}/widget/page.projects.SearchBar"}
      props={{
        title: sort,
        numItems: filteredProjects.length,
        term: searchTerm,
        itemName: "project",
        onSearch: (value) => {
          setSearch(value);

          if (searchTerm === value) return;
          if (searchTerm === "") return;

          const filtered = {};
          Object.keys(projects).forEach((projectId) => {
            if (
              projects[projectId].profile.name
                .toLowerCase()
                .includes(value.toLowerCase())
            ) {
              filtered[projectId] = projects[projectId];
            }

            if (
              projects[projectId].profile.tagline
                .toLowerCase()
                .includes(value.toLowerCase())
            ) {
              filtered[projectId] = projects[projectId];
            }

            const tags = Object.values(projects[projectId].profile.tags);
            if (
              tags.some((tag) =>
                tag.toLowerCase().includes(value.toLowerCase()),
              )
            ) {
              filtered[projectId] = projects[projectId];
            }
          });
          setFilteredProjects(filtered);
        },
      }}
    />
  );
}, [projects, searchTerm]);

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  max-width: 100%;
`;

const [selectedProjectId, setSelectedProjectId] = useState(null);

if (selectedProjectId) {
  return (
    <Widget
      src="${alias_new}/widget/page.projects.Editor"
      loading=""
      props={{
        catalogProjectId: selectedProjectId,
      }}
    />
  );
}

return (
  <div className="d-flex flex-column gap-4 p-4">
    {Search}
    {projects === null ? (
      <>
        <div className="error-bg p-3 h6 rounded-3">Loading projects...</div>
      </>
    ) : (
      <>
        {Object.keys(filteredProjects).length === 0 && (
          <div className="error-bg p-3 h6 rounded-3">
            {searchTerm
              ? "No projects were found for your search query."
              : "Network issue: Couldn't fetch any projects, please try again later."}
          </div>
        )}
      </>
    )}
    <Feed
      items={Object.keys(filteredProjects).map((projectId) => ({ projectId }))}
      Item={({ projectId }) => (
        <Widget
          src={"${alias_new}/widget/page.projects.CatalogProjectCard"}
          loading={<CardSkeleton varaint={"catalog"} />}
          props={{
            project: filteredProjects[projectId],
            setSelectedProjectId: setSelectedProjectId,
          }}
        />
      )}
      Layout={ProjectsGrid}
    />
  </div>
);
