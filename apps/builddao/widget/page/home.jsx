const { Hero, Goals, Join, Purposes, AboutUs, Governance } = VM.require(
  "buildhub.near/widget/home.Home"
) || {
  Hero: () => <></>,
  Goals: () => <></>,
  Join: () => <></>,
  Purposes: () => <></>,
  AboutUs: () => <></>,
  Governance: () => <></>,
};

const Root = styled.div`
  background-color: var(--bg-1, #000);
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
    <AboutUs />
    <Governance />
  </Root>
);
