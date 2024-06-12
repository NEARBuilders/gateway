const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const bosImage =
  "https://ipfs.near.social/ipfs/bafkreidpkotlkxxh4kz2jnzxxjs4i4boqv3dunrdfwvf53rkg7dlqdki5y";

const WorkspaceDocsSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M10.6667 12L14.6667 8L10.6667 4M5.33334 4L1.33334 8L5.33334 12"
        stroke="white"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const GettingStartedSVG = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clip-path="url(#clip0_80_7834)">
        <path
          d="M14.2933 7.36669L8.16667 13.4934C7.4161 14.2439 6.39812 14.6656 5.33667 14.6656C4.27521 14.6656 3.25723 14.2439 2.50667 13.4934C1.7561 12.7428 1.33444 11.7248 1.33444 10.6634C1.33444 9.6019 1.7561 8.58392 2.50667 7.83336L8.22 2.12002C8.72038 1.61876 9.39938 1.33681 10.1076 1.33618C10.8159 1.33556 11.4954 1.61631 11.9967 2.11669C12.4979 2.61706 12.7799 3.29607 12.7805 4.00433C12.7811 4.71259 12.5004 5.3921 12 5.89336L6.27333 11.6067C6.02315 11.8569 5.68382 11.9974 5.33 11.9974C4.97618 11.9974 4.63685 11.8569 4.38667 11.6067C4.13648 11.3565 3.99593 11.0172 3.99593 10.6634C3.99593 10.3095 4.13648 9.97021 4.38667 9.72002L10.0467 4.06669"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_80_7834">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

const Container = styled.div`
  background: black;
  width: 100%;
  padding: 48px 72px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
  justify-content: center;
  gap: 4rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack in a single column */
  }
  @media screen and (max-width: 1024px) {
    grid-template-columns: 1fr; /* Stack in a single column */
    padding: 48px;
    align-items: center;
  }
`;

const BuildContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex-shrink: 0;
  width: 100%;

  h2 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 58px;
    font-weight: 500;
    line-height: 120%; /* 86.4px */
    letter-spacing: -2.88px;
    margin: 0;

    span {
      background: linear-gradient(87deg, #eca227 39.02%, #fc8119 108.97%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      font-family: Poppins;
      font-size: 58px;
      font-weight: 500;
      line-height: 120%;
      letter-spacing: -2.88px;
      margin: 0;
    }
  }

  p {
    /* max-width: 421px; */
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 18px;
    margin: 0;
  }

  @media screen and (max-width: 1024px) {
    align-items: center;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
    h2 {
      font-size: 52px;
      span {
        font-size: 52px;
      }
    }
    p {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 500px) {
    h2 {
      font-size: 32px;
      span {
        font-size: 32px;
      }
    }
  }
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 34px;

  @media screen and (max-width: 500px) {
    display: flex;
    flex-direction: column;
  }
`;

const BosContainer = styled.div`
  border-radius: 24px;
  grid-column: span 2 / span 2;
  background: var(--1E1E1E, #1e1e1e);
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 500px) {
    overflow: hidden;
    display: inline-block;
    position: relative;
  }
`;

const Text = styled.div`
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  h4 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 32px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -1.28px;
    text-transform: lowercase;
    margin: 0;
  }
  p {
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    h4 {
      font-size: 24px;
    }
    p {
      font-size: 18px;
    }
  }

  @media screen and (max-width: 500px) {
    h4 {
    }
  }
`;

const BosVector = styled.img`
  max-width: 229.604px;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;

  @media screen and (max-width: 500px) {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 0;
    opacity: 0.5;
  }
`;

const GettingStarted = styled.div`
  padding: 32px;
  border-radius: 24px;
  background: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex-shrink: 0;
  p {
    color: var(--1E1E1E, #1e1e1e);
    font-family: Poppins;
    font-size: 20px;
    font-weight: 400;
    line-height: 120%; /* 24px */
    letter-spacing: -0.8px;
    margin: 0;
  }
  @media screen and (max-width: 500px) {
    padding: 20px;
    p {
      font-size: 16px;
    }
    Button {
      flex-shrink: 0;
    }
  }
`;
const LearnMore = styled.div`
  padding: 32px;
  border-radius: 24px;
  border: 1px solid var(--4D4D4D, #4d4d4d);
  background: #000;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  gap: 16px;
  p {
    color: #f5f5f5;
    font-family: Poppins;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: 120%;
    letter-spacing: -0.8px;
    margin: 0;
  }
  @media screen and (max-width: 500px) {
    padding: 20px;
    p {
      font-size: 16px;
    }
  }
`;

const Build = () => {
  return (
    <Container>
      <Cards>
        <BosContainer>
          <Link
            to="https://github.com/nearbuilders/bos-workspace"
            style={{
              textDecoration: "none",
            }}
          >
            <Text>
              <h4>bos-workspace</h4>
              <p>For local development of open web apps.</p>
            </Text>
          </Link>
          <BosVector src={bosImage} />
        </BosContainer>
        <GettingStarted>
          <p>Getting Started</p>
          <Button
            className="rounded-2 gap-2"
            style={{
              minWidth: "fit-content",
            }}
            href="https://github.com/NEARBuilders/quickstart.near"
          >
            <GettingStartedSVG />
            Quickstart Guide
          </Button>
        </GettingStarted>
        <LearnMore>
          <p>Learn More</p>
          <Button
            className="rounded-2 gap-2"
            style={{
              minWidth: "fit-content",
            }}
            href={"${alias_gateway_url}?page=resources&tab=gettingStarted"}
          >
            <WorkspaceDocsSVG />
            Workspace Docs
          </Button>
        </LearnMore>
      </Cards>
      <BuildContainer>
        <h2>
          Build <span>together</span>
        </h2>
        <p>
          We provide support systems for open-source contributors to help each
          other, learn together, and solve real problems.
          <br />
          <br />
          To support this, we've build a dev environment with a versatile set of
          tools for interacting with the blockchain OS, enabling greater
          composability across front end and back end frameworks.
        </p>
      </BuildContainer>
    </Container>
  );
};
return { Build };
