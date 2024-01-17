const { Button } = VM.require("buildhub.near/widget/components");

const Icon = styled.i`
    font-size: 24px;
`;

function XTrigger({ onClose }) {
  return (
    <Button onClick={onClose} variant="outline" type="icon">
      <Icon className="bi bi-x" />
    </Button>
  )
}

return { XTrigger }