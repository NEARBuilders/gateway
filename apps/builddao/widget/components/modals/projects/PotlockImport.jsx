const { Modal, Button } = VM.require("${config_account}/widget/components") || {
  Modal: () => <></>,
  Button: () => <></>,
};
const { getTagsFromSocialProfileData, getTeamMembersFromSocialProfileData } =
  VM.require("potlock.near/widget/utils") || {
    getTagsFromSocialProfileData: () => [],
    getTeamMembersFromSocialProfileData: () => [],
  };

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";

let ListsSDK =
  VM.require("potlock.near/widget/SDK.lists") ||
  (() => ({
    getRegistrations: () => {},
  }));
ListsSDK = ListsSDK({ env: "production" });

const allRegistrations = ListsSDK.getRegistrations() || [];
const isRegisteredProject = allRegistrations.find(
  (registration) => registration.registrant_id === accountId,
);

const [showCreateModalProjectId, setShowCreateModalProjectId] = useState(null);
const [projects, approvedProjects] = useMemo(() => {
  allRegistrations.sort((a, b) =>
    b.status === "Approved"
      ? -1
      : a.status === "Approved"
        ? 1
        : a.status.localeCompare(b.status),
  );
  allRegistrations.sort((a, b) => b.submitted_ms - a.submitted_ms);

  const approvedProjects = allRegistrations.filter(
    (project) => project.status === "Approved",
  );
  return [allRegistrations, approvedProjects];
}, allRegistrations);

const [filteredProjects, setFilteredProjects] = useState([]);

useEffect(() => {
  if (!filteredProjects.length) {
    setFilteredProjects(approvedProjects);
  }
}, [approvedProjects]);

const searchByWords = (projects, searchTerm) => {
  searchTerm = searchTerm.toLowerCase().trim();
  let results = [];
  projects.forEach((project) => {
    const { registrant_id, status } = project;
    const data = Social.getr(`${registrant_id}/profile`);
    if (
      registrant_id.includes(searchTerm) ||
      status.toLowerCase().includes(searchTerm)
    ) {
      results.push(project);
    } else if (data) {
      if (
        data.description.toLowerCase().includes(searchTerm) ||
        data.name.toLowerCase().includes(searchTerm) ||
        getTagsFromSocialProfileData(data)
          .join("")
          .toLowerCase()
          .includes(searchTerm) ||
        getTeamMembersFromSocialProfileData(data)
          .join("")
          .toLowerCase()
          .includes(searchTerm)
      ) {
        results.push(project);
      }
    }
  });

  setFilteredProjects(results);
};

const ProjectList = styled.div`
  display: grid;
  gap: 31px;
  padding-bottom: 3rem;
  // For mobile devices (1 column)
  @media screen and (max-width: 739px) {
    grid-template-columns: repeat(1, 1fr);
  }

  // For tablet devices (2 columns)
  @media screen and (min-width: 740px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // For desktop devices (3 columns)
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const Search = useMemo(() => {
  return (
    <Widget
      src={"${config_account}/widget/components.modals.projects.SearchBar"}
      props={{
        title: sort,
        numItems: filteredProjects.length,
        itemName: "project",
        onSearch: (value) => {
          searchByWords(projects, value);
        },
      }}
    />
  );
}, []);

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

const ProjectsComponent = useMemo(() => {
  const shuffledProjects = shuffleArray(filteredProjects || []);
  return (
    <ProjectList>
      {(shuffledProjects || []).slice(0, 18).map((project) => {
        return (
          <Widget
            src={
              "${config_account}/widget/components.modals.projects.PotlockProjectCard"
            }
            loading={
              <div
                style={{
                  width: "300px",
                  height: "450px",
                  borderRadius: "12px",
                  background: "#23242b",
                  boxShadow: "0px -2px 0px #dbdbdb inset",
                  border: "1px solid #dbdbdb",
                }}
              />
            }
            props={{
              ...props,
              projectId: project.registrant_id,
              allowDonate: false,
              setShowCreateModalProjectId: setShowCreateModalProjectId,
            }}
          />
        );
      })}
    </ProjectList>
  );
}, [filteredProjects]);

if (showCreateModalProjectId) {
  return (
    <Widget
      src="${config_account}/widget/components.modals.projects.Create"
      loading=""
      props={{
        showModal: !!showCreateModalProjectId,
        toggleModal: (v) => setShowCreateModalProjectId(v),
        togglePotlockImportModal: () => toggleModal(),
        poltlockProjectId: showCreateModalProjectId,
      }}
    />
  );
}

// console.log({ filteredProjects, allRegistrations, projects, approvedProjects });

return (
  <Modal
    open={showModal}
    title={"Import from Potlock"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <div className="d-flex flex-column gap-4">
      {Search}
      {ProjectsComponent}
    </div>
  </Modal>
);
