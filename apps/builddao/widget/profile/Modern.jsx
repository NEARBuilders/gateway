const theme = props.theme ?? "dark";

const accountId = props.accountId ?? context.accountId;

if (!accountId) {
  return "AccountID prop or signed in account is required";
}

const profile = Social.getr(`${accountId}/profile`);
if (!profile) {
  return "";
}

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: ${theme === "dark" ? "#000" : "#fff"};
  color: ${theme === "dark" ? "#fff" : "#000"};
  overflow: hidden;
`;

const fullGradient = props.fullGradient ?? true;
const tabGradient = props.tabGradient ?? false;

const LeftGradientFull = () => {
  const Blur = styled.div`
    width: 478px;
    height: 819px;
    flex-shrink: 0;
    border-radius: 819px;
    background: var(--Purple-Dark-6, #4e2667);
    filter: blur(200px);
    position: absolute;
    left: 0;
    transform: translateX(-50%);
    overflow: hidden;
    top: 0;
    pointer-events: none;
  `;

  return <Blur></Blur>;
};

const RightGradientFull = () => {
  const Blur = styled.div`
    width: 478px;
    height: 819px;
    flex-shrink: 0;

    border-radius: 819px;
    background: var(--Purple-Dark-6, #4e2667);
    filter: blur(200px);
    position: absolute;
    right: 0;
    transform: translateX(50%);
    overflow: hidden;
    top: 0;
    pointer-events: none;
  `;

  return <Blur></Blur>;
};

return (
  <ProfileContainer className="container-xl position-relative">
    <Widget
      src="buildhub.near/widget/components.profile.ProfileInfo"
      props={{ accountId, theme }}
    />
    <div className="overflow-hidden position-relative">
      <Widget
        src="buildhub.near/widget/components.profile.ProfileTabs"
        props={{
          accountId,
          profile,
          theme,
        }}
      />
      {tabGradient && (
        <div className="opacity-25">
          <LeftGradientFull />
          <RightGradientFull />
        </div>
      )}
    </div>
    {fullGradient && (
      <>
        <LeftGradientFull />
        <RightGradientFull />
      </>
    )}
  </ProfileContainer>
);
