const { Modal, Button, User } = VM.require(
  "buildhub.near/widget/components"
) || {
  Modal: () => <></>,
  Button: () => <></>,
  User: () => <></>
};

const DaoSDK = VM.require("sdks.near/widget/SDKs.Sputnik.DaoSDK");

if (!DaoSDK) {
  return <></>;
}
const daoID = "builddao.sputnik-dao.near";
const sdk = DaoSDK(daoId);
const StorageKey = {
  userCompletedOnboarding: "userCompletedOnboarding"
};

function onFollow(accountId) {
  const data = {
    graph: { follow: { [accountId]: "" } },
    index: {
      graph: JSON.stringify({
        key: "follow",
        value: {
          type,
          accountId: accountId
        }
      }),
      notify: JSON.stringify({
        key: accountId,
        value: {
          type
        }
      })
    }
  };

  Social.set(data, {
    force: true
  });
}

const PostTemplate = `👋 Hey BuildDAO community! Thrilled to join this innovative space. Looking forward to connecting with like-minded individuals. What's your favorite aspect of BuildDAO?`;

function LoginFlow() {
  const userCompletedOnboarding = Storage.privateGet(
    StorageKey.userCompletedOnboarding
  );
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (context.accountId && userCompletedOnboarding) {
      setShowModal(true);
    }
  }, [signedIn]);

  useEffect(() => {
    if (showModal) {
      Storage.privateSet(StorageKey.userCompletedOnboarding, true);
    }
  }, [showModal]);

  const Wrapper = styled.div`
    font-size: 14px;
    .text-muted {
      color: #cdd0d5 !important;
    }
  `;

  const Container = styled.div`
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.2);

    .fw-bold {
      color: #fff !important;
    }
  `;

  const StepsComponent = () => {
    switch (step) {
      case 1:
        return (
          <div className="d-flex flex-column gap-3">
            <h3>Welcome!</h3>
            <div>
              <p className="text-muted">First off, follow our DAO</p>
              <Container className="d-flex justify-content-between align-items-center py-3 px-4">
                <Widget
                  src="mob.near/widget/Profile.ShortInlineBlock"
                  props={{ accountId: daoID }}
                />
                <Button variant="outline" onClick={() => onFollow(daoID)}>
                  Follow
                </Button>
              </Container>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="d-flex flex-column gap-3">
            <h3>Connect with others!</h3>
            <div className="text-muted">
              <p>
                Follow interesting profiles and stay updated with the latest
                discussions. <br />
                So far, we have 50+ members in the Build DAO community.
              </p>
              <p>People you might want to follow</p>
              <Container className="d-flex justify-content-between align-items-center py-3 px-4">
                <Widget
                  src="mob.near/widget/Profile.ShortInlineBlock"
                  props={{ accountId: daoID, tooltip: true }}
                />
                <Button variant="outline">Follow</Button>
              </Container>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="d-flex flex-column gap-3">
            <h3>
              Make Your Mark <br />
              in BuildDAO
            </h3>
            <div className="text-muted">
              <p>
                Exciting times! <br />
                Your application is under review.
                <br /> Show your presence in the community with your first post.
                <br />
                Need inspiration?
              </p>
              <p>Suggested First Post</p>
              <Widget
                loading={
                  <div
                    className="placeholder-glow h-100 w-100"
                    style={{ height: 400 }}
                  ></div>
                }
                src="buildhub.near/widget/Compose"
                props={{
                  template: PostTemplate,
                  requiredHashtags: requiredHashtags,
                  postBtnText: "Create Your First Post"
                }}
              />
            </div>
          </div>
        );
    }
  };

  return (
    <Wrapper>
      <Modal
        open={showModal}
        title={""}
        onOpenChange={() => {}}
        hideCloseBtn={true}
      >
        <div className="d-flex flex-column gap-4 justify-content-center">
          <div className="text-center mb-4">
            <img
              src="https://ipfs.near.social/ipfs/bafkreihbwho3qfvnu4yss3eh5jrx6uxhrlzdgtdjyzyjrpa6odro6wdxya"
              width={180}
            />
          </div>
          <div style={{ width: "500px" }}>
            <StepsComponent />
          </div>
          {step !== 3 && (
            <Button variant="primary" onClick={() => setStep(step + 1)}>
              Next
            </Button>
          )}
        </div>
      </Modal>
    </Wrapper>
  );
}

return LoginFlow(props);
