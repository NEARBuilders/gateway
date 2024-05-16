const { Modal, Button } = VM.require("${config_account}/widget/components") || {
  Modal: () => <></>,
  Button: () => <></>,
};

const ProposalVisibilityInfoModal = ({
  open,
  setInfoModalActive,
  onCopyButtonClick,
  copied,
}) => {
  return (
    <Modal open={open} onOpenChange={setInfoModalActive} hideCloseBtn={true}>
      <div>
        <p
          style={{
            color: "white",
            textAlign: "center",
            marginLeft: "-10px",
            marginBottom: "20px",
          }}
        >
          <h5>
            After approval, the proposal will appear in the Proposals feed.
            Please copy the link of the feed beforehand.
          </h5>
        </p>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button variant="outline" onClick={onCopyButtonClick}>
            Copy
          </Button>

          <Button variant="outline" onClick={() => setInfoModalActive(false)}>
            Cancel
          </Button>
        </div>
        <div style={{ textAlign: "center", marginTop: "10px" }}>
          {copied && <span style={{ color: "green" }}>Copied!!</span>}
        </div>
      </div>
    </Modal>
  );
};
return { ProposalVisibilityInfoModal };
