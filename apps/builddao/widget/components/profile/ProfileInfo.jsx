const { Button, Hashtag } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
  Hashtag: () => <></>,
};

const accountId = props.accountId || context.accountId;

const profile = Social.getr(`${accountId}/profile`);
if (!profile) {
  return "";
}

const CopyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
  >
    <g clip-path="url(#clip0_359_2650)">
      <path
        d="M13.333 5.3335H6.66634C5.92996 5.3335 5.33301 5.93045 5.33301 6.66683V13.3335C5.33301 14.0699 5.92996 14.6668 6.66634 14.6668H13.333C14.0694 14.6668 14.6663 14.0699 14.6663 13.3335V6.66683C14.6663 5.93045 14.0694 5.3335 13.333 5.3335Z"
        stroke="#A0A0A0"
        stroke-width="1.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M2.66634 10.6668C1.93301 10.6668 1.33301 10.0668 1.33301 9.3335V2.66683C1.33301 1.9335 1.93301 1.3335 2.66634 1.3335H9.33301C10.0663 1.3335 10.6663 1.9335 10.6663 2.66683"
        stroke="#A0A0A0"
        stroke-width="1.33"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_359_2650">
        <rect width="16" height="16" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

const Container = styled.div`
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .background-image-section {
    img {
      width: 100%;
      height: 280px;
      image-rendering: pixelated;
      object-fit: cover;
    }
  }

  .profile-image-section {
    img {
      width: 140px !important;
      height: 140px !important;
      border-radius: 100%;
      border: 3px solid var(--Gray-Dark-1, #161616);
      image-rendering: pixelated;
      object-fit: cover;
    }
  }

  .account-info-section {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-direction: column;

    h3 {
      color: var(--White-A-12, rgba(255, 255, 255, 0.92));

      font-family: InterVariable, sans-serif;
      font-size: 40px;
      font-style: normal;
      font-weight: 600;
      line-height: 140%; /* 56px */
      letter-spacing: -0.4px;
      display: flex;
      align-items: center;
      margin: 0;
      gap: 8px;
    }

    span {
      display: flex;
      align-items: center;
      gap: 4px;
      max-width: max-content;

      color: var(--Gray-Dark-11, #a0a0a0);

      /* Body 16px/Regular */
      font-family: InterVariable, sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%; /* 22.4px */

      cursor: pointer;
    }
  }

  .link-section {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h3 {
      color: var(--White-100, #fff);
      /* Body/10px */
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 0;
    }
  }
  .badge-section {
    display: flex;
    flex-direction: column;
    gap: 8px;

    h3 {
      color: var(--White-100, #fff);
      /* Body/10px */
      font-size: 10px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      margin: 0;
    }
  }
`;

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="24"
    height="24"
    viewBox="0 0 50 50"
    fill="white"
  >
    <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
  </svg>
);

const LinkButton = styled.a`
  color: #fff;
  font-size: 24px;
`;

const LinkTree = ({ profile }) => {
  const { twitter, github, telegram, website } = profile.linktree;

  if (!twitter || !github || !telegram || !website) {
    return null;
  }

  return (
    <>
      <div className="d-flex align-items-center flex-wrap" style={{ gap: 10 }}>
        {twitter && (
          <LinkButton
            className="d-flex"
            href={`https://x.com/${twitter}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <TwitterIcon />
          </LinkButton>
        )}
        {github && (
          <LinkButton
            href={`https://github.com/${github}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-github"></i>
          </LinkButton>
        )}
        {telegram && (
          <LinkButton
            href={`https://t.me/${github}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-telegram"></i>
          </LinkButton>
        )}
        {website && (
          <LinkButton
            href={`https://${website}`}
            target="_blank"
            style={{ textDecoration: "none" }}
          >
            <i className="bi bi-globe"></i>
          </LinkButton>
        )}
      </div>
    </>
  );
};

const Badges = ({ tags }) => {
  if (!tags) {
    return null;
  }

  tags = Object.keys(tags);

  return (
    <>
      <div className="d-flex flex-align-center flex-wrap" style={{ gap: 12 }}>
        {tags.map((it) => (
          <Hashtag key={it}>{it}</Hashtag>
        ))}
      </div>
    </>
  );
};

const [editMode, setEditMode] = useState(false);

const InfoSection = () => {
  return (
    <>
      {profile.backgroundImage && (
        <div className="position-relative">
          <div className="background-image-section">
            <Widget
              src="mob.near/widget/Image"
              loading=""
              props={{ image: profile.backgroundImage }}
            />
          </div>
          <div
            className="profile-image-section position-absolute end-50 bottom-0"
            style={{ transform: "translate(50%, 50%)" }}
          >
            <Widget
              src="mob.near/widget/Image"
              loading=""
              props={{ image: profile.image }}
            />
          </div>
        </div>
      )}
      <div
        className="d-flex flex-column align-items-center gap-3"
        style={{ marginTop: 64 }}
      >
        <div className="account-info-section">
          <h3>
            {profile.name}{" "}
            <Widget
              loading=""
              src="buildhub.near/widget/components.VerifiedHuman"
              props={{
                accountId: accountId,
                customSvg: (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M5.13359 11.4931C4.93898 10.6165 4.96886 9.70493 5.22047 8.84292C5.47207 7.98092 5.93725 7.1964 6.57288 6.5621C7.20851 5.9278 7.994 5.46426 8.85653 5.21446C9.71906 4.96466 10.6307 4.93669 11.5069 5.13314C11.9892 4.37887 12.6536 3.75815 13.4389 3.32819C14.2241 2.89822 15.105 2.67285 16.0003 2.67285C16.8955 2.67285 17.7764 2.89822 18.5617 3.32819C19.3469 3.75815 20.0113 4.37887 20.4936 5.13314C21.3711 4.93584 22.2843 4.96368 23.1483 5.21409C24.0122 5.4645 24.7987 5.92933 25.4347 6.56534C26.0707 7.20136 26.5356 7.9879 26.786 8.85181C27.0364 9.71571 27.0642 10.6289 26.8669 11.5065C27.6212 11.9887 28.2419 12.6531 28.6719 13.4384C29.1018 14.2237 29.3272 15.1045 29.3272 15.9998C29.3272 16.8951 29.1018 17.7759 28.6719 18.5612C28.2419 19.3465 27.6212 20.0109 26.8669 20.4931C27.0634 21.3694 27.0354 22.281 26.7856 23.1435C26.5358 24.0061 26.0723 24.7916 25.438 25.4272C24.8037 26.0628 24.0191 26.528 23.1571 26.7796C22.2951 27.0312 21.3836 27.0611 20.5069 26.8665C20.0253 27.6236 19.3604 28.247 18.5738 28.6789C17.7872 29.1108 16.9043 29.3372 16.0069 29.3372C15.1096 29.3372 14.2267 29.1108 13.4401 28.6789C12.6535 28.247 11.9886 27.6236 11.5069 26.8665C10.6307 27.0629 9.71906 27.0349 8.85653 26.7851C7.994 26.5353 7.20851 26.0718 6.57288 25.4375C5.93725 24.8032 5.47207 24.0187 5.22047 23.1567C4.96886 22.2947 4.93898 21.3831 5.13359 20.5065C4.37353 20.0255 3.74748 19.36 3.31366 18.5721C2.87983 17.7841 2.65234 16.8993 2.65234 15.9998C2.65234 15.1003 2.87983 14.2155 3.31366 13.4275C3.74748 12.6396 4.37353 11.9741 5.13359 11.4931Z"
                      fill="#0091FF"
                    />
                    <path
                      d="M12 16.0002L14.6667 18.6668L20 13.3335"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                ),
              }}
            />
          </h3>
          <span onClick={() => clipboard.writeText(accountId)}>
            {accountId} <CopyIcon />
          </span>
        </div>
        {profile.linktree && (
          <div className="link-section">
            <LinkTree profile={profile} />
          </div>
        )}
        <div>
          <Widget
            src="buildhub.near/widget/components.profile.FollowStats"
            loading=""
            props={{ accountId }}
          />
        </div>
        {context.accountId === accountId && (
          <Button variant="outline" onClick={() => setEditMode(true)}>
            <i className="bi bi-pencil me-1"></i>Edit Profile
          </Button>
        )}
        <div className="badge-section">
          <Badges tags={profile.tags} />
        </div>
      </div>
    </>
  );
};

const EditSection = () => {
  return (
    <Widget
      src="buildhub.near/widget/components.profile.ProfileEdit"
      loading=""
      props={{ setEditMode }}
    />
  );
};

return <Container>{!editMode ? <InfoSection /> : <EditSection />}</Container>;
