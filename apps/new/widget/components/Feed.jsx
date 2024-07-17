const { Feed } = VM.require("${alias_devs}/widget/Feed") || {
  Feed: () => <></>,
};
const { Post, Button } = VM.require("${config_account}/widget/components.Index") || {
  Post: () => <></>,
  Button: () => <></>,
};
const { Header } = VM.require("${config_account}/widget/components.Header") || {
  Header: () => <></>,
};

const LoginContainer = styled.div`
  background-color: #23242b;
  color: #fff;

  width: 100%;
  height: 16rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
  justify-content: center;

  margin-bottom: 1rem;
`;

const { feedName, template, requiredHashtags, customActions } = props;

// for modals
const [item, setItem] = useState(null);
const [showProposeModal, setShowProposeModal] = useState(false);
const toggleProposeModal = () => {
  setShowProposeModal(!showProposeModal);
};

const modalToggles = {
  propose: toggleProposeModal,
};

customActions = [
  {
    type: "modal",
    icon: "bi-file-earmark-text",
    label: "Propose",
    onClick: (modalToggles) => {
      const toggle = modalToggles.propose;
      toggle();
    },
  },
];

return (
  <div key={feedName}>
    <Header>{feedName}</Header>
    {/* Modals */}
    <Widget
      src="${alias_old}/widget/components.modals.CreateProposal" // Not sure to carry this over
      loading=""
      props={{
        showModal: showProposeModal,
        toggleModal: toggleProposeModal,
        item: item,
      }}
    />
    {!context.accountId ? ( // if not logged in
      <LoginContainer>
        <p>Please login in order to post.</p>
        <a
          href={"${alias_gateway_url}/join"}
          style={{ textDecoration: "none" }}
        >
          <Button variant="primary">Login</Button>
        </a>
      </LoginContainer>
    ) : (
      <Widget
        loading={
          <div
            className="placeholder-glow h-100 w-100"
            style={{ height: 400 }}
          ></div>
        }
        src="${config_account}/widget/components.Compose"
        props={{
          draftKey: feedName,
          template: template,
          requiredHashtags: requiredHashtags,
          feed: { ...props },
        }}
      />
    )}
    <Feed
      index={(requiredHashtags || []).map((it) => ({
        action: "hashtag",
        key: it,
        options: {
          limit: 10,
          order: "desc",
          subscribe: true,
        },
        cacheOptions: {
          ignoreCache: true,
        },
        required: true,
      }))}
      Item={(p) => (
        <Post
          accountId={p.accountId}
          blockHeight={p.blockHeight}
          noBorder={true}
          currentPath={`/${config_index}?page=activity`}
          customActions={customActions}
          modalToggles={modalToggles}
          setItem={setItem}
        />
      )}
    />
  </div>
);
