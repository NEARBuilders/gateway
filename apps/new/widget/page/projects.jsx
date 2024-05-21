const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const Projects = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0 64px;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;

  h1 {
    color: #fff;
    font-family: Poppins, sans-serif;
    font-size: 40px;
    line-height: 120%; /* 48px */
    letter-spacing: -1.6px;
    margin: 0;
  }

  p {
    color: #e8e8e8;
    font-family: Poppins;
    font-size: 18px;
    max-width: 490px;
    margin: 0;
  }
`;

return (
  <Projects>
    <Header>
      <div className="d-flex align-items-center w-100 justify-content-between">
        <h1>Projects</h1>
        <div className="d-flex align-items-center gap-2">
          <Button variant="primary">Create</Button>
          <Button>Open Roles</Button>
        </div>
      </div>
      <p>
        Easily create, share, and track all projects within our vibrant builder
        community.
      </p>
    </Header>
  </Projects>
);
