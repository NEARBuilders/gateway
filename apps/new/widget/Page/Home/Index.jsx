const { Hero } = VM.require("${config_account}/widget/Page.Home.Hero") || {
  Hero: () => <></>,
};

const { Build } = VM.require("${config_account}/widget/Page.Home.Build") || {
  Build: () => <></>,
};

const { Cards } = VM.require("${config_account}/widget/Page.Home.Cards") || {
  Cards: () => <></>,
};

const { BuildSomething } = VM.require(
  "${config_account}/widget/Page.Home.BuildSomething",
) || {
  BuildSomething: () => <></>,
};

const { CTA } = VM.require("${config_account}/widget/Page.Home.CTA") || {
  CTA: () => <></>,
};

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  min-height: 100vh;
  overflow-x: clip;
`;

return (
  <HomeContainer>
    <Hero />
    <Build />
    <BuildSomething />
    <Cards />
    <CTA />
  </HomeContainer>
);
