const { Modal, Button } = VM.require("${config_account}/widget/components") || {
  Modal: () => <></>,
  Button: () => <></>,
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";
const onClickCreate = props.onClickCreate || (() => {});
const onClickImport = props.onClickImport || (() => {});

const Item = ({ title, description, src, onClick }) => {
  return (
    <div className="d-flex gap-2 pointer-cursor" onClick={onClick}>
      <img src={src} height={40} width={40} />
      <div className="d-flex flex-column">
        <h6>{title}</h6>
        <div className="text-sm">{description}</div>
      </div>
    </div>
  );
};

const Container = styled.div`
  .pointer-cursor {
    cursor: pointer;
  }
  .text-sm {
    font-size: 13px;
  }
`;
return (
  <Modal
    open={showModal}
    title={"Create Project"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <Container className="d-flex flex-column gap-4 my-2">
      <Item
        title="Create my own project"
        description="Create your own completely new project, customize it your way!"
        src="https://ipfs.near.social/ipfs/bafkreidbfu7uxtr4is7wxileg3mrbajve6cgkfmrqemc6pxsr6nnczz7ly"
        onClick={onClickCreate}
      />
      <Item
        title="Import from Potlock"
        description="Import your projects from the Potlock platform."
        src="https://ipfs.near.social/ipfs/bafkreifk42ibqsg5sfky5tlhkfty6rkup5leqite5koenhesnuwq55kufi"
        onClick={onClickImport}
      />
      <div className="my-1 d-flex justify-content-center">
        <Button variant="primary" onClick={toggleModal}>
          Cancel
        </Button>
      </div>
    </Container>
  </Modal>
);
