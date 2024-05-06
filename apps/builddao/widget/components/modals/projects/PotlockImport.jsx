const { Modal, Button } = VM.require("${config_account}/widget/components") || {
  Modal: () => <></>,
  Button: () => <></>,
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const bootstrapTheme = props.bootstrapTheme || "dark";

return (
  <Modal
    open={showModal}
    title={"Import from Potlock"}
    onOpenChange={toggleModal}
    toggle={toggle}
  >
    <div></div>
  </Modal>
);
