const { Avatar, Button, InputField, TextEditor } = VM.require(
  "buildhub.near/widget/components"
);
const { Modal } = VM.require("buildhub.near/widget/components.Modals.Modal");
const { CaretLeftIcon, TrashIcon, PlusIcon, PencilIcon } = VM.require("buildhub.near/widget/Icons")

const toggle = props.toggle || <></>;
const isOpen = props.isOpen;
const onOpenChange = props.onOpenChange;

const templates = props.templates || []; 
const onChooseTemplate = props.onChooseTemplate;
const TemplatesStorageKey = props.templateStorageKey;

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

  &:hover {
    cursor: pointer;
  }
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

const [openDeleteModal, setOpenDeleteModal] = useState(false);
const [openCreateOrEditModal, setOpenCreateOrEditModal] = useState(false);
const [selectedTemplate, setSelectedTemplate] = useState({
  title: "",
  content: ""
});

function onOpenChangeModals(modal) {
  switch (modal) {
    case 'delete':
      setOpenDeleteModal((prev) => !prev)
    break
    case 'create':
      setOpenCreateOrEditModal((prev) => !prev)
    break
    default:
      return
  }
}

function onDeleteClick(template) {
  setSelectedTemplate(template)
  onOpenChangeModals('delete')
}

function onEditClick(template) {
  setSelectedTemplate(template)
  onOpenChangeModals('create')
}

function onAddNewClick() {
  onOpenChangeModals('create')
}


function onDeleteTemplate(title) {
  const allButTheTemplateYouWannaDelete = templates.filter((template) => {
    return template.title !== title
  })
  
  if (allButTheTemplateYouWannaDelete.length === 0) {
    Storage.set(TemplatesStorageKey, []);
  } else {
    Storage.set(TemplatesStorageKey, [...allButTheTemplateYouWannaDelete]);
  }
}

function onCreateTemplate(title, content) {
  if (templates === undefined) {
    Storage.set(TemplatesStorageKey, [
      {
        title,
        content,
      },
    ]);
    return
  } else {
    const alreadyExistsTemplate = templates.filter((template) => {
      return template.title === title;
    })[0];

    if (alreadyExistsTemplate !== undefined) {
      const allButExistent = templates.filter((template) => {
        return template.title !== title;
      });

      Storage.set(TemplatesStorageKey, [
        ...allButExistent,
        {
          title,
          content,
        },
      ]);
    } else {
      Storage.set(TemplatesStorageKey, [
        ...templates,
        {
          title,
          content,
        },
      ]);
    }
  }
}

function onEditTemplate(oldTitle, title, content) {
  const existentTemplates = Storage.get(TemplatesStorageKey);

  const templateIndex = existentTemplates.findIndex((template) => {
    console.log("template.title", template.title)
    return template.title === oldTitle
  });

  existentTemplates[templateIndex].title = title;
  existentTemplates[templateIndex].content = content;

  Storage.set(TemplatesStorageKey, existentTemplates);
}

function onClearSelected() {
  setSelectedTemplate({
    title: "",
    content: "# Hello World"
  })
}

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
        <Button onClick={onAddNewClick} variant="outline" style={{ fontSize: 14 }}>
          <PlusIcon />
          Add New
        </Button>
      </HeaderWrapper>
    
      <ScrollAreaRoot type="always">
        <TemplatesList>
          {templates.map(({ title, content }) => {
            return (
              <TemplateItem 
                key={`${title}-${content}`} 
                role="button"
                onClick={() => {
                  onChooseTemplate(title, content)
                }}
              > 
                <TemplateContentWrapper>
                  <h4>{title}</h4>
                  <p>{content}</p>
                </TemplateContentWrapper>
                <IconsWrapper>
                  <Button
                    id="EditTemplate"
                    onClick={(e) => {
                      e.stopPropagation()
                      onEditClick({ 
                        title,
                        content
                      })
                    }} 
                    variant="outline" type="icon"
                  >
                    <PencilIcon />
                  </Button>
                  <Button 
                    id="DeleteTemplate"
                    style={{ marginLeft: 10 }}
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteClick({
                        title,
                        content
                      })
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
    {openDeleteModal ? (
      <Widget  
       src={"buildhub.near/widget/components.Modals.ConfirmDeletionModal"}
       props={{
        isOpen: openDeleteModal,
        onOpenChange: () => onOpenChangeModals('delete'),
        onDelete: onDeleteTemplate,
        template: selectedTemplate,
        onClearSelected
      }}
     />
    ) : null}
    {openCreateOrEditModal ? (
      <Widget
        src={"buildhub.near/widget/components.Modals.CreatePostTemplateModal"}
        props={{
          isOpen: openCreateOrEditModal,
          onOpenChange: () => onOpenChangeModals('create'),
          onCreateTemplate,
          templateToEdit: selectedTemplate,
          onEditTemplate,
          onClearSelected,
        }}
      />
    ) : null}
  </Modal>
);