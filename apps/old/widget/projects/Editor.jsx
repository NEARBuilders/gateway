const accountId = context.accountId;
const { Button, InputField, TextEditor, Modal } = VM.require(
  "${config_account}/widget/components",
) || {
  Button: () => <></>,
  InputField: () => <></>,
  TextEditor: () => <></>,
  Modal: () => <></>,
};
const { normalize } = VM.require("${alias_devs}/widget/lib.stringUtils") || {
  normalize: () => {},
};

const { getProjectMeta } = VM.require(
  "${config_account}/widget/lib.project-data",
) || {
  getProjectMeta: () => {},
};

const isNearAddress = (address) => {
  if (typeof address !== "string") {
    return false;
  }

  // Check for unnamed wallet address format
  if (address.length === 64 && /^[0-9A-F]+$/i.test(address)) {
    return true;
  }

  // Existing logic for account name validation (assuming .near or .testnet suffix)
  if (!address.endsWith(".near") && !address.endsWith(".testnet")) {
    return false;
  }

  const parts = address.split(".");

  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }

  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }

  return true;
};

const tabs = [
  { id: "overview", label: "Overview", disabled: true, checked: true },
  { id: "activity", label: "Activity", checked: true },
  { id: "tasks", label: "Tasks", checked: true },
  // Uncomment after the support is added
  // { id: "discussion", label: "Discussion", checked: false },
  // { id: "code", label: "Code", checked: false },
  // { id: "roadmap", label: "Roadmap", checked: false },
];

const app = props.app ?? "${config_account}";
const poltlockProjectId = props.poltlockProjectId;
const potlockProjectProfile = null;
const potlockProjectTags = null;
const editProjectId = props.id ?? null;
const isEditScreen = !!editProjectId;
let editProjectData = null;
if (editProjectId) {
  editProjectData = getProjectMeta(editProjectId);
}

if (poltlockProjectId) {
  potlockProjectProfile = Social.getr(`${poltlockProjectId}/profile`);
}

const [tags, setTags] = useState(props.filters.tags ?? []);
const [projectAccount, setProjectAccount] = useState(accountId);
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");
const [location, setLocation] = useState("");
const [contributorsWithRoles, setContributorsWithRoles] = useState([]);
const [twitter, setTwitter] = useState("");
const [gitHub, setGitHub] = useState("");
const [telegram, setTelegram] = useState("");
const [website, setWebsite] = useState("");
const [selectedTabs, setSelectedTabs] = useState(
  new Set(tabs.filter((tab) => tab.checked).map((tab) => tab.id.toLowerCase())),
);
const [avatar, setAvatar] = useState("");
const [coverImage, setCoverImage] = useState("");
const [teamSize, setTeamSize] = useState(teamSize ?? "");
const [invalidContributorFound, setInvalidContributorFound] = useState(false);
const [invalidProjectAccount, setInvalidProjectAccount] = useState(false);
const [showSuccessModal, setShowSuccessModal] = useState(false);
const [roles, setRoles] = useState([]);
const [currentScreen, setCurrentScreen] = useState(1);
const [oldTitle, setOldTitle] = useState(null); // for edit changes

function removeWhiteSpace(str) {
  return str.replace(/\s/g, "");
}

useEffect(() => {
  if (potlockProjectProfile && !title) {
    const {
      name,
      description,
      image,
      backgroundImage,
      linktree,
      plTeam,
      plCategories,
      tags,
    } = potlockProjectProfile;
    const { twitter, github, telegram, website } = linktree;
    setTitle(name);
    setDescription(description);
    setContributorsWithRoles(
      JSON.parse(plTeam ?? "[]").map((i) => {
        return { role: "", accountId: i };
      }),
    );
    setTwitter(linktree.twitter ? `https://twitter.com/${twitter}` : null);
    setGitHub(linktree.github ? `https://github.com/${github}` : null);
    setTelegram(linktree.telegram ? `https://t.me/${telegram}` : null);
    setWebsite(
      website
        ? website.includes("https://")
          ? website
          : `https://${website}`
        : null,
    );
    setAvatar(image);
    setCoverImage(backgroundImage);
    setProjectAccount(poltlockProjectId);
    setTags(
      (plCategories
        ? JSON.parse(plCategories ?? "[]")
        : Object.keys(tags ?? {})
      ).map((i) => removeWhiteSpace(i)),
    );
  }
}, [potlockProjectProfile]);

useEffect(() => {
  if (editProjectData && !title) {
    const {
      title,
      description,
      image,
      backgroundImage,
      linktree,
      contributorsWithRoles,
      projectAccountId,
      tags,
      tabs,
    } = editProjectData;
    const { twitter, github, telegram, website } = linktree;
    setTitle(title);
    setOldTitle(title);
    setDescription(description);
    setContributorsWithRoles(JSON.parse(contributorsWithRoles ?? "[]"));
    setTwitter(twitter);
    setGitHub(github);
    setTelegram(telegram);
    setWebsite(website);
    setAvatar(image);
    setCoverImage(backgroundImage);
    setProjectAccount(projectAccountId);
    setTags(tags);
    setSelectedTabs(new Set(tabs));
  }
}, [editProjectData]);

const handleCheckboxChange = (event) => {
  const { id } = event.target;
  const newSelectedTabs = new Set(selectedTabs); // Create a copy to avoid mutation
  if (event.target.checked) {
    newSelectedTabs.add(id.toLowerCase());
  } else {
    newSelectedTabs.delete(id.toLowerCase());
  }
  setSelectedTabs(newSelectedTabs);
};

const handleTags = (tags) => {
  let filtered = tags.map((tag) =>
    removeWhiteSpace(tag.customOption ? tag.label : tag),
  );
  setTags(filtered);
};

const handleRoles = (roles) => {
  let filtered = roles.map((role) =>
    removeWhiteSpace(role.customOption ? role.label : role),
  );
  setRoles(filtered);
};

const handleContributorChange = ({ index, role, accountId }) => {
  const updatedData = [...contributorsWithRoles];
  updatedData[index].role = role;
  updatedData[index].accountId = accountId;
  setContributorsWithRoles(updatedData);
};

const handleAddContributor = () => {
  setContributorsWithRoles([
    ...contributorsWithRoles,
    { accountId: "", role: "" },
  ]);
};

const handleDeleteContributor = ({ index }) => {
  const updatedData = [...contributorsWithRoles];
  updatedData.splice(index, 1);
  setContributorsWithRoles(updatedData);
};

function isValidUrl(url) {
  const regex = /^(?:(http|https):\/\/)?([^\s]+\.[^\s]+)?(?:\/[\w\-\.]+)*\/?$/;
  return regex.test(url);
}

const websiteUrlHandler = (e) => {
  const url = e.target.value;
  setWebsite(url);
};

const projectAccountIdHandler = (e) => {
  const accountId = e.target.value;
  const isValid = isNearAddress(accountId);
  !isValid ? setInvalidProjectAccount(true) : setInvalidProjectAccount(false);
  setProjectAccount(accountId);
};

const Container = styled.div`
  color: white;
  .form-control {
    background: transparent;
  }

  .form-group {
    width: 100%;
    & > div > div.p-2 {
      background: transparent !important;
      border: 1px solid var(--border-color, #ccc);
      border-width: 0px 1px 1px;
      border-top-style: initial;
      border-right-style: solid;
      border-bottom-style: solid;
      border-left-style: solid;
      border-top-color: initial;
      border-right-color: rgb(222, 226, 230);
      border-bottom-color: rgb(222, 226, 230);
      border-left-color: rgb(222, 226, 230);
      border-image: initial;
      border-bottom-left-radius: 0.375rem;
      border-bottom-right-radius: 0.375rem;
      min-height: 9em;
      * {
        color: var(--text-color, #fff);
      }
    }
  }

  .form-select {
    background-color: #000 !important;
    height: 100%;
    color: var(--text-color, #fff);
  }

  .form-check {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 0px;
  }
  .form-check-input {
    background-color: transparent;
    border: 1px solid var(--border-color, #ccc);
    &:checked {
      background-color: var(--primary-color, #38c793);
      border-color: var(--primary-color, #38c793);
      &:focus {
        box-shadow: none;
      }
    }
    &:focus {
      box-shadow: none;
    }
    &:not(:checked):not(:focus) {
      background-image: url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%27-4 -4 8 8%27%3e%3ccircle r=%273%27 fill=%27%23fff%27/%3e%3c/svg%3e");
    }
  }

  .err,
  .err-p_id {
    color: #ff8888;
    font-size: 12px;
    padding: 0;
    margin: 0;
  }
  .err-p_id {
    margin-top: -20px;
  }

  .col-sm-6 div {
    width: 100% !important;
  }

  .flex-1 div {
    width: 100% !important;
  }

  .flex-1 {
    flex: 1;
  }
  .text-green {
    color: #38c793;
  }

  .text-red {
    color: #ff8888;
  }

  .cursor-pointer {
    cursor: pointer;
  }
`;

function onSuccessModalToggle(v) {
  setShowSuccessModal(v);
}

const ModalContainer = styled.div`
  .pb-4 {
    padding-bottom: 0px !important;
    margin-bottom:-20px !important;
  }
`;
const SuccessModal = () => {
  return (
    <ModalContainer>
      <Modal
        open={showSuccessModal}
        onOpenChange={onSuccessModalToggle}
        toggle={onSuccessModalToggle}
      >
        <div className="d-flex flex-column gap-2 align-items-center">
          <img
            src="https://ipfs.near.social/ipfs/bafkreidhpcgdofhhvyybz3d4xmoheovksulnatfsdyfljpphwvm74kl43e"
            width={50}
          />
          <div className="h5">Created successful!</div>
          <div>
            Your project has been created successfully and is now ready to be
            built and shared.
          </div>
          <div className="text-center mt-2">
            <Button
              variant="primary"
              href="/${config_account}/widget/app?page=projects"
            >
              View Project Page
            </Button>
          </div>
        </div>
      </Modal>
    </ModalContainer>
  );
};

function onCreateProject() {
  const projectID = normalize(isEditScreen ? oldTitle : title, "-");
  const project = {
    name: title,
    description: description,
    image: avatar,
    backgroundImage: coverImage,
    tags: tags && tags.reduce((obj, item) => ({ ...obj, [item]: "" }), {}),
    linktree: {
      twitter: twitter,
      github: gitHub,
      telegram: telegram,
      website: website,
    },
    contributorsWithRoles,
    tabs: Array.from(selectedTabs),
    projectAccountId: projectAccount,
    teamSize,
    roles: roles && roles.reduce((obj, item) => ({ ...obj, [item]: "" }), {}),
  };

  const data = {
    project: {
      [projectID]: {
        "": JSON.stringify(project),
        metadata: {
          name: title,
          description: description,
          image: avatar,
          backgroundImage: coverImage,
          tags:
            tags && tags.reduce((obj, item) => ({ ...obj, [item]: "" }), {}),
          linktree: {
            twitter: twitter,
            github: gitHub,
            telegram: telegram,
            website: website,
          },
        },
      },
    },
    [app]: {
      project: {
        [`${context.accountId}_project_${projectID}`]: "",
      },
    },
  };
  if (projectAccount.includes(".sputnik-dao.near")) {
    const policy = Near.view(projectAccount, "get_policy");
    const base64 = Buffer.from(
      JSON.stringify({
        data: {
          [projectAccount]: data,
        },
        options: { refund_unused_deposit: true },
      }),
      "utf-8",
    ).toString("base64");
    Near.call({
      contractName: projectAccount,
      methodName: "add_proposal",
      args: {
        proposal: {
          description: `Project creation using BuildDAO created by ${context.accountId}`,
          kind: {
            FunctionCall: {
              receiver_id: "${alias_socialdb}",
              actions: [
                {
                  method_name: "set",
                  args: base64,
                  deposit: "100000000000000000000000",
                  gas: "200000000000000",
                },
              ],
            },
          },
        },
      },
      deposit: policy?.proposal_bond || 100000000000000000000000,
      gas: 200000000000000,
    });
  } else {
    Social.set(data, {
      onCommit: () => {
        setShowSuccessModal(true);
      },
    });
  }
}

const SecondScreen = () => {
  return (
    <>
      <div className="d-flex flex-column gap-4">
        <div className="form-group mb-3">
          <label className="pb-2">Create Roles</label>
          <Typeahead
            multiple
            options={
              props.tagFilters ?? [
                "Admin",
                "Owner",
                "Contributor",
                "Council",
                "Community",
              ]
            }
            allowNew
            placeholder="Start Typing"
            selected={roles}
            onChange={(e) => handleRoles(e)}
          />
        </div>
        <div className="form-group mb-3">
          <label className="pb-2 d-flex justify-content-between align-items-center">
            Add team members and assign them roles{" "}
            <div className="cursor-pointer" onClick={handleAddContributor}>
              <i class="bi bi-plus-square h4 text-green"></i>
            </div>
          </label>
          <div className="d-flex flex-column gap-2">
            {(contributorsWithRoles ?? []).map((item, index) => {
              return (
                <div className="d-flex justify-content-between gap-3 align-items-center">
                  <div className="flex-1">
                    <InputField
                      placeholder={"Enter Account Address"}
                      value={item.accountId}
                      error={item.accountId && !isNearAddress(item.accountId)}
                      onChange={(e) =>
                        handleContributorChange({
                          accountId: e.target.value,
                          index,
                          role: item.role,
                        })
                      }
                      maxWidth="none"
                    />
                  </div>
                  <select
                    value={item.role}
                    onChange={(e) =>
                      handleContributorChange({
                        role: e.target.value,
                        index,
                        accountId: item.accountId,
                      })
                    }
                    className="form-select flex-1"
                  >
                    <option selected value="">
                      Select Role
                    </option>
                    {roles.map((role) => (
                      <option value={role}>{role}</option>
                    ))}
                  </select>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDeleteContributor({ index })}
                  >
                    <i class="bi bi-trash3-fill h5 text-red"></i>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="form-group mb-3">
          <label className="pb-2">Avatar</label>
          <Widget
            src="${config_account}/widget/components.ImageUploader"
            props={{
              image: avatar,
              onChange: (image) => setAvatar({ image }),
            }}
          />
        </div>
        <div className="form-group mb-3">
          <label className="pb-2">Cover Image</label>
          <Widget
            src="${config_account}/widget/components.ImageUploader"
            props={{
              image: coverImage,
              onChange: (image) => setCoverImage({ image }),
            }}
          />
        </div>
        <div className="form-group">
          <label className="mb-3">Tabs</label>
          <div className="d-flex flex-column gap-1">
            {tabs.map((tab) => (
              <div className="form-check form-switch" key={tab.id}>
                <label className="form-check-label" htmlFor={tab.id}>
                  {tab.label}
                </label>
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id={tab.id}
                  checked={selectedTabs.has(tab.id.toLowerCase())}
                  onChange={handleCheckboxChange}
                  disabled={tab.disabled}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="mb-1">Tags</label>
          <Typeahead
            multiple
            options={
              props.tagFilters ?? [
                "Community",
                "Open Source",
                "Social Impact",
                "DAO",
                "Climate",
                "Public Good",
                "Education",
                "Community",
              ]
            }
            allowNew
            placeholder="Start Typing"
            selected={tags}
            onChange={(e) => handleTags(e)}
          />
        </div>
        <div className="d-flex align-items-center justify-content-end gap-2 mt-3">
          <Button variant="outline" onClick={() => setCurrentScreen(1)}>
            Back
          </Button>

          <Button variant="primary" onClick={onCreateProject}>
            {isEditScreen ? "Save Changes" : "Create"}
          </Button>
        </div>
      </div>
    </>
  );
};

const FirstScreen = () => {
  return (
    <>
      <div className="d-flex flex-column gap-4">
        <InputField
          key={"Project-AccountId"}
          label={"Project Account Address"}
          placeholder={"Enter Project Account Address"}
          value={projectAccount}
          error={invalidProjectAccount}
          onChange={projectAccountIdHandler}
          maxWidth="none"
        />
        {invalidProjectAccount && (
          <p className="err-p_id text-center">
            Invalid Near Address, please enter a valid near address
          </p>
        )}
        <InputField
          key={"Project-Title"}
          label={"Project Title"}
          placeholder={"Enter Project Title"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxWidth="none"
        />
        <div className="form-group">
          <label className="mb-1">Description</label>
          <TextEditor
            value={description}
            onChange={(e) => setDescription(e)}
            maxWidth="none"
          />
        </div>
        <div className="d-flex gap-3 w-100 form-group">
          <div className="flex-1">
            <InputField
              key={"Location"}
              label={"Location"}
              placeholder={"Enter location"}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              maxWidth="none"
            />
          </div>
          <div
            className="flex-1 d-flex flex-column gap-2 h-100"
            key={"team-sizes"}
          >
            <label>Team Size</label>
            <select
              value={teamSize}
              onChange={(e) => setTeamSize(e.target.value)}
              className="form-select"
            >
              <option selected disabled value="">
                Select Team Size
              </option>
              <option value="1-10">1-10</option>
              <option value="10-50">10-50</option>
              <option value="50-100">50-100</option>
              <option value="100+">100+</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-6 mt-2">
            <InputField
              key={"twitter"}
              label={"Twitter"}
              error={twitter && !isValidUrl(twitter)}
              placeholder={"https://twitter.com/handle"}
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              maxWidth="none"
            />
          </div>
          <div class="col-sm-6 mt-2">
            <InputField
              key={"github"}
              label={"GitHub"}
              error={gitHub && !isValidUrl(gitHub)}
              placeholder={"https://github.com/handle"}
              value={gitHub}
              onChange={(e) => setGitHub(e.target.value)}
              maxWidth="none"
            />
          </div>
          <div class="col-sm-6 mt-2">
            <InputField
              key={"telegram"}
              label={"Telegram"}
              error={telegram && !isValidUrl(telegram)}
              placeholder={"https://t.me/handle"}
              value={telegram}
              onChange={(e) => setTelegram(e.target.value)}
              maxWidth="none"
            />
          </div>
          <div class="col-sm-6 mt-2">
            <InputField
              key={"website"}
              label={"Website"}
              error={website && !isValidUrl(website)}
              placeholder={"https://www.nearbuilders.org/"}
              value={website}
              onChange={websiteUrlHandler}
              maxWidth="none"
            />
          </div>
        </div>

        <div className="d-flex align-items-center justify-content-end gap-2 mt-3">
          <Button variant="outline" onClick={() => {}}>
            Cancel
          </Button>

          <Button
            variant="primary"
            disabled={
              invalidContributorFound ||
              invalidProjectAccount ||
              !title ||
              !description ||
              !projectAccount
            }
            onClick={() => setCurrentScreen(2)}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
};

return (
  <Container>
    <div className="p-4">
      <div className="h4">Create Project</div>
      <p>
        Easily create, share, and track all projects within our vibrant builder
        community.
      </p>
      <SuccessModal />
      {currentScreen === 1 ? <FirstScreen /> : <SecondScreen />}
    </div>
  </Container>
);
