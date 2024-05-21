const { Hero } = VM.require("${config_account}/widget/home.Hero") || {
  Hero: () => <></>,
};

const { Build } = VM.require("${config_account}/widget/home.Build") || {
  Build: () => <></>,
};

const { Cards } = VM.require("${config_account}/widget/home.Cards") || {
  Cards: () => <></>,
};

const { BuildSomething } = VM.require(
  "${config_account}/widget/home.BuildSomething",
) || {
  BuildSomething: () => <></>,
};

const { CTA } = VM.require("${config_account}/widget/home.CTA") || {
  CTA: () => <></>,
};

const poppinsCss = fetch(
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
).body;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  min-height: 100vh;
  overflow-x: clip;

  ${poppinsCss}
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
