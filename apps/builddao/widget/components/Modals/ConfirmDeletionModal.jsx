const { Button, Modal, H3 } = VM.require(
  "buildhub.near/widget/components"
);

const isOpen = props.isOpen;
const onOpenChange = props.onOpenChange;
const onDelete = props.onDelete;
const template = props.template;
const onClearSelected = props.onClearSelected;

const ModalContainer = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px 0;
  flex-grow: 1;
  padding: 16px 0;
`;

const ButtonsWrapper = styled.div`
  width: 100%;
  margin-top: 80px;

  display: flex;
  justify-content: flex-end;
  gap: 0 10px;
`;

const StyledP = styled.p`
  font-size: 1rem;
  font-family: Aeonik, sans-serif;
  font-weight: 400;
  line-height: 170%;
  color: #CDD0D5;
`;

return (
  <Modal
    open={isOpen}
    key="create"
    onOpen={onOpenChange}
    onClose={onOpenChange}
    toggle={props.toggle}
  >
    <ModalContainer>
      <H3>Are you sure you will like to delete this template?</H3>

      <StyledP>If you delete this template it will be deleted permanently.</StyledP>

      <ButtonsWrapper>
        <Button 
          onClick={() => {
            onOpenChange()
            onClearSelected()
          }} 
          variant="outline"
        >
          Cancel
        </Button>
        <Button 
          onClick={() => {
            onDelete(template.title)
            onClearSelected()
            onOpenChange()
          }} 
          variant="primary"
        >
          Delete
        </Button>
      </ButtonsWrapper>
    </ModalContainer>
  </Modal>
);