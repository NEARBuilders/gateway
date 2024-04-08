const { Avatar, Hashtag, Button } = VM.require(
  "${config_account}/widget/components",
) || {
  Hashtag: () => <></>,
  Avatar: () => <></>,
  Button: () => <></>,
};

const { href } = VM.require("${config_account}/widget/lib.url") || {
  href: () => {},
};

const { ProfileImages } = VM.require(
  "${config_account}/widget/components.ProfileImages",
) || {
  ProfileImages: () => <></>,
};

const Card = styled.div`
  border-radius: 16px;
  background: var(--bg-2, #23242b);

  display: flex;
  padding: 24px 29px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  color: var(--text-color, #fff);
  justify-content: space-between;

  .info {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;

    h4 {
      font-size: 16px;
      font-weight: 700;
      margin: 0;
    }

    span {
      color: var(--white-50, #b0b0b0);
      font-size: 13px;
      font-weight: 700;
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

const ProjectCard = ({ project, userProject }) => {
  const {
    accountId,
    projectAccountId,
    tags,
    collaborators,
    metadata,
    projectID,
  } = project;

  return (
    <Card>
      <div className="c-top">
        <div
          className={"profile-image d-inline-block"}
          style={{ width: "3em", height: "3em" }}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: metadata.profileImage.image,
              alt: metadata.title,
              className: "rounded-circle w-100 h-100",
              style: { objectFit: "cover" },
              thumbnail: "thumbnail",
              fallbackUrl,
            }}
          />
        </div>
        <div className="info">
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
        </div>
        <div className="d-flex align-items-center flex-wrap gap-2">
          {tags.map((tag) => (
            <Hashtag>
              <span className="fw-bold">{tag}</span>
            </Hashtag>
          ))}
        </div>
        <div>
          <ProfileImages accountIds={collaborators} />
        </div>
      </div>
      <div className="w-100">
        <Button
          href={href({
            widgetSrc: `${config_account}/widget/app`,
            params: {
              page: "project",
              id: `${accountId}/${userProject}/${projectID}`,
              tab: "overview",
            },
          })}
          linkClassName="align-self-stretch bt-w"
          variant="outline"
        >
          Open
        </Button>
      </div>
    </Card>
  );
};

return { ProjectCard };
