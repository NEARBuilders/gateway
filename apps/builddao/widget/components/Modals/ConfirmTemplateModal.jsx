const { Avatar, Button, InputField, TextEditor } = VM.require(
  "buildhub.near/widget/components"
);
const { PlusIcon } = VM.require("buildhub.near/widget/components.Icons.PlusIcon");
const { Modal } = VM.require("buildhub.near/widget/components.Modals.Modal");

const toggle = props.toggle || <></>;
const shouldOpen = props.shouldOpen;
const onSelectTemplate = props.onSelectTemplate;
const chosenTemplate = props.chosenTemplate;
const isOpen = props.isOpen;
const onOpenChange = props.onOpenChange;

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

return (
  <Modal
    open={isOpen}
    key="create"
    onOpen={onOpenChange}
    onClose={onOpenChange}
    toggle={toggle}
  >
    <ModalContainer>
      <p>Await for figma design modal content</p>
      <SaveTemplateWrapper>
      <Dialog.Trigger asChild>
          <Button
            style={{ fontSize: 14 }}
            onClick={onOpenChange}
            variant="outline"
          >
            Cancel
          </Button>
        </Dialog.Trigger>
        <Dialog.Trigger asChild>
          <Button
            style={{ fontSize: 14 }}
            onClick={() => {
              onSelectTemplate(chosenTemplate.title, chosenTemplate.content);
              onOpenChange();
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