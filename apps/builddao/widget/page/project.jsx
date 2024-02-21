const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const accountId = props.accountId;

if (!accountId) {
  return <p className="fw-bold text-white">No Account ID</p>;
}

const profile = Social.getr(`${accountId}/profile`);

if (!profile) {
  return "";
}

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    class="bi bi-twitter-x"
    viewBox="0 0 16 16"
  >
    <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
  </svg>
);

const Container = styled.div`
  display: flex;
  gap: 24px;
  flex-direction: column;

  padding: 24px 40px;
`;

const BackgroundImage = styled.div`
  img {
    height: 252px;
  }

  @media screen and (max-width: 768px) {
    img {
      height: 126px;
    }
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: row;
  gap: 24px;

  .left {
    img {
      width: 100px;
      height: 100px;
      border-radius: 100px;
    }
  }

  @media screen and (max-width: 768px) {
    .left {
      img {
        width: 64px;
        height: 64px;
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;

    .info {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-direction: column;
      h3 {
        color: var(--white-100, #fff);
        font-size: 24px;
        font-weight: 500;
        margin: 0;
      }

      p {
        color: var(--white-50, #b0b0b0);
        font-size: 16px;
        margin: 0;
      }
    }

    .links {
      color: var(--white-100, #fff);
      font-size: 13px;

      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
`;

return (
  <Container>
    <div className="my-3 w-100">
      <Link
        style={{ textDecoration: "none" }}
        to={href({
          widgetSrc: "buildhub.near/widget/app",
          params: {
            page: "projects",
          },
        })}
      >
        <span className="text-white">
          <i className="bi bi-chevron-left"></i> Back to Projects
        </span>
      </Link>
    </div>
    <BackgroundImage>
      {profile.backgroundImage && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.backgroundImage,
            alt: "profile background",
            className: "w-100",
            style: { objectFit: "cover", left: 0, top: 0 },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
    </BackgroundImage>
    <ProfileInfo>
      <div className="left">
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: profile.image,
            alt: "profile image",
            style: { objectFit: "cover", left: 0, top: 0 },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      </div>
      <div className="right">
        <div className="info">
          <h3>{profile.name}</h3>
          <p>@{accountId}</p>
        </div>

        <div className="links">
          <span>Links</span>
          <div
            className="d-flex align-items-center flex-wrap"
            style={{ gap: 10 }}
          >
            {profile.linktree.twitter && (
              <a
                href={`https://x.com/${profile.linktree.twitter}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outline" type="icon" style={{ fontSize: 16 }}>
                  <TwitterIcon />
                </Button>
              </a>
            )}
            {profile.linktree.github && (
              <a
                href={`https://github.com/${profile.linktree.github}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outline" type="icon" style={{ fontSize: 16 }}>
                  <i className="bi bi-github"></i>
                </Button>
              </a>
            )}
            {profile.linktree.telegram && (
              <a
                href={`https://t.me/${profile.linktree.telegram}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outline" type="icon" style={{ fontSize: 16 }}>
                  <i className="bi bi-telegram"></i>
                </Button>
              </a>
            )}
            {profile.linktree.website && (
              <a
                href={`https://${profile.linktree.website}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outline" type="icon" style={{ fontSize: 16 }}>
                  <i className="bi bi-globe"></i>
                </Button>
              </a>
            )}
            {profile.linktree.youtube && (
              <a
                href={`https://youtube.com/${profile.linktree.youtube}`}
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <Button variant="outline" type="icon" style={{ fontSize: 16 }}>
                  <i className="bi bi-youtube"></i>
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </ProfileInfo>
    <Widget
      src="buildhub.near/widget/components.project.Tabs"
      loading=""
      props={{
        accountId,
        profile,
      }}
    />
  </Container>
);
