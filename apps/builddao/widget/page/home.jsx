const { Hero, Goals, Join, Purposes, AboutUs } = VM.require(
  "buildhub.near/widget/home.Home"
) || {
  Hero: () => <></>,
  Goals: () => <></>,
  Join: () => <></>,
  Purposes: () => <></>,
  AboutUs: () => <></>,
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
    <AboutUs />
  </Root>
);
