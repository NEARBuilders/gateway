const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const words = props.words ?? [
  "Funding Program",
  "Founders",
  "Project Page",
  "Engineering",
];

const Container = styled.div`
  /* Core functionality */
  #animated-text-strip {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow: hidden;
    padding: 0.25rem 0;
    button {
      pointer-events: none;
      border-radius: 50rem;
    }

    button:nth-child(3n) {
      background: white;
      color: black;
    }
    button:nth-child(2n) {
      background: linear-gradient(100deg, #eca227 -4.74%, #e76205 83.73%);
    }
    button:nth-child(4n) {
      background: #773bd2;
    }
  }
  #animated-text-strip .marquee {
    white-space: nowrap;
    animation: marquee 10s linear infinite;
    animation-direction: ${props.direction ? props.direction : "normal"};
    max-width: none;
  }

  @keyframes marquee {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-100%, 0);
    }
  }

  .marquee {
    display: flex;
    gap: 1rem;
    align-items: center;
    padding-right: 1rem;
  }

  @media screen and (max-width: 500px) {
    padding: 0.125rem 0;
  }
`;

return (
  <Container>
    <div id="animated-text-strip">
      <span class="marquee">
        {words.map((word) => (
          <Button key={word}>{word}</Button>
        ))}
      </span>
      <span class="marquee">
        {words.map((word) => (
          <Button key={word}>{word}</Button>
        ))}
      </span>
      <span class="marquee">
        {words.map((word) => (
          <Button key={word}>{word}</Button>
        ))}
      </span>
    </div>
  </Container>
);
