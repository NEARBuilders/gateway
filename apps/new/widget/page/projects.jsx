const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { ProjectCard } = VM.require(
  "${config_account}/widget/components.project.card",
) || {
  ProjectCard: () => <></>,
};
const { ProjectList } = VM.require(
  "${config_account}/widget/components.project.list",
) || {
  ProjectList: () => <></>,
};

const app = props.app || "${alias_old}";
const type = props.type || "project";

const flattenObject = (obj) => {
  let paths = [];

  try {
    Object.keys(obj).forEach((key) => {
      const projects = Object.keys(obj?.[key]?.[app]?.[type] ?? {});
      projects.map((path) => {
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

const fetchProjects = () => {
  const keys = Social.keys(`*/${app}/${type}/*`, "final", {
    order: "desc",
    subscribe: true,
  });
  if (!keys) {
    return "Loading...";
  }
  let flattenedKeys = flattenObject(keys);
  const projects = Social.get(flattenedKeys, "final");
  // check if projects is singular (since we have to update the return format for parsing)
  const isSingular = flattenedKeys.length === 1;
  if (isSingular) {
    const [name, project, projectName] = flattenedKeys?.[0]
      ?.split("/")
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

const data = fetchProjects();

if (!data) {
  return "Loading...";
}

const processData = useCallback(
  (data) => {
    const accounts = Object.entries(data ?? {});
    const allProjects = accounts
      .map((account) => {
        const accountId = account[0];
        return Object.entries(account?.[1]?.[type] ?? {}).map((kv) => {
          const metadata = JSON.parse(kv[1]);
          return {
            ...metadata,
            accountId,
            type: type,
            title: metadata.title,
            metadata,
            tags: metadata.tags || [],
            collaborators: metadata.contributors,
            projectID: kv[0],
          };
        });
      })
      .flat();

    return allProjects;
  },
  [type],
);

const projects = processData(data);

if (!projects) {
  return "";
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;

  @media screen and (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: Poppins, sans-serif;

  input {
    font-family: Poppins, sans-serif;
    color: white;
    height: 40px;

    &::placeholder {
      color: #b0b0b0;
    }
  }
`;

const [filters, setFilters] = useState({
  title: "",
});
const [showFilterModal, setShowFilterModal] = useState(false);
const [showCreateModal, setShowCreateModal] = useState(false);
const [showCreateOptionsModal, setShowCreateOptionsModal] = useState(false);
const [showImportModal, setShowImportModal] = useState(false);

const toggleFilterModal = () => {
  setShowFilterModal((prev) => !prev);
};
const toggleCreateModal = () => {
  setShowCreateModal((prev) => !prev);
};

const toggleImportModal = () => {
  setShowImportModal((prev) => !prev);
};

const toggleCreateOptionsModal = () => {
  setShowCreateOptionsModal((prev) => !prev);
};

const filteredProjects = useMemo(() => {
  let filtered = projects;
  if (filters.title !== "") {
    filtered = filtered.filter((project) =>
      project.title.toLowerCase().includes(filters.title ?? "".toLowerCase()),
    );
  }

  if (filters.teamSize !== "") {
    filtered = filtered.filter((project) => {
      switch (filters.teamSize) {
        case "1-10":
          return project.collaborators.length <= 10;
        case "10-50":
          return (
            project.collaborators.length <= 50 &&
            project.collaborators.length >= 10
          );
        case "50-100":
          return (
            project.collaborators.length <= 100 &&
            project.collaborators.length >= 50
          );
        case "100+":
          return project.collaborators.length > 100;
        default:
          return true;
      }
    });
  }

  if (filters.tags.length > 0) {
    filtered = filtered.filter((project) =>
      filters.tags.every((tag) => project.tags.includes(tag)),
    );
  }
  return filtered;
}, [filters, projects]);

const tagFilters = useMemo(() => {
  let tags = projects.map((project) => project.tags).flat();
  tags = [...new Set(tags)];
  return tags;
}, [projects]);

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins, sans-serif;
    font-size: 40px;
    line-height: 120%; /* 48px */
    letter-spacing: -1.6px;
    margin: 0;
  }

  p {
    color: #e8e8e8;
    font-family: Poppins, sans-serif;
    font-size: 18px;
    margin: 0;
    max-width: 490px;
  }
`;

const Subheading = styled.h3`
  color: #fff;
  font-family: Poppins, sans-serif;
  font-size: 24px;
  font-weight: 500;
  line-height: 130%; /* 31.2px */
  letter-spacing: -0.48px;
  margin: 0;
`;

const view = Storage.get("projectsView") ?? "grid";

return (
  <Wrapper
    className="container-xl mx-auto d-flex flex-column gap-5"
    data-bs-theme="dark"
  >
    <Widget
      src="${alias_old}/widget/components.modals.projects.Filters"
      loading=""
      props={{
        showModal: showFilterModal,
        toggleModal: toggleFilterModal,
        filters: filters,
        setFilters: setFilters,
        tagFilters,
      }}
    />
    <Widget
      src="${alias_old}/widget/components.modals.projects.ImportAndCreate"
      loading=""
      props={{
        showModal: showCreateOptionsModal,
        toggleModal: toggleCreateOptionsModal,
        onClickImport: () => {
          setShowCreateOptionsModal(false);
          setShowImportModal(true);
        },
        onClickCreate: () => {
          setShowCreateOptionsModal(false);
          setShowCreateModal(true);
        },
      }}
    />
    <Widget
      src="${alias_old}/widget/components.modals.projects.PotlockImport"
      loading=""
      props={{
        showModal: showImportModal,
        toggleModal: toggleImportModal,
      }}
    />
    <Widget
      src="${alias_old}/widget/components.modals.projects.Create"
      loading=""
      props={{
        showModal: showCreateModal,
        toggleModal: toggleCreateModal,
      }}
    />

    <Heading>
      <div className="d-flex align-items-center justify-content-between">
        <h2>Projects</h2>
        <div className="d-flex align-items-center gap-2">
          {context.accountId && (
            <Button
              variant="primary"
              onClick={() => setShowCreateOptionsModal(true)}
            >
              Create Project
            </Button>
          )}
          <Button>Open Roles</Button>
        </div>
      </div>
      <p>
        Easily create, share, and track all projects within our vibrant builder
        community.
      </p>
    </Heading>
    <div className="d-flex flex-column gap-3">
      <Subheading>Discover Projects</Subheading>
      <div className="form-group d-flex gap-4 align-items-center justify-content-between">
        <div className="input-group">
          <div
            className="input-group-text border-0"
            style={{ backgroundColor: "#23242b", color: "#B0B0B0" }}
          >
            <i className="bi bi-search"></i>
          </div>
          <input
            className="form-control border-0"
            style={{ backgroundColor: "#23242b" }}
            placeholder="Search by project ID or name"
            value={filters.title}
            onChange={(e) => setFilters({ ...filters, title: e.target.value })}
          />
        </div>
        <div className="d-flex align-items-center gap-3">
          <Button
            className="d-flex align-items-center gap-2"
            variant="outline"
            onClick={() => setShowFilterModal(true)}
          >
            Filter <i className="bi bi-sliders"></i>
          </Button>
          <div className="d-flex align-items-center gap-2">
            <Button
              type="icon"
              className="rounded-2"
              variant={view === "grid" ? "primary" : null}
              onClick={() => Storage.set("projectsView", "grid")}
            >
              <i className="bi bi-grid"></i>
            </Button>
            <Button
              type="icon"
              className="rounded-2"
              variant={view === "list" ? "primary" : null}
              onClick={() => Storage.set("projectsView", "list")}
            >
              <i className="bi bi-list-ul"></i>
            </Button>
          </div>
        </div>
      </div>
    </div>
    {view === "grid" ? (
      <Container>
        {filteredProjects.length === 0 && (
          <p className="fw-bold text-white">No Projects Found</p>
        )}
        {filteredProjects.map((project) => (
          <ProjectCard project={project} type={type} />
        ))}
      </Container>
    ) : (
      <div className="d-flex flex-column gap-3">
        {filteredProjects.length === 0 && (
          <p className="fw-bold text-white">No Projects Found</p>
        )}
        {filteredProjects.map((project) => (
          <ProjectList project={project} type={type} />
        ))}
      </div>
    )}
  </Wrapper>
);
