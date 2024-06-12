const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { BuilderHat } = VM.require("${config_account}/widget/Icons") || {
  BuilderHat: () => <></>,
};

const GrowBG1 =
  "https://ipfs.near.social/ipfs/bafkreigkgfv6vxnxceg7c57foivpk4sfnfeola2quam2pw3zukxezuvd6u";
const GrowBG2 =
  "https://ipfs.near.social/ipfs/bafkreidyh6pow5q3dadj5iybxhy5ps6n5zlt3micrbc7t5yuv45ktzffzi";
const GrowBG3 =
  "https://ipfs.near.social/ipfs/bafkreidkxjqdfpril2ltffff6xwjb7kxxza4rl6hnfxx5ohaghwtshnzie";

const ContributeImg1 =
  "https://ipfs.near.social/ipfs/bafkreid25n72mupzs5kr4jlhxl5rhbut72vudsyclpig3rclrhl65szfmm";

const ContributeImg2 =
  "https://ipfs.near.social/ipfs/bafkreihjnrdupa7v2o5mcab4simay6yy3m4yzlug2p2xsximiezurubqee";

const ContributeBG =
  "https://ipfs.near.social/ipfs/bafkreiakdxd7xpgy4hplyrs6khnnfwa3awwvoq4jk3o5hhe4eaeonakczq";
const HeroContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeadingSection = styled.div`
  padding: 80px 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;

  .hero-button {
    position: relative;
    color: black;
    overflow: hidden;
    background: linear-gradient(
      87deg,
      #eca227 1.24%,
      #fc8119 55.76%,
      #9747ff 108.89%
    );
    &:hover {
      background: linear-gradient(
        -87deg,
        #eca227 1.24%,
        #fc8119 55.76%,
        #9747ff 108.89%
      );
    }
  }

  @media screen and (max-width: 768px) {
    padding: 72px 64px;
  }

  @media screen and (max-width: 500px) {
    padding: 72px 48px;
    .hero-btns {
      /* flex-direction: column; */
      Button {
        flex-shrink: 0;
      }
    }
  }
`;

const Heading = styled.h1`
  color: white;
  font-family: Poppins, sans-serif;
  text-align: right;
  font-size: 72px;
  font-weight: 500;
  line-height: 120%;
  letter-spacing: -2.88px;
  margin: 0;
  flex-grow: 1;
  flex-basis: 0;
  padding: 0 !important;

  @media screen and (max-width: 920px) {
    font-size: 4rem;
  }
  @media screen and (max-width: 870px) {
    font-size: 3rem;
  }
  @media screen and (max-width: 676px) {
    font-size: 2rem;
  }
`;

const Subheading = styled.h2`
  color: #a0a0a0;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  line-height: 140%;

  @media screen and (max-width: 500px) {
    font-size: 14px;
  }
`;

const CardSection = styled.div`
  padding: 0 54px 94px 54px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));

    & > * {
      flex-basis: 100%; /* Each child takes full width */
    }

    & > :nth-child(2) {
      order: -1; /* Middle column goes first */
    }
  }

  @media screen and (max-width: 500px) {
    padding: 0px 20px 72px 20px;
  }
`;
const EndCard = styled.div`
  z-index: 2;
  overflow: clip;
  position: relative;
  .card-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    @keyframes floating {
      0%,
      100% {
        transform: translateY(0%);
      }

      50% {
        transform: translateY(-5%);
      }
    }

    .logo-hover {
      width: 108px;
      object-fit: cover;
      position: absolute;
      top: -50px;
      right: -25px;
      animation: floating 2s infinite ease-in-out;
      @media screen and (max-width: 1024px) {
        width: 125px;
      }

      @media screen and (max-width: 500px) {
        width: 100px;
        top: -30px;
        right: -10px;
      }
    }
  }
  border-radius: 24px;
  background: var(
    --Gradient-Button,
    linear-gradient(87deg, #eca227 1.24%, #fc8119 55.76%, #9747ff 108.89%)
  );

  .subheading {
    color: #000;
    font-family: Poppins, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  .heading {
    color: #000;
    font-family: Poppins, sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
  }

  @media screen and (max-width: 1024px) {
    .join-img {
      margin-top: 12px !important;
    }
  }
  @media screen and (max-width: 768px) {
    padding-bottom: 250px;
    .card-content {
      gap: 24px;
    }
    div {
      a {
        margin-top: 100px;
      }
    }
    .library-img {
      margin-top: -340px !important;
    }

    .join-img {
      margin-top: -340px !important;
      z-index: 0 !important;
    }

    .join-btn {
      margin-top: 100px !important;
    }
  }
  @media screen and (max-width: 500px) {
    padding-bottom: 200px;
    div {
      a {
        margin-top: 100px;
      }
    }
    .library-img {
      margin-top: -244px !important;
    }

    .join-img {
      margin-top: -200px !important;
      z-index: 0 !important;
    }

    .join-btn {
      margin-top: 100px !important;
    }
  }
`;
const Card = styled.div`
  z-index: 2;
  position: relative;
  .card-content {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    position: relative;
    @keyframes floating {
      0%,
      100% {
        transform: translateY(0%);
      }

      50% {
        transform: translateY(-5%);
      }
    }

    .logo-hover {
      width: 108px;
      object-fit: cover;
      position: absolute;
      top: -50px;
      right: -25px;
      animation: floating 2s infinite ease-in-out;
      @media screen and (max-width: 1024px) {
        width: 125px;
      }

      @media screen and (max-width: 500px) {
        width: 100px;
        top: -30px;
        right: -10px;
      }
    }
  }
  border-radius: 24px;
  background: #1e1e1e;

  .subheading {
    color: #666;
    font-family: Poppins, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  .heading {
    color: #fff;
    font-family: Poppins, sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
  }

  .title {
    color: #fff;
    font-family: Poppins, sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 130%; /* 23.4px */
    letter-spacing: -0.36px;
  }

  /* @media screen and (max-width: 768px) {
    transform: scale(0.9);
  } */
  @media screen and (max-width: 1024px) {
    .join-img {
      margin-top: 12px !important;
    }
  }
  @media screen and (max-width: 768px) {
    .card-content {
      gap: 24px;
    }
    div {
      a {
        margin-top: 100px;
      }
    }
    .library-img {
      margin-top: -340px !important;
    }

    .join-img {
      margin-top: -340px !important;
      z-index: 0 !important;
    }

    .join-btn {
      margin-top: 100px !important;
    }
  }
  @media screen and (max-width: 500px) {
    div {
      a {
        margin-top: 100px;
      }
    }
    .library-img {
      margin-top: -244px !important;
    }

    .join-img {
      margin-top: -200px !important;
      z-index: 0 !important;
    }

    .join-btn {
      margin-top: 100px !important;
    }
  }
`;

const HeroCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 1rem;
  width: 50%;
  border-radius: 24px;
  background: #4a21a5;
  background-image: url("https://ipfs.near.social/ipfs/bafkreidafbhvci5cn4objgslthg3lpggxs47fi4h7s4tjvlbjucczu7ihe");
  background-size: cover;

  .svg-container {
    display: flex;
    width: max-content;
    padding: 8px;
    align-items: flex-start;
    gap: 10px;
    border-radius: 8px;
    background: rgba(30, 30, 30, 0.3);
  }

  .title {
    color: #ededed;
    font-family: Poppins, sans-serif;
    font-size: 20px;
    line-height: 130%;
    letter-spacing: -0.4px;
  }

  .content {
    color: #ededed;
    font-family: Poppins, sans-serif;
    font-size: 48px;
    font-weight: 700;
    line-height: 130%;
    letter-spacing: -0.96px;
  }
`;
const GrowContainer = styled.div`
  display: flex;
  gap: 8px;
  flex-shrink: 0;
  flex-direction: column;
  position: relative;
  padding: 24px;
  @media screen and (max-width: 768px) {
    padding-bottom: 200px;
  }

  @media screen and (max-width: 500px) {
    padding-bottom: 200px;
  }
`;
const BackgroundImg = styled.img`
  position: absolute;
  z-index: 0;
  overflow: clip;
  border-radius: 24px;

  left: 0;
  top: 0;
`;
const CenterCard = styled.div`
  display: grid;
  grid-template-rows: repeat(3, minmax(0, 1fr));
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;

  .subheading {
    color: #fff;
    font-family: Poppins, sans-serif;
    font-size: 16px;
    margin: 0;
  }

  .heading {
    color: #fff;
    font-family: Poppins, sans-serif;
    font-size: 24px;
    font-weight: 500;
    line-height: 130%; /* 31.2px */
    letter-spacing: -0.48px;
  }
`;

const ContributeContainer = styled.div`
  grid-row: span 2 / span 2;

  justify-content: space-between;
  padding-bottom: 24px;
  position: relative;
  border-radius: 24px;
  padding: 24px;
  overflow: clip;

  div {
    position: relative;
    z-index: 3;
  }
  p {
    padding-right: 100px;
  }
`;

const ContributeImage1 = styled.img`
  position: absolute;
  z-index: 1;
  transform: scale(0.35);
  right: 0;
  top: -34px;
  animation:
    slideInTranslate 2s forwards,
    scaleIn 1.5s forwards;

  @keyframes slideInTranslate {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.1);
      left: 180px;
    }
    to {
      transform: scale(0.35);
      left: -180px;
    }
  }
  @media screen and (max-width: 768px) {
    @keyframes slideInTranslate {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        transform: scale(0.1);
        left: 180px;
      }
      to {
        transform: scale(0.35);
        left: 80px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    @keyframes slideInTranslate {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        transform: scale(0.1);
        left: 180px;
      }
      to {
        transform: scale(0.35);
        left: -130px;
        top: 0px;
      }
    }
  }
`;

const ContributeImage2 = styled.img`
  position: absolute;
  z-index: 0;
  transform: scale(0.35);
  right: 0;
  top: -180px;
  animation:
    slideInTranslate2 2s forwards,
    scaleIn2 1s forwards;

  @keyframes slideInTranslate2 {
    from {
      transform: translateX(100%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes scaleIn2 {
    from {
      transform: scale(0.1);
      left: 180px;
    }
    to {
      transform: scale(0.3);
      left: -170px;
    }
  }
  @media screen and (max-width: 768px) {
    @keyframes slideInTranslate2 {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes scaleIn2 {
      from {
        transform: scale(0.1);
        left: 180px;
      }
      to {
        transform: scale(0.3);
        left: 70px;
      }
    }
  }

  @media screen and (max-width: 500px) {
    @keyframes slideInTranslate2 {
      from {
        transform: translateX(100%);
      }
      to {
        transform: translateX(0);
      }
    }

    @keyframes scaleIn2 {
      from {
        transform: scale(0.1);
        left: 180px;
      }
      to {
        transform: scale(0.3);
        left: -125px;
        top: -150px;
      }
    }
  }
`;

const ExploreContainer = styled.div`
  background: #1e1e1e;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 24px;
`;
const ContentCenter = styled.div``;

const GrowImage1 = styled.img`
  position: absolute;
  z-index: 1;
  left: 0;
  bottom: -60px;
  width: 100%;
  object-fit: cover;
  transform: scale(0.7);
  animation: popOut 1s forwards;

  @keyframes popOut {
    from {
      transform: translateY(100%);
      bottom: -60px;
    }
    to {
      transform: translateY(0);
      bottom: -60px;
      transform: scale(0.75);
    }
  }
  @media screen and (max-width: 768px) {
    @keyframes popOut {
      from {
        transform: translateY(100%);
        bottom: -60px;
      }
      to {
        transform: translateY(0);
        bottom: -140px;
        transform: scale(0.5);
      }
    }
  }

  @media screen and (max-width: 500px) {
    @keyframes popOut {
      from {
        transform: translateY(100%);
        bottom: -60px;
      }
      to {
        transform: translateY(0);
        bottom: -100px;
        transform: scale(0.5);
      }
    }
  }
`;
const GrowImage2 = styled.img`
  position: absolute;
  z-index: 2;
  left: -360px;
  top: 20px;
  transform: scale(0.3);
  animation: slideInRight 1s forwards;

  @keyframes slideInRight {
    from {
      transform: translateX(100%) scale(0.3);
      left: -360px;
    }
    to {
      transform: translateX(0) scale(0.3);
      left: -360px;
      transform: scale(0.3);
    }
  }

  @media screen and (max-width: 768px) {
    top: -100px;
    @keyframes slideInRight {
      from {
        transform: translateX(100%) scale(0.3);
        left: -360px;
      }
      to {
        transform: translateX(0) scale(0.3);
        left: -340px;
        transform: scale(0.2);
      }
    }
  }

  @media screen and (max-width: 500px) {
    top: -100px;
    @keyframes slideInRight {
      from {
        transform: translateX(100%) scale(0.3);
        left: -360px;
      }
      to {
        transform: translateX(0) scale(0.3);
        left: -260px;
        transform: scale(0.2);
      }
    }
  }
`;
const GrowImage3 = styled.img`
  position: absolute;
  z-index: 3;
  left: -240px; /* Initial left position */
  top: 350px;
  transform: scale(0.25);
  animation: slideInLeft 2s forwards; /* Apply the animation */

  @keyframes slideInLeft {
    from {
      transform: translateX(-100%) scale(0.25); /* Start position outside the container */
      left: -240px; /* Initial left position */
    }
    to {
      transform: translateX(0) scale(0.25); /* End position, aligned to the left inside the container */
      left: -240px; /* Adjust as needed */
      transform: scale(0.25);
    }
  }
  @media screen and (max-width: 768px) {
    top: 250px;
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%) scale(0.25); /* Start position outside the container */
        left: -240px; /* Initial left position */
      }
      to {
        transform: translateX(0) scale(0.25); /* End position, aligned to the left inside the container */
        left: -240px; /* Adjust as needed */
        transform: scale(0.25);
      }
    }
  }

  @media screen and (max-width: 500px) {
    top: 240px;
    @keyframes slideInLeft {
      from {
        transform: translateX(-100%) scale(0.25); /* Start position outside the container */
        left: -240px; /* Initial left position */
      }
      to {
        transform: translateX(0) scale(0.25); /* End position, aligned to the left inside the container */
        left: -240px; /* Adjust as needed */
        transform: scale(0.25);
      }
    }
  }
`;
const Hero = () => {
  return (
    <HeroContainer>
      <HeadingSection>
        <div className="row gap-3 flex-wrap">
          <Heading className="col-6">Let's Build</Heading>
          <Widget src="${config_account}/widget/page.home.hero.Vertical" />
        </div>
        <Subheading>
          Designed to support builders in a multi-chain ecosystem.
        </Subheading>
        <div className="d-flex align-items-center gap-4 hero-btns">
          <Button className="hero-button" href={"?page=projects&tab=editor"}>
            Start Project
          </Button>
          <Button href={"?page=projects"}>Explore Projects</Button>
        </div>
      </HeadingSection>
      <CardSection>
        <Card>
          <ExploreContainer className="card-content d-flex flex-column gap-2">
            <h3 className="heading">Explore</h3>
            <p className="subheading">
              Learn with our Social Graph of Build Commons.
            </p>
            <Widget src="${config_account}/widget/page.home.hero.SocialGraph" />
          </ExploreContainer>
        </Card>
        <CenterCard>
          <div className="d-flex flex-column gap-2 rounded-4 overflow-hidden opacity-50">
            <Widget
              src="${config_account}/widget/page.home.hero.ScrollingText"
              props={{
                direction: "normal",
                words: [
                  "Funding Program",
                  "Founders",
                  "Project Page",
                  "Engineering",
                ],
              }}
            />
            <Widget
              src="${config_account}/widget/page.home.hero.ScrollingText"
              props={{
                direction: "reverse",
                words: ["UI/UX Designers", "Roles", "Developers", "Support"],
              }}
            />
            <Widget
              src="${config_account}/widget/page.home.hero.ScrollingText"
              props={{
                direction: "normal",
                words: [
                  "Roles",
                  "Project Managers",
                  "Earn Rewards",
                  "Open Source",
                ],
              }}
            />
          </div>
          <ContributeContainer>
            <ContentCenter>
              <div>
                <h3 className="heading">Contribute</h3>
                <p className="subheading">
                  Participate in projects and build together.
                </p>
              </div>
              <ContributeImage1 src={ContributeImg1} />
              <ContributeImage2 src={ContributeImg2} />
            </ContentCenter>

            <BackgroundImg src={ContributeBG} />
          </ContributeContainer>
        </CenterCard>
        <EndCard>
          <GrowContainer className="card-content">
            <h3 className="heading">Grow</h3>
            <p className="subheading">
              Engage and grow in real time with Activity Feed
            </p>
<<<<<<< HEAD
            {/* <Button variant="primary" href="${config_index}?page=activity">
              Activity
            </Button> */}
=======
>>>>>>> 78f2035 (Landing Page Update 4.0)
          </GrowContainer>
          <GrowImage1 src={GrowBG1} />
          <GrowImage2 src={GrowBG2} />
          <GrowImage3 src={GrowBG3} />
        </EndCard>
      </CardSection>
    </HeroContainer>
  );
};

return { Hero };
