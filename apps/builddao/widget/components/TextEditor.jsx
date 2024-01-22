const { Button } =
  VM.require("buildhub.near/widget/components") || (() => <></>);

const TextArea = styled.textarea`
  display: flex;
  padding: 16px 12px;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;

  border-radius: 8px;
  border: 1px solid var(--Stroke-color, rgba(255, 255, 255, 0.2));
  background: var(--Black-50, #202020);

  color: var(--White-50, #fff);

  /* Body/16px */
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 170%; /* 27.2px */
`;

const HeaderButton = ({ children, ...props }) => {
  return (
    <Button
      className="rounded-2 p-1"
      type="icon"
      variant="outline"
      id={`${JSON.stringify(children)}`}
      style={{ width: 24, height: 24 }}
      {...props}
    >
      {children}
    </Button>
  );
};

function TextEditor({
  value,
  onChange,
  placeholder,
  maxWidth,
  background,
  name,
  minHeight,
}) {
  const appendBold = () => {
    const updatedValue = { target: { value: `${value}** **` } };
    onChange(updatedValue);
  };

  const appendHeader = () => {
    const updatedValue = { target: { value: `${value}#` } };
    onChange(updatedValue);
  };

  const appendItalic = () => {
    const updatedValue = { target: { value: `${value}* *` } };
    onChange(updatedValue);
  };

  const appendUnderline = () => {
    const updatedValue = { target: { value: `${value}++ ++` } };
    onChange(updatedValue);
  };

  const appendStrike = () => {
    const updatedValue = { target: { value: `${value}~~ ~~` } };
    onChange(updatedValue);
  };

  const appendList = () => {
    const updatedValue = { target: { value: `${value}* ` } };
    onChange(updatedValue);
  };

  const appendOrderedList = () => {
    const updatedValue = { target: { value: `${value}1. ` } };
    onChange(updatedValue);
  };

  const appendQuote = () => {
    const updatedValue = { target: { value: `${value}> ` } };
    onChange(updatedValue);
  };

  const appendLineBreak = () => {
    const updatedValue = { target: { value: `${value}--- ` } };
    onChange(updatedValue);
  };

  const appendInlineCode = () => {
    const updatedValue = { target: { value: `${value}\` \` ` } };
    onChange(updatedValue);
  };

  const appendCodeBlock = () => {
    const updatedValue = { target: { value: `${value}\`\`\` \`\`\`` } };
    onChange(updatedValue);
  };

  const appendImage = () => {
    const updatedValue = {
      target: { value: `${value}![alt text](image_url)` },
    };
    onChange(updatedValue);
  };

  const appendURL = () => {
    const updatedValue = { target: { value: `${value}[text](url)` } };
    onChange(updatedValue);
  };

  return (
    <div
      className="d-flex flex-column gap-1 w-100"
      style={{ maxWidth: maxWidth ? maxWidth : "550px" }}
    >
      <div className="d-flex align-items-center gap-2 flex-wrap">
        <HeaderButton onClick={appendHeader}>H</HeaderButton>
        <HeaderButton onClick={appendBold}>
          <i className="bi bi-type-bold"></i>
        </HeaderButton>
        <HeaderButton onClick={appendItalic}>
          <i className="bi bi-type-italic"></i>
        </HeaderButton>
        <HeaderButton onClick={appendUnderline}>
          <i className="bi bi-type-underline"></i>
        </HeaderButton>
        <HeaderButton onClick={appendStrike}>
          <i className="bi bi-type-strikethrough"></i>
        </HeaderButton>
        <HeaderButton onClick={appendList}>
          <i className="bi bi-list-ul"></i>
        </HeaderButton>
        <HeaderButton onClick={appendOrderedList}>
          <i className="bi bi-list-ol"></i>
        </HeaderButton>
        <HeaderButton onClick={appendQuote}>
          <i className="bi bi-quote"></i>
        </HeaderButton>
        <HeaderButton onClick={appendLineBreak}>
          <i className="bi bi-text-wrap"></i>
        </HeaderButton>
        <HeaderButton onClick={appendInlineCode}>
          <i className="bi bi-code"></i>
        </HeaderButton>
        <HeaderButton onClick={appendCodeBlock}>
          <i className="bi bi-code-slash"></i>
        </HeaderButton>
        <HeaderButton onClick={appendImage}>
          <i className="bi bi-image"></i>
        </HeaderButton>
        <HeaderButton onClick={appendURL}>
          <i className="bi bi-link"></i>
        </HeaderButton>
      </div>
      <TextArea
        name={name}
        id={name}
        key={name}
        placeholder={placeholder || "Write something..."}
        value={value}
        onChange={onChange}
        style={{
          background: background || "var(--Black-50, #202020)",
          minHeight: minHeight || "450px",
        }}
      />
    </div>
  );
}

return { TextEditor };
