const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};

const { href } = VM.require("${alias_devs}/widget/lib.url") || {
  href: () => {},
};

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
      h3 {
        color: var(--white-100, #fff);
        font-size: 24px;
        font-weight: 500;
        margin-bottom: 4px;
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

const EditButton = ({ item }) => {
  return (
    <Button
      data-testid="edit-btn"
      href={href({
        widgetSrc: `${config_index}`,
        params: {
          page: "projects",
          tab: "editor",
          id: item.path,
        },
      })}
      type="icon"
      className={"rounded-3"}
      variant="primary"
    >
      <i class="bi bi-pencil-fill"></i>
    </Button>
  );
};

const HyperLink = styled.a`
  all: unset;
  display: inline-flex;
  padding: 8px 15px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  line-height: normal;
  font-family: "Poppins", sans-serif;

  transition: all 300ms;
  border: 1px solid #e2c58d;
  cursor: pointer;
  :hover {
    background: #e2c58d;
    color: #3d5443;
  }
`;

const Metadata = ({
  profile,
  accountId,
  title,
  projectAccountId,
  projectId,
}) => {
  const isOwner = accountId === projectAccountId;
  return (
    <div>
      <BackgroundImage>
        {profile.backgroundImage && (
          <Widget
            src="${alias_mob}/widget/Image"
            props={{
              image: profile.backgroundImage,
              alt: "profile background",
              className: "w-100",
              style: { objectFit: "cover", left: 0, top: 0 },
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreifn654yar6dv4ztyijkag3lgh274iqfajgjhvnny6gv22pkkhxllm",
            }}
          />
        )}
      </BackgroundImage>
      <ProfileInfo className="mt-3">
        <div className="left">
          <Widget
            src="${alias_mob}/widget/Image"
            props={{
              image: profile.image,
              alt: "profile image",
              style: { objectFit: "cover", left: 0, top: 0 },
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
        </div>
        <div className="right d-flex flex-row w-100 align-items-center">
          <div className="d-flex flex-column gap-2">
            <div className="info">
              <h3>{title ?? profile.name}</h3>
              <p>@{projectAccountId}</p>
            </div>

            <div className="links">
              <span>Links</span>
              <div className="d-flex gap-2">
                <Widget
                  src="${alias_old}/widget/components.profile.Linktree"
                  loading=""
                  props={{
                    profile,
                  }}
                />
                {/* {isOwner && ( */}
                <HyperLink
                  href="https://arizportfolio.near.page/"
                  className="btn btn-outline"
                  target="_blank"
                >
                  {/* <img src="https://github.com/arizas/Ariz-Portfolio/blob/30ea2c2451b733aef3ce191f5d5272cf68e83fa8/Logo/Ariz-logo_svart-skrift.png" /> */}
                  Ariz Portfolio
                </HyperLink>
                {/* )} */}
              </div>
            </div>
          </div>
          <div
            style={{
              display: accountId === projectAccountId ? "block" : "none",
            }}
            className="ms-auto"
          >
            <EditButton
              item={{
                type: "social",
                path: `${projectAccountId}/project/${projectId}`,
              }}
            />
          </div>
        </div>
      </ProfileInfo>
    </div>
  );
};

return { Metadata };
