const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};

const { getProjectMeta } = VM.require("${alias_new}/widget/lib.projects") || {
  getProjectMeta: () => {},
};

const { id } = props;

const project = getProjectMeta(id);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  .link {
    display: flex;
    gap: 16px;
    flex-direction: row;
    align-items: center;
  }
`;

return <Container className="text-white"></Container>;
