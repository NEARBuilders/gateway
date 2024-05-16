const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const LeftCardImg =
  "https://ipfs.near.social/ipfs/bafkreif3muxalp4mkfqqbrm7urmsohx645ok6e7t544gj6dt2ys7f7fhpm";
const RightCardImg =
  "https://ipfs.near.social/ipfs/bafybeigjgor7pm2ekq3dpfytf2uz2mdwmh3m5bhkmhvcyghtq5a2nzgzte";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 2rem;
  margin: 0 3rem;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const LeftCard = styled.div`
  background-image: url(${LeftCardImg});
  background-color: #eca227;
  background-size: cover;
  border-radius: 24px;
  padding: 48px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 32px;

  h3 {
    color: #000;
    font-family: Poppins;
    font-size: 48px;
    font-weight: 500;
    line-height: 120%; /* 57.6px */
    letter-spacing: -1.92px;
    margin: 0;
  }

  p {
    color: #000;
    font-family: Poppins;
    font-size: 20px;
    margin: 0;
  }

  button {
    width: max-content;
  }

  @media screen and (max-width: 1025px) {
    h3 {
      font-size: 38px;
    }
  }
  @media screen and (max-width: 500px) {
    background-size: cover;
    padding: 16px;
    gap: 18px;
    h3 {
      font-size: 26px;
    }
    p {
      font-size: 12px;
    }
  }
`;

const RightCard = styled.div`
  background-image: url(${RightCardImg});
  background-size: cover;
  border-radius: 24px;
  padding: 48px;
  height: 100%;

  display: flex;
  flex-direction: column;
  gap: 32px;

  h3 {
    color: var(--FFFFFF, #fff);
    font-family: Poppins;
    font-size: 48px;
    font-weight: 500;
    line-height: 120%; /* 57.6px */
    letter-spacing: -1.92px;
    margin: 0;
  }

  p {
    color: var(--A0A0A0, #a0a0a0);
    font-family: Poppins;
    font-size: 20px;
    margin: 0;
  }

  button {
    width: max-content;
  }
  @media screen and (max-width: 1025px) {
    h3 {
      font-size: 38px;
    }
  }
  @media screen and (max-width: 500px) {
    background-size: cover;
    padding: 16px;
    gap: 18px;
    h3 {
      font-size: 26px;
    }
    p {
      font-size: 12px;
    }
  }
`;

const Cards = () => {
  return (
    <Container>
      <LeftCard>
        <h3>Earn Rewards</h3>
        <p>
          Join the roster of paid contributors and coordinate with fellow
          builders to get involved.
        </p>
        <Button>Start Here</Button>
      </LeftCard>
      <RightCard>
        <h3>Request Feedback</h3>
        <p>
          We are here to listen, support, and bring projects to life! Ask
          questions and share updates.
        </p>
        <Button variant="primary">See Activity</Button>
      </RightCard>
    </Container>
  );
};

return { Cards };
