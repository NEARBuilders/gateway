const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { BuilderHat } = VM.require("${alias_new}/widget/icons") || {
  BuilderHat: () => <></>,
};

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
      flex-direction: column;
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
      width: 188px;
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
    line-height: 130%; /* 26px */
    letter-spacing: -0.4px;
  }

  .content {
    color: #ededed;
    font-family: Poppins, sans-serif;
    font-size: 48px;
    font-weight: 700;
    line-height: 130%; /* 62.4px */
    letter-spacing: -0.96px;
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
          <Button className="hero-button">Start Project</Button>
          <Button>Explore Tools</Button>
        </div>
      </HeadingSection>
      <CardSection>
        <Card>
          <div className="card-content d-flex flex-column gap-2">
            <p className="subheading">What do we build?</p>
            <h3 className="heading">Supporting useful integrations</h3>
            <p className="subheading">
              We build versatile applications, including Canvas, Profiles,
              Video, Events, Tasks, and more, support and practical examples.
            </p>
            <Button
              variant="primary"
              className="mt-3"
              style={{
                width: "max-content",
                zIndex: 2,
              }}
              href="${alias_gateway_url}/${alias_old}/widget/app?page=library"
            >
              See Library
            </Button>
          </div>

          <img
            className="library-img"
            src="https://ipfs.near.social/ipfs/bafkreiaswjxjtiwthuzyvhn3l2llxat5hlb72sytgeipmifdllhmbigos4"
            style={{
              objectFit: "cover",
              width: "100%",
              marginTop: -104,
              borderRadius: "0 0 24px 24px",
              zIndex: 0,
            }}
          />
        </Card>
        <Card style={{ overflow: "hidden", background: "transparent" }}>
          <div className="p-3 d-flex align-items-center gap-2 mb-3 justify-content-center">
            <span className="title">Explore</span>
            <div style={{ height: 1, flexGrow: 1, background: "white" }} />
            <span className="title">Contribute</span>
            <div style={{ height: 1, flexGrow: 1, background: "white" }} />
            <span className="title">Develop</span>
          </div>
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
          <div className="d-flex gap-2 mt-5">
            <img
              src="https://ipfs.near.social/ipfs/bafkreihgdagkoa2z5wkl5z34oegifo2spqnowq42hyehqib6ibw7hfrx6q"
              style={{ width: "50%", objectFit: "cover" }}
            />
            <HeroCard>
              <div className="svg-container">
                <BuilderHat />
              </div>
              <p className="title m-0">Builders</p>
              <p className="content m-0">+70</p>
            </HeroCard>
          </div>
        </Card>
        <Card>
          <div className="card-content d-flex flex-column gap-2">
            <img
              src="https://ipfs.near.social/ipfs/bafkreige23waoznoljipikqdmtcuupniatrxftyy5lglua63nacjpgw5se"
              className="logo-hover"
            />
            <p className="subheading">Contribution</p>
            <h3 className="heading">
              Come build <br />
              the future with us
            </h3>
            <p className="subheading">
              Join Build DAO's funding program and turn your engagement into
              adoption.
            </p>
            <Button className="mt-3 join-btn" style={{ width: "max-content" }}>
              Join Now
            </Button>
          </div>

          <img
            className="join-img"
            src="https://ipfs.near.social/ipfs/bafkreiei26tw4c6ndhyugyku4f22mfnbea4ikhmyefboxqyxja3rqcvizm"
            style={{
              objectFit: "cover",
              width: "100%",
              marginTop: "-27px",
              borderRadius: "0 0 24px 24px",
            }}
          />
        </Card>
      </CardSection>
    </HeroContainer>
  );
};

return { Hero };
