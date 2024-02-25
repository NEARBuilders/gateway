const { Hero } = VM.require("buildhub.near/widget/home.N.Hero") || {
  Hero: () => <></>,
};

const Root = styled.div`
  background-color: var(--bg-1, #010002);
  color: var(--text-color, #fff);
  font-family: Satoshi, sans-serif;

  width: 100%;
`;

return (
  <Root className="container-xl mt-md-3">
    <Hero />
  </Root>
);
