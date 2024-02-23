const { Hero } = VM.require("buildhub.near/widget/home.N.Hero") || {
  Hero: () => <></>,
};

const Root = styled.div`
  background-color: var(--bg-1, #0b0c14);
  color: var(--text-color, #fff);
  font-family: Satoshi, sans-serif;

  width: 100%;
`;

return (
  <Root>
    <Hero />
  </Root>
);
