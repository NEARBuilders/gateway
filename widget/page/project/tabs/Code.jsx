const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};

const { getProjectMeta } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  getProjectMeta: () => {},
};

const { id } = props;

const project = getProjectMeta(id);

const { gitHub } = project;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
`;

return (
  <Container className="text-white">
    <Button variant="secondary" href={gitHub} target="_blank" noLink={true}>
      GitHub Repo
    </Button>
  </Container>
);
