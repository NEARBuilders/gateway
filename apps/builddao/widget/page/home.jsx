const { Hero, Goals, Join, Purposes } = VM.require(
  "buildhub.near/widget/home.N.Home"
) || {
  Hero: () => <></>,
  Goals: () => <></>,
  Join: () => <></>,
  Purposes: () => <></>,
};

const Root = styled.div`
  background-color: var(--bg-1, #010002);
  color: var(--text-color, #fff);
  font-family: Satoshi, sans-serif;

  width: 100%;
`;

return (
  <Root>
    <Hero />
    <Goals />
    <Join />
    <Purposes />
  </Root>
);
