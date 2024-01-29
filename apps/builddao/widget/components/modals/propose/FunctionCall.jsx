const { Button } =
  VM.require("buildhub.near/widget/components") || (() => <></>);

const [contract, setContract] = useState("");
const [method, setMethod] = useState("");
const [args, setArgs] = useState("{}");
const [gas, setGas] = useState(50000000000000);
const [deposit, useDeposit] = useState(0);

const [text, setText] = useState("");
const [editorKey, setEditorKey] = useState(0);
useEffect(() => {
  if (!props.item) {
    return;
  }
  const { path, blockHeight } = props.item;
  setText(`[EMBED](${path}@${blockHeight})`);
  setEditorKey((editorKey) => editorKey + 1);
}, [props.item]);
const memoizedKey = useMemo((editorKey) => editorKey, [editorKey]);
const selectedDao = props.selectedDao;

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

return (
  <div className="d-flex flex-column">
    <div className="form-group mb-3">
      <label htmlFor="contract">
        Contract<span className="text-danger">*</span>
      </label>
      <input
        name="contract"
        id="contract"
        data-bs-theme="dark"
        value={contract}
        onChange={(e) => setContract(e.target.value)}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="method">
        Method<span className="text-danger">*</span>
      </label>
      <input
        name="method"
        id="method"
        data-bs-theme="dark"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="args">Arguments (JSON)</label>
      <textarea
        name="args"
        id="args"
        data-bs-theme="dark"
        value={args}
        onChange={(e) => setArgs(e.target.value)}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="gas">Gas</label>
      <input
        name="gas"
        id="gas"
        type="number"
        data-bs-theme="dark"
        value={gas}
        onChange={(e) => setGas(e.target.value)}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <label htmlFor="deposit">Deposit</label>
      <input
        name="deposit"
        id="deposit"
        type="number"
        data-bs-theme="dark"
        value={deposit}
        onChange={(e) => setDeposit(e.target.value)}
        className="form-control"
      />
    </div>
    <div className="form-group mb-3">
      <label>Proposal Description</label>
      <TextareaWrapper
        className="markdown-editor mb-3"
        data-value={text || ""}
        key={memoizedKey}
      >
        <Widget
          src="mob.near/widget/MarkdownEditorIframe"
          props={{
            initialText: text,
            embedCss: MarkdownEditor,
            onChange: (v) => {
              setText(v);
            }
          }}
        />
      </TextareaWrapper>
    </div>
    <div className="w-100 d-flex">
      <Button
        disabled={!contract || !method}
        className="ms-auto"
        variant="primary"
        onClick={() =>
          Near.call(selectedDAO, "add_proposal", {
            proposal: {
              description: text,
              kind: {
                FunctionCall: {
                  reciever_id: contract,
                  actions: [
                    {
                      method_name: method,
                      args: args,
                      deposit: deposit,
                      gas: gas
                    }
                  ]
                }
              }
            }
          })
        }
      >
        Next
      </Button>
    </div>
  </div>
);