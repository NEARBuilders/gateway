const words = props.words ?? [
  "Projects",
  "Tools",
  "Solutions",
  "Teams",
  "Dreams",
  "Visions",
  "Systems",
  "Ecosystems",
  "Commons",
  "Futures",
];

const Container = styled.div`
  /* Core functionality */
  margin: 0 !important;
  padding: 0 !important;
  #animated-text-strip {
    display: flex;
    flex-flow: column nowrap;
    align-items: flex-start;
    overflow: hidden;
    height: 5.5rem;
    width: 30em;
  }

  @keyframes marqueeUp {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(0, -100%);
    }
  }

  #animated-text-strip .marquee {
    white-space: nowrap;
    animation: marqueeUp 20s linear infinite;
    animation-direction: ${props.direction ? props.direction : "normal"};
    max-width: none;
  }

  .marquee {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 0.5rem;
    font-family: Poppins, sans-serif;
    font-size: 72px;
    font-weight: 500;
    line-height: 120%; /* 86.4px */
    letter-spacing: -2.88px;
    background: linear-gradient(
      87deg,
      #eca227 -41.01%,
      rgba(242, 103, 4, 0.9) 49.3%,
      rgba(74, 33, 165, 0.41) 87.03%
    );
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin: 0;
  }

  @media screen and (max-width: 920px) {
    #animated-text-strip {
      height: 4rem;
      width: 22em;
    }

    .marquee {
      font-size: 4rem;
    }
  }

  @media screen and (max-width: 870px) {
    #animated-text-strip {
      height: 3rem;
      width: 17em;
    }

    .marquee {
      font-size: 3rem;
    }
  }

  @media screen and (max-width: 676px) {
    #animated-text-strip {
      height: 2rem;
      width: 12em;
    }

    .marquee {
      font-size: 2rem;
    }
  }
`;

return (
  <Container className="col-6">
    <div id="animated-text-strip">
      <span class="marquee">
        {words.map((word) => (
          <div key={word}>{word}</div>
        ))}
      </span>
      <span class="marquee">
        {words.map((word) => (
          <div key={word}>{word}</div>
        ))}
      </span>
      <span class="marquee">
        {words.map((word) => (
          <div key={word}>{word}</div>
        ))}
      </span>
    </div>
  </Container>
);
