const { Modal, Button, InputField, TextEditor } = VM.require(
  "buildhub.near/widget/components"
) || {
  Modal: () => <></>,
  Button: () => <></>,
  InputField: () => <></>,
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";
const filters = props.filters;
const setFilters = props.setFilters;
const tagFilters = props.tagFilters;

const [teamSize, setTeamSize] = useState(props.filters.teamSize ?? "");
const [tags, setTags] = useState(props.filters.tags ?? []);
const [value, setValue] = useState("");
const [password, setPassword] = useState("");

const handleTags = (tags) => {
  let filtered = tags.map((tag) => (tag.customOption ? tag.label : tag));
  setTags(filtered);
};

return (
  <Modal
    open={showModal}
    title={"Create Project"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <div className="d-flex flex-column gap-3 mb-3">
      <InputField
        key={"Project-Title"}
        label={"Project Title"}
        placeholder={"Enter Project Title"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
    </div>
    <div className="d-flex flex-column gap-3 mb-3">
      <TextEditor value={value} onChange={(e) => setValue(e.target.value)} />
    </div>
    <div className="form-group">
      <label className="mb-3">Tags</label>
      <Typeahead
        multiple
        options={
          props.tagFilters ?? ["Community", "Open Source", "Weekly", "DAO"]
        }
        allowNew
        placeholder="Start Typing"
        selected={tags}
        onChange={(e) => handleTags(e)}
      />
    </div>
    <div className="d-flex align-items-center justify-content-end gap-2">
      <Button variant="primary" onClick={() => null}>
        Create
      </Button>
    </div>
  </Modal>
);
