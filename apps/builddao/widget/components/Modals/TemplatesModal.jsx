const { Avatar, Button, InputField, TextEditor } = VM.require(
  "buildhub.near/widget/components"
);
const { Modal } = VM.require("buildhub.near/widget/components.Modals.Modal");
const { CaretLeftIcon, TrashIcon, PlusIcon, PencilIcon } = VM.require("buildhub.near/widget/Icons")

const toggle = props.toggle || <></>;
const templates = props.templates || []; 
const isOpen = props.isOpen;
const onOpenChange = props.onOpenChange;
const onAdd = props.onAdd;
const onDelete = props.onDelete

const ModalContainer = styled.div`
  width: 880px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  @media (max-width: 767px) {
    width: 320px;
  }
`;

const SaveTemplateWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  gap: 0 10px;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  height: 62px;
  justify-content: space-between;
  align-items: center;
`

const GoBackTemplatesWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0 4px;

  span {
    font-size: 1rem;
    font-family: Aeonik, sans-serif;
    font-weight: 400;
    line-height: 170%;
  }
`

const TemplatesList = styled("ScrollArea.Viewport")`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const TemplateItem = styled.div`
  margin-top: 24px;

  max-height: 85px;
  width: 100%;
  display: flex;
  align-items: start;
  gap: 0 10px;

  padding-bottom: 10px;
  border-bottom: 1px solid #FFFFFF33;
  overflow: hidden;
`

const IconsWrapper = styled.div`
  width: fit-content;
  display: flex;
  align-items: center;
`

const TemplateContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  flex-wrap: wrap;
  text-overflow: ellipsis;

  p {
    font-family: Aeonik, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 170%;
    color: #CDD0D5;
    height: 48px;
    overflow: hidden;
  }

  h4 {
    font-family: Aeonik, sans-serif;
    font-size: 0.875rem;
    font-weight: 500;
    line-height: normal;
    color: white;
  }
`

const ScrollAreaRoot = styled("ScrollArea.Root")`
  height: 550px;
  overflow: hidden;
`

const ScrollBar = styled("ScrollArea.Scrollbar")`
  padding: 2px;
  background: transparent;
`

return (
  <Modal
    open={isOpen}
    key="TemplatesModal"
    onOpen={onOpenChange}
    onClose={onOpenChange}
    toggle={toggle}
  >
    <ModalContainer>
      <HeaderWrapper>
        <GoBackTemplatesWrapper role="button" onClick={onOpenChange}>
          <CaretLeftIcon />
          <span>Templates</span>
        </GoBackTemplatesWrapper>
        <Button onClick={onAdd} variant="outline" style={{ fontSize: 14 }}>
          <PlusIcon />
          Add New
        </Button>
      </HeaderWrapper>
    
      <ScrollAreaRoot type="always">
        <TemplatesList>
          {templates.map(({ title, content }) => {
            return (
              <TemplateItem key={`${title}-${content}`}>
                <TemplateContentWrapper>
                  <h4>{title}</h4>
                  <p>{content}</p>
                </TemplateContentWrapper>
                  <IconsWrapper>
                    <Button variant="outline" type="icon">
                      <PencilIcon />
                    </Button>
                    <Button 
                      style={{ marginLeft: 10 }}
                      onClick={() => {
                        onDelete(title)
                      }} 
                      variant="outline" 
                      type="icon"
                    >
                      <TrashIcon />
                    </Button>
                  </IconsWrapper>
                </TemplateItem>
                )
              })}
        </TemplatesList>
        <ScrollBar orientation="vertical" />
      </ScrollAreaRoot>
    </ModalContainer>
  </Modal>
);