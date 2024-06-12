const { Avatar, Button } = VM.require("${alias_old}/widget/components") || {
  Avatar: () => <></>,
  Button: () => <></>,
};

const { ProfileImages } = VM.require(
  "${alias_old}/widget/components.ProfileImages",
) || {
  ProfileImages: () => <></>,
};

const StyledCard = styled.div`
  border-radius: 16px;
  background: var(--bg-2, #23242b);
  border: 0.5px solid rgba(255, 255, 255, 0.2);

  display: flex;
  align-items: flex-start;
  
  gap: 24px;
  color: var(--text-color, #fff);

  width: ${(props) => (props.variant === "grid" ? "100%" : "auto")};
  flex-direction: ${(props) => (props.variant === "grid" ? "column" : "row")};
  ${(props) =>
    props.variant === "grid"
      ? ""
      : "flex-grow: 1; justify-content: flex-start;"}

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
  // Can this come from common component?
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

const EditButton = ({ item }) => {
  return (
    <Button
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

const Tags = ({ tags, location }) => {
  return (
    <div
      className={`d-flex align-items-center ${variant === "grid" ? "flex-wrap" : ""} gap-2`}
    >
      {location && (
        <Tag>
          <i className="bi bi-globe"></i> {location}
        </Tag>
      )}
      {tags &&
        tags.map((tag) => (
          <Tag>
            <span className="fw-bold">{tag}</span>
          </Tag>
        ))}
    </div>
  );
};

const Title = ({ title, projectAccountId }) => {
  return (
    <>
      <h4>{title.length > 30 ? `${title.slice(0, 25)}...` : title}</h4>
      <span>{`@${
        projectAccountId.length > 30
          ? `${projectAccountId.slice(0, 20)}...${projectAccountId.slice(
              projectAccountId.length - 4,
            )}`
          : projectAccountId
      }`}</span>
    </>
  );
};

const ProfileImage = ({ title, profileImage }) => {
  return (
    <div
      className={"profile-image d-inline-block"}
      style={{ width: "54px", height: "54px" }}
    >
      <Widget
        src="${alias_mob}/widget/Image"
        loading=""
        props={{
          image: profileImage?.image ?? profileImage,
          alt: title,
          className: "rounded-circle w-100 h-100",
          style: { objectFit: "cover" },
          thumbnail: "thumbnail",
          fallbackUrl,
        }}
      />
    </div>
  );
};

const ProjectCard = ({ data, variant, showEditProjectAction }) => {
  const {
    accountId,
    description,
    projectAccountId,
    tags,
    collaborators,
    metadata,
    projectID,
    profileImage,
    backgroundImage,
    location,
  } = data;

  const item = {
    type: "social",
    path: `${accountId}/project/${projectID}`,
  };

  return (
    <StyledCard variant={variant} data-testid={`project-${variant}-card`}>
      {variant === "grid" ? (
        // GRID VIEW CARD
        <>
          <Widget
            src="${alias_mob}/widget/Image"
            loading=""
            props={{
              image: backgroundImage.image ?? backgroundImage,
              alt: metadata.title,
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
              <ProfileImage
                title={metadata.title}
                profileImage={profileImage}
              />
              <div className="d-flex gap-2 align-items-center">
                {showEditProjectAction && <EditButton item={item} />}
                <Widget
                  src="${config_account}/widget/components.project.StarProject"
                  loading=""
                  props={{
                    item: item,
                    notifyAccountId: accountId,
                  }}
                />
              </div>
            </div>
            <div className="info w-100">
              <Title
                title={metadata.title}
                projectAccountId={projectAccountId}
              />
              <p>{description}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <Tags tags={tags} projectAccountId={projectAccountId} />
              <ProfileImages accountIds={collaborators} />
            </div>
          </div>
        </>
      ) : (
        // LIST VIEW CARD
        <>
          <div className="d-flex justify-content-start p-4 flex-grow-1 gap-3">
            <div className="d-flex align-items-center">
              <ProfileImage
                title={metadata.title}
                profileImage={profileImage}
              />
            </div>
            <div className="info w-100">
              <Title
                title={metadata.title}
                projectAccountId={projectAccountId}
              />
            </div>
            <div className="d-flex align-items-center gap-3">
              <Tags tags={tags} location={location} />
              <ProfileImages accountIds={collaborators} />
              <div className="d-flex gap-2 align-items-center">
                {showEditProjectAction && <EditButton item={item} />} 
                <Widget
                  src="${config_account}/widget/components.project.StarProject"
                  loading=""
                  props={{
                    item: item,
                    notifyAccountId: accountId,
                  }}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </StyledCard>
  );
};

return { ProjectCard };
