const { TextEditor } = VM.require("buildhub.near/widget/components");

const [value, setValue] = useState("");

const onValueChange = useCallback((e) => {
  setValue(e.target.value);
}, []);

return (
  <div>
    <pre className="text-white">{value}</pre>
    <TextEditor name="test" value={value} onChange={onValueChange} />
  </div>
);
