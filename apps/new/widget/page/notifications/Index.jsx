const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const accountId = context.accountId;

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

if (!accountId) {
  return (
    <LoginContainer>
      <p>Please login in order to see notifications.</p>
      <a href={"${alias_gateway_url}/join"} style={{ textDecoration: "none" }}>
        <Button variant="primary">Log-in</Button>
      </a>
    </LoginContainer>
  );
}

const index = {
  action: "notify",
  key: accountId,
  options: {
    limit: 50,
    order: "desc",
    subscribe: true,
  },
  cacheOptions: {
    ignoreCache: true,
  },
};

const StyledNotification = styled.div`
  .me-2.text-truncate,
  .text-muted {
    color: white !important;
  }

  .btn.rounded-5 {
    border-radius: 8px !important;
    border: 1px solid rgba(255, 255, 255, 0.2) !important;
    font-family: "Poppins", sans-serif !important;
    font-weight: 500 !important;
    color: white !important;
    background: black !important;
  }
`;

const renderItem = (item, i) => {
  if (i === 0) {
    Storage.set("lastBlockHeight", item.blockHeight);
  }
  return (
    <StyledNotification>
      <Widget
        loading={
          <div className="mb-3">
            <div className="placeholder" style={{ height: "48px" }} />
          </div>
        }
        src="${config_account}/widget/notification.Item"
        key={i}
        props={item}
      />
    </StyledNotification>
  );
};

return (
  <div className="placeholder-glow container-xl mt-3">
    <Widget
      src="${alias_mob}/widget/FilteredIndexFeed"
      props={{ index, renderItem }}
    />
  </div>
);
