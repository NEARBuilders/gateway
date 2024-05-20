const { Button } = VM.require("${config_account}/widget/components") || {
  Button: () => <></>,
};
const { Modal } = VM.require("${config_account}/widget/components.Modal") || {
  Modal: () => <></>,
};

const ModalContainer = styled.div`
  width: 480px;
  height: 314px;
  gap: 0;
  border-radius: 20px;
  background-color: #000000;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;
const ModalHeading = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 20px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.01em;
  margin-top: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledButton = styled.div`
  padding: 8px 16px;
  border-radius: 10px;
  margin-left: 8px;
  cursor: pointer;
  font-weight: 500;
  font-family: inherit;
  color: ${(props) => (props.variant === "copy" ? "#000000" : "#FFFFFF97")};
  background-color: ${(props) =>
    props.variant === "copy" ? "#FFAF51" : "#505050"};
  transition: background-color 0.3s;
  &:hover {
    background-color: ${(props) =>
      props.variant === "copy" ? "#FFC57F" : "#626262"};
  }
`;

const TimerContainer = styled.div`
  margin-top: -60px;
  margin-left: 200px; /* Adjust margin as needed */
  width: 48px;
  height: 48px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
`;

const Timer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
`;
const Content = styled.div`
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  font-weight: 200;
  text-align: center;
  margin-top: 50px;
  max-width: 450px;
  margin: 0;
  padding: 0 20px;
`;
const url =
  "${alias_gateway_url}/${config_account}/widget/app?page=feed&tab=proposals";
const ProposalVisibilityInfoModal = ({
  open,
  setCopied,
  setInfoModalActive,
  copied,
}) => {
  const handleCopy = () => {
    clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  };

  return (
    <Modal open={open} onOpenChange={setInfoModalActive}>
      <TimerContainer>
        <Timer>
          <img
            src="https://ipfs.near.social/ipfs/bafkreibqiezrrdjzrcjxqc2grfn62dcgalhl46d4yg63pb7t73nvx3tvj4"
            style={{ width: 20, height: 24 }}
          />
        </Timer>
      </TimerContainer>

      <ModalHeading>Awaiting Approval</ModalHeading>
      <Content>
        <p>
          Once the transaction is approved, it will appear in the 'Proposals
          Feed'. Kindly save the feed link beforehand.
        </p>
      </Content>

      <ButtonContainer>
        <StyledButton variant="copy" onClick={handleCopy}>
          Copy
        </StyledButton>
        <StyledButton
          variant="cancel"
          onClick={() => setInfoModalActive(false)}
        >
          Cancel
        </StyledButton>
      </ButtonContainer>
    </Modal>
  );
};
return { ProposalVisibilityInfoModal };
