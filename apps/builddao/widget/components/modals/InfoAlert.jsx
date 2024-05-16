const { Modal, Button } = VM.require("${config_account}/widget/components") || {
    Modal: () => <></>,
    Button: () => <></>,
  };
  
  const InfoPopup = ({ open, setInfoPopup, onCopyButtonClick, copied }) => {
    const url =
      "https://www.nearbuilders.org/buildhub.near/widget/app?page=feed&tab=proposals";
  
    return (
      <Modal open={open} onOpenChange={setInfoPopup} hideCloseBtn={true}>
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
  
            <Button variant="outline" onClick={() => setInfoPopup(false)}>
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
  return { InfoPopup };