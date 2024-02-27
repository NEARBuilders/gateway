const { Tag } = VM.require("buildhub.near/widget/components") || {
  Tag: () => <></>,
};

const Container = styled.div`
  padding: 50px 48px;
  display: flex;
  flex-direction: column;
  gap: 100px;

  @media screen and (max-width: 768px) {
    padding: 32px 20px;
    gap: 50px;
  }
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  h2 {
    color: var(--paleta-escolhida-ffffff, #fff);
    font-size: 44px;
    line-height: 110%;
    text-wrap: balance;
    font-family: "Poppins", sans-serif;
    margin: 0;

    span {
      font-weight: 700;
    }
  }

  h3 {
    color: var(--b-0-b-0-b-0, var(--White-50, #b0b0b0));
    font-size: 24px;
    font-weight: 500;
    margin: 0;
    font-family: "InterVariable", sans-serif;
    line-height: 140%; /* 33.6px */
    max-width: 930px;
  }

  @media screen and (max-width: 768px) {
    h2 {
      font-size: 24px;
      line-height: 130%;
    }

    h3 {
      font-size: 14px;
    }
  }
`;

const StepContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  place-items: center;
  align-items: stretch;
  gap: 32px;

  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
`;

const Step = styled.div`
  display: flex;
  padding: 40px 56px;
  flex-direction: column;
  gap: 40px;

  border-radius: 16px;
  border: 1px solid var(--White-50, #b0b0b0);
  background: var(--000000, #000);

  &.first {
    border: 1px solid var(--Gradient-1, #4a21a5);
  }

  h4 {
    color: var(--eca-227, #eca227);
    font-size: 52px;
    font-weight: 900;
    line-height: 140%; /* 89.6px */
    margin: 0;
  }

  h5 {
    color: var(--paleta-escolhida-ffffff, #fff);
    font-size: 28px;
    line-height: 120%; /* 43.2px */
    margin-bottom: 12px;
  }

  p {
    color: var(--6-e-6-e-6-e, var(--Black-50, #6e6e6e));
    font-size: 18px;
    line-height: 120%; /* 33.6px */
    margin: 0;
  }

  @media screen and (max-width: 768px) {
    padding: 24px 16px;
    flex-direction: row;
    align-items: center;
    width: 100%;
    gap: 16px;

    h4 {
      font-size: 32px;
    }

    h5 {
      font-size: 20px;
      line-height: normal;
      margin: 0;
    }

    p {
      font-size: 18px;
    }
  }
`;

const Purposes = () => {
  return (
    <Container className="container-xl">
      <HeadingContainer>
        <Tag label="Purposes" />
        <h2>
          Build DAO has three main purposes in one:
          <span>Everyone builds everything together!</span>
        </h2>
        <h3>
          Unite in purpose at Build DAO: crafting a global future, empowering
          builders, and fostering impactful projects collaboratively.
        </h3>
      </HeadingContainer>
      <StepContainer>
        <Step className="first">
          <h4>1</h4>
          <div>
            <h5>To build a better future</h5>
            <p>for the open web worldwide</p>
          </div>
        </Step>
        <Step>
          <h4>2</h4>
          <div>
            <h5>To connect and empower </h5>
            <p>communities of builders to create anything useful</p>
          </div>
        </Step>
        <Step>
          <h4>3</h4>
          <div>
            <h5>Helping each other to create</h5>
            <p>successful projects with really positive impact</p>
          </div>
        </Step>
      </StepContainer>
    </Container>
  );
};

return { Purposes };
