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
      align-items: flex-start;
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
const Metadata = ({ profile, title, projectAccountId }) => {
  return (
    <div>
      {" "}
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
        <div className="right">
          <div className="info">
            <h3>{title ?? profile.name}</h3>
            <p>@{projectAccountId}</p>
          </div>

          <div className="links">
            <span>Links</span>
            <Widget
              src="${alias_old}/widget/components.profile.Linktree"
              loading=""
              props={{
                profile,
              }}
            />
          </div>
        </div>
      </ProfileInfo>
    </div>
  );
};

return { Metadata };
