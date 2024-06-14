const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { href } = VM.require("${alias_old}/widget/lib.url") || {
  href: () => {},
};

const showCanvas = props.showCanvas;
const onClose = props.onClose;
const project = props.project;
const { title, projectAccountId, description, linktree } = project;

const profile = {
  name: title,
  description: description,
  linktree: linktree,
  backgroundImage: project.backgroundImage?.image ?? project.backgroundImage,
  image: project.profileImage?.image ?? project.profileImage,
};

const Container = styled.div`
  .offcanvas.offcanvas-end {
    width: 60% !important;
  }
  .close {
    position: absolute;
    top: 1rem;
    left: -3rem;
  }
  .profile-card {
    background-color: #161616;
  }

  .text-yellow {
    color: #eca227;
  }
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

const id = `${project.accountId}/project/${project.projectID}`;

return (
  <Container>
    <div
      className={`offcanvas offcanvas-end ${showCanvas ? "show" : ""}`}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={{ visibility: showCanvas ? "visible" : "hidden" }}
    >
      <div class="close cursor" onClick={onClose}>
        <img
          height={40}
          src="https://ipfs.near.social/ipfs/bafkreiawbtdt3245gggyeszp7zmslrsdvpre6nom5lb3kcx64x45fa53yu"
        />
      </div>
      <div class="offcanvas-body d-flex flex-column gap-4">
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
        <div className="profile-card p-4 d-flex gap-4 align-items-center rounded-3">
          <Widget
            src="${alias_mob}/widget/Image"
            props={{
              image: profile.image,
              alt: "profile image",
              style: {
                objectFit: "cover",
                left: 0,
                top: 0,
                height: 60,
                borderRadius: "50%",
              },
              fallbackUrl:
                "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
            }}
          />
          <div>
            <h5 className="mb-0">{title}</h5>
            <div className="text-yellow text-sm">@{projectAccountId}</div>
          </div>
          <div className="justify-self-end">
            <Widget
              src="${alias_old}/widget/components.profile.Linktree"
              loading=""
              props={{
                profile,
              }}
            />
          </div>
        </div>

        <Widget
          src="${config_account}/widget/page.project.tabs.Overview"
          loading=""
          props={{
            id: id,
          }}
        />
        <Button
          variant="primary"
          href={href({
            widgetSrc: `${config_index}`,
            params: {
              page: "project",
              id,
              tab: "overview",
            },
          })}
        >
          See Project Page
        </Button>
      </div>
    </div>
  </Container>
);
