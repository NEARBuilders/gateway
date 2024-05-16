const words = [
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

const ScrollingContainer = styled.div`
  height: 5.5rem;
  position: relative;
  overflow: hidden;
  width: 30em;
  flex-grow: 1;
  flex-basis: 0;

  @media screen and (max-width: 768px) {
    height: 5rem;
  }

  @media screen and (max-width: 600px) {
    height: 2.5rem;
  }

  span {
    position: absolute;
    top: 0;
    animation: slide 15s infinite;
    animation-delay: 750ms;
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
  @keyframes slide {
    0% {
      top: 0;
    }
    10% {
      top: -1.2em;
    }
    20% {
      top: -2.4em;
    }
    30% {
      top: -3.6em;
    }
    40% {
      top: -4.8em;
    }
    50% {
      top: -6em;
    }
    60% {
      top: -7.2em;
    }
    70% {
      top: -8.4em;
    }
    80% {
      top: -9.6em;
    }
    90% {
      top: -10.8em;
    }
  }
  @media screen and (max-width: 768px) {
    height: 5rem;
    span {
      font-size: 58px;
    }
  }
  @media screen and (max-width: 600px) {
    height: 2.5rem;
    span {
      font-size: 32px;
    }
  }
`;

return (
  <ScrollingContainer>
    <span>
      {words.map((word, i) => (
        <>
          {word}
          {i !== words.length - 1 && <br />}
        </>
      ))}
    </span>
  </ScrollingContainer>
);
