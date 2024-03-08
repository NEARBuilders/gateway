const { Modal, Button } = VM.require("buildhub.near/widget/components") || {
  Modal: () => <></>,
  Button: () => <></>,
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";
const filters = props.filters;
const setFilters = props.setFilters;
const item = props.item;

const handleDelete = () => {
  Social.set({
    index: {
      modify: JSON.stringify({
        key: item,
        value: {
          type: "delete",
        },
      }),
    },
  });
};

return (
  <Modal
    open={showModal}
    title={"Delete Post"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <div className="mb-3">
      <p className="mb-1">Are you sure you want to delete this post?</p>
      <small>
        <i>
          This post will only be hidden on NEARBuilders Gateway and not on other
          gateways
        </i>
      </small>
    </div>
    <div className="d-flex align-items-center justify-content-end gap-3">
      <Button variant="outline" onClick={toggleModal}>
        Cancel
      </Button>
      <Button
        variant="primary"
        style={{ background: "#ff2b2b" }}
        onClick={handleDelete}
      >
        Delete Post
      </Button>
    </div>
  </Modal>
);
