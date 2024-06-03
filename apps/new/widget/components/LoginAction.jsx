const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const LoginContainer = styled.div`
  background-color: #23242b;
  color: #fff;

  width: 100%;
  height: 16rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  margin-bottom: 1rem;
`;

const text = props.text;

return (
  <LoginContainer>
    {text && <p>{text}</p>}
    <a href={"${alias_gateway_url}/join"} style={{ textDecoration: "none" }}>
      <Button variant="primary">Login</Button>
    </a>
  </LoginContainer>
);
