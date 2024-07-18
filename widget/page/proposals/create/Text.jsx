const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};
const { ProposalVisibilityInfoModal } = VM.require(
  "${config_account}/widget/page.proposals.VisibilityInfoModal",
) || {
  ProposalVisibilityInfoModal: () => <></>,
};
const DaoSDK = VM.require("sdks.near/widget/SDKs.Sputnik.DaoSDK") || (() => {});
if (!DaoSDK) {
  return <></>;
}

const [text, setText] = useState("");
const [editorKey, setEditorKey] = useState(0);
const [isInfoModalActive, setInfoModalActive] = useState(false);

useEffect(() => {
  if (!props.item) {
    return;
  }
  const { path, blockHeight } = props.item;
  setText(`[EMBED](${path}@${blockHeight})`);
  setEditorKey((editorKey) => editorKey + 1);
}, [props.item]);

const memoizedKey = useMemo((editorKey) => editorKey, [editorKey]);
const selectedDAO = props.selectedDAO;
const [notificationsData, setNotificationData] = useState(null);
const sdk = DaoSDK(selectedDAO);
if (!sdk) {
  return <></>;
}

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

const TextareaWrapper = styled.div`
  display: grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  align-items: stretch;
  width: 100%;

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

const sdkCall = () => {
  sdk.createPollProposal({
    description: text,
    gas: 180000000000000,
    deposit: 200000000000000,
    additionalCalls: notificationsData,
  });
};

const NotificationSelector = useMemo(() => {
  return (
    <Widget
      loading=""
      src="${config_account}/widget/page.proposals.NotificationRolesSelector"
      props={{
        daoId: selectedDAO,
        onUpdate: (v) => {
          setNotificationData(v);
        },
        proposalType: "Text",
      }}
    />
  );
}, [selectedDAO]);

return (
  <div className="d-flex flex-column ">
    <label>Proposal Description</label>
    <TextareaWrapper
      className="markdown-editor mb-3"
      data-value={text || ""}
      key={memoizedKey}
    >
      <Widget
        loading=""
        src="${alias_mob}/widget/MarkdownEditorIframe"
        props={{
          initialText: text,
          embedCss: props.customCSS || MarkdownEditor,
          onChange: (v) => {
            setText(v);
          },
        }}
      />
    </TextareaWrapper>
    {NotificationSelector}
    <div className="w-100 d-flex">
      <Button
        className="ms-auto"
        variant="primary"
        onClick={() => {
          setInfoModalActive(true);
        }}
      >
        Create
      </Button>
    </div>
    <ProposalVisibilityInfoModal
      open={isInfoModalActive}
      setInfoModalActive={setInfoModalActive}
      sdkCall={sdkCall}
    />
  </div>
);
