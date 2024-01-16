const { Avatar, Button, InputField, TextEditor } = VM.require(
  "buildhub.near/widget/components"
);
const { PlusIcon } = VM.require("buildhub.near/widget/components.Icons.PlusIcon");
const { Modal } = VM.require("buildhub.near/widget/components.Modals.Modal");

const toggle = props.toggle || <Button variant="outline">Toggle</Button>
const shouldOpen = props.shouldOpen;
const onSelectTemplate = props.onSelectTemplate;
const chosenTemplate = props.chosenTemplate;

const ModalContainer = styled.div`
  width: 552px;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  flex-grow: 1;
`;

const SaveTemplateWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 0 8px;
`;


State.init({
  isOpen: false,
});

function onOpen() {
  State.update({
    isOpen: true,
  });
}

function onClose() {
  State.update({
    isOpen: false,
  });
}

return (
  <Modal
    open={state.isOpen}
    key="create"
    onOpen={() => {
      if (shouldOpen) onOpen()
    }}
    onClose={onClose}
    toggle={toggle}
  >
    <ModalContainer>
      
      <p>Await for figma design modal content</p>

      <SaveTemplateWrapper>
      <Dialog.Trigger asChild>
          <Button
            style={{ fontSize: 14 }}
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>
        </Dialog.Trigger>
        <Dialog.Trigger asChild>
          <Button
            style={{ fontSize: 14 }}
            onClick={() => {
              console.log("chosenTemplate", chosenTemplate);
              onSelectTemplate(chosenTemplate.title, chosenTemplate.content);
              onClose();
            }}
            variant="primary"
          >
            Select Template
          </Button>
        </Dialog.Trigger>
      </SaveTemplateWrapper>
    </ModalContainer>
  </Modal>
);