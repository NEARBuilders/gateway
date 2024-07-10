const indexer = "https://nearcatalog.xyz/wp-json/nearcatalog/v1";
const projects = {};
const query = "";

const CardSkeletonContainer = styled.div`
  @keyframes loadingSkeleton {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.6;
    }
  }

  display: flex;
  flex-direction: column;
  height: 447px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background: var(--bg-color, #23242b);
  color: var(--text-color, #fff);
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  animation-name: loadingSkeleton;
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const HeaderSkeleton = styled.div`
  display: block;
  width: 100%;
  height: 168px;
  background: #eee;
`;

const TitleSkeleton = styled.div`
  width: 120px;
  height: 24px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const DescriptionSkeleton = styled.div`
  width: 83%;
  height: 48px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const TagSkeleton = styled.div`
  background: #eee;
  border-radius: 4px;
  height: 34px;
  width: 110px;
  margin: 24px;
`;

const CardSkeleton = () => (
  <CardSkeletonContainer>
    <HeaderSkeleton />
    <TitleSkeleton />
    <DescriptionSkeleton />
    <TagSkeleton />
  </CardSkeletonContainer>
);

query = fetch(indexer + "/projects");
if (!query || !query.body) {
  return "Loading...";
}
projects = query.body;

if (!projects) {
  return "No projects found";
}

const Container = styled.div`
  .error-bg {
    background-color: #4d4d4d;
    color: white;
  }
  max-width: 100%;
`;

const [filteredProjects, setFilteredProjects] = useState(projects);
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
  <Container className="d-flex flex-column gap-4 p-4">
    {Search}
    {Object.keys(filteredProjects).length === 0 && (
      <div className="error-bg p-3 h6 rounded-3">
        {searchTerm
          ? "No projects were found for your search query."
          : "Network issue: Couldn't fetch any projects, please try again later."}
      </div>
    )}
    <ProjectsGrid>
      {Object.keys(filteredProjects).map((projectId) => {
        return (
          <Widget
            src={"${alias_new}/widget/page.projects.CatalogProjectCard"}
            loading={<CardSkeleton />}
            props={{
              project: filteredProjects[projectId],
              setSelectedProjectId: setSelectedProjectId,
            }}
          />
        );
      })}
    </ProjectsGrid>
  </Container>
);
