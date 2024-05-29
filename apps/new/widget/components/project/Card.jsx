const { Avatar, Button } = VM.require("${alias_old}/widget/components") || {
  Avatar: () => <></>,
  Button: () => <></>,
};

const { href } = VM.require("${alias_devs}/widget/lib.url") || {
  href: () => {},
};

const { ProfileImages } = VM.require(
  "${alias_old}/widget/components.ProfileImages",
) || {
  ProfileImages: () => <></>,
};

const GridCard = styled.div`
  border-radius: 16px;
  background: var(--bg-2, #23242b);

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  color: var(--text-color, #fff);

  .info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;

    h4 {
      color: #fff;
      font-family: Poppins, sans-serif;
      font-size: 18px;
      font-weight: 500;
      margin: 0;
    }

    p {
      color: #b0b0b0;
      font-family: Poppins, sans-serif;
      font-size: 12px;
      margin-top: 4px;
      margin-bottom: 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    span {
      color: #b0b0b0;
      font-family: Poppins, sans-serif;
      font-size: 12px;
    }
  }
  .c-top {
    display: flex;
    flex-direction: column;
    gap: 24px;
    width: 100%;
  }
  .bt-w {
    flex: 1;
    button {
      width: 90%;
    }
  }
`;
const fallbackUrl =
  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

const Tag = styled.div`
  display: flex;
  height: 24px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  gap: 4px;
  border-radius: 6px;
  border: 1px solid #666;
  background: rgba(5, 41, 77, 0.03);

  color: #fff;
  font-family: Poppins;
  font-size: 12px;
  font-weight: 500;
  line-height: 140%; /* 14px */
  letter-spacing: -0.1px;

  i {
    color: #666;
  }
`;

const ProjectCard = ({ data, variant }) => {
  const {
    accountId,
    description,
    projectAccountId,
    tags,
    collaborators,
    metadata,
    type,
    projectID,
  } = data;

  const profile = Social.getr(`${projectAccountId}/profile`);

  return (
    <Link
      href={href({
        widgetSrc: `${alias_old}/widget/app`,
        params: {
          page: "project",
          id: `${accountId}/${type}/${projectID}`,
          tab: "overview",
        },
      })}
      style={{ textDecoration: "none", display: "flex", flexGrow: "1" }}
    >
      <GridCard>
        <Widget
          src="${alias_mob}/widget/Image"
          loading=""
          props={{
            image: profile.backgroundImage,
            alt: profile?.name,
            className: "w-100",
            style: {
              objectFit: "cover",
              height: "150px",
              borderRadius: "1rem 1rem 0 0",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreifn654yar6dv4ztyijkag3lgh274iqfajgjhvnny6gv22pkkhxllm",
          }}
        />
        <div
          className="d-flex flex-column justify-content-start p-4 w-100 flex-grow-1 pt-2"
          style={{ gap: 20 }}
        >
          <div className="d-flex align-items-center justify-content-between w-100">
            <div
              className={"profile-image d-inline-block"}
              style={{ width: "54px", height: "54px" }}
            >
              <Widget
                src="${alias_mob}/widget/Image"
                loading=""
                props={{
                  image: metadata.profileImage?.image ?? metadata.profileImage,
                  alt: metadata.title,
                  className: "rounded-circle w-100 h-100",
                  style: { objectFit: "cover" },
                  thumbnail: "thumbnail",
                  fallbackUrl,
                }}
              />
            </div>
            <Widget
              src="${config_account}/widget/components.project.StarProject"
              loading=""
              props={{
                item: {
                  id: projectID,
                },
              }}
            />
          </div>
          <div className="info w-100">
            <h4>
              {metadata.title.length > 30
                ? `${metadata.title.slice(0, 25)}...`
                : metadata.title}
            </h4>
            <span>{`@${
              projectAccountId.length > 30
                ? `${projectAccountId.slice(0, 20)}...${projectAccountId.slice(
                    projectAccountId.length - 4,
                  )}`
                : projectAccountId
            }`}</span>
            <p>{description}</p>
          </div>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <Tag>
                <i className="bi bi-globe"></i>{" "}
                {profile.location ?? "Somewhere"}
              </Tag>
              {tags.map((tag) => (
                <Tag>
                  <span className="fw-bold">{tag}</span>
                </Tag>
              ))}
            </div>
            <div>
              <ProfileImages accountIds={collaborators} />
            </div>
          </div>
        </div>
      </GridCard>
    </Link>
  );
};

return { ProjectCard };
