const { Avatar, Button, InputField, TextEditor, Modal } = VM.require(
  "buildhub.near/widget/components"
);
const { PlusIcon } = VM.require("buildhub.near/widget/components.Icons.PlusIcon");

const H3 = styled.h3`
  font-family: "Aekonik", sans-serif;
  font-weight: 500;
  font-size: 1.5rem;
  line-height: 140%;
`;

const FiltersSection = styled.div`
  width: 100%;
`;

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
`;

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;

  textarea {
    display: flex;
    align-items: center;
    transition: all 0.3s ease;
  }

  textarea::placeholder {
    padding-top: 4px;
    font-size: 20px;
  }

  textarea:focus::placeholder {
    font-size: inherit;
    padding-top: 0px;
  }

  &::after,
  textarea,
  iframe {
    width: 100%;
    min-width: 1em;
    height: unset;
    min-height: 3em;
    font: inherit;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: 0px solid #eee;
    grid-area: 1 / 1;
    overflow: hidden;
    outline: none;
  }

  iframe {
    padding: 0;
  }

  textarea:focus,
  textarea:not(:empty) {
    border-bottom: 1px solid #eee;
    min-height: 5em;
  }

  &::after {
    content: attr(data-value) " ";
    visibility: hidden;
    white-space: pre-wrap;
  }
  &.markdown-editor::after {
    padding-top: 66px;
    font-family: monospace;
    font-size: 14px;
  }
`;

const MarkdownEditor = `
  html {
    background: #23242b;
  }

  * {
    border: none !important;
  }

  .rc-md-editor {
    background: #4f5055;
    border-top: 1px solid #4f5055 !important;
    border-radius: 8px;
  }

  .editor-container {
    background: #4f5055;
  }
  
  .drop-wrap {
    top: -110px !important;
    border-radius: 0.5rem !important;
  }

  .header-list {
    display: flex;
    align-items: center;
  }

  textarea {
    background: #23242b !important;
    color: #fff !important;

    font-family: sans-serif !important;
    font-size: 1rem;

    border: 1px solid #4f5055 !important;
    border-top: 0 !important;
    border-radius: 0 0 8px 8px;
  }

  .rc-md-navigation {
    background: #23242b !important;
    border: 1px solid #4f5055 !important;
    border-top: 0 !important;
    border-bottom: 0 !important;
    border-radius: 8px 8px 0 0;
  
    i {
      color: #cdd0d5;
    }
  }

  .editor-container {
    border-radius: 0 0 8px 8px;
  }

  .rc-md-editor .editor-container .sec-md .input {
    overflow-y: auto;
    padding: 8px !important;
    line-height: normal;
    border-radius: 0 0 8px 8px;
  }
`;

const MarkdownPreview = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 16px !important;
  }
  @media (max-width: 767px) {
    font-size: 15px !important;
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-size: 15px !important;
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong,
  b {
    font-weight: 500 !important;
  }
  ol,
  ul,
  dl {
    margin-bottom: 0.5rem;
    white-space: inherit;
  }
  p {
    margin-bottom: 0.5rem;
  }
  hr {
    display: none;
  }
  img {
    border-radius: var(--bs-border-radius-lg);
    max-height: 40em;
  }
  th {
    min-width: 5em;
  }

  .table > :not(caption) > * > * {
    padding: 0.3rem;
  }

  * {
    color: #b6b6b8 !important;
  }

  a {
    color: #0d6efd !important;

    &:hover {
      color: #0a58ca !important;
    }
  }
`;

State.init({
  templateTitle: "",
  templateContent: "# Hello World",
});

function onSaveTemplate(title, content) {
  const existentTemplates = Storage.get("postTemplates");

  if (existentTemplates === null) {
    Storage.set("postTemplates", [
      {
        title,
        content,
      },
    ]);
  } else {
    Storage.set("postTemplates", [
      ...existentTemplates,
      {
        title,
        content,
      },
    ]);
  }
}

function CreatePostTemplateModal() {
  return (
    <Modal
      key="create"
      toggle={
        <Button variant="outline">
          <PlusIcon />
          Add New
        </Button>
      }
    >
      <ModalContainer>
        <H3>Add new markdown template</H3>

        <InputField
          key="templateTitleInput"
          label="Title"
          placeholder="Name your template"
          value={state.templateTitle}
          onChange={(e) => {
            State.update({
              templateTitle: e.target.value,
            });
          }}
        />

        <TextareaWrapper
          className="markdown-editor"
          data-value={"templateContent"}
          key={"templateContent"}
        >
          <Widget
            src="mob.near/widget/MarkdownEditorIframe"
            props={{
              initialText: templateContent,
              embedCss: MarkdownEditor,
              onChange: (v) => {
                State.update({
                  templateContent: v,
                });
              },
            }}
          />
        </TextareaWrapper>

        <SaveTemplateWrapper>
          <Button
            disabled={isValidTemplateToCreate}
            onClick={() => {
              onSaveTemplate(templateTitle, templateContent)
            }}
            variant="primary"
          >
            Save Template
          </Button>
        </SaveTemplateWrapper>
      </ModalContainer>
    </Modal>
  );
}

return { CreatePostTemplateModal };
