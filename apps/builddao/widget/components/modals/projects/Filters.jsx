const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const [teamSize, setTeamSize] = useState("");
const [tags, setTags] = useState([]);

const handleTags = (tags) => {
  let filtered = tags.map((tag) => (tag.customOption ? tag.label : tag));
  setTags(filtered);
};

return (
  <div className="d-flex flex-column gap-3">
    <div className="d-flex flex-column gap-3">
      <label>Popular Tags</label>
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <Button variant="outline">Community</Button>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Filter</Button>
        <Button variant="outline">Filter</Button>
      </div>
    </div>
    <div className="d-flex flex-column gap-3" key={"team-sizes"}>
      <label>Team Size</label>
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <Button
          key={"1-10"}
          variant="outline"
          onClick={() => setTeamSize("1-10")}
        >
          1-10
        </Button>
        <Button
          key={"10-50"}
          variant="outline"
          onClick={() => setTeamSize("10-50")}
        >
          10-50
        </Button>
        <Button
          key={"50-100"}
          variant="outline"
          onClick={() => setTeamSize("50-100")}
        >
          50-100
        </Button>
        <Button
          key={"100+"}
          variant="outline"
          onClick={() => setTeamSize("100+")}
        >
          100+
        </Button>
      </div>
    </div>
    <div className="form-group">
      <label className="mb-3">Tag</label>
      <Typeahead
        multiple
        options={[]}
        allowNew
        selected={tags}
        onChange={(e) => handleTags(e)}
      />
    </div>
    <div className="d-flex align-items-center justify-content-end gap-2">
      <Button variant="outline">Clear Filters</Button>
      <Button variant="primary">Filter</Button>
    </div>
  </div>
);
