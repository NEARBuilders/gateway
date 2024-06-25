const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const { href } = VM.require("${alias_old}/widget/lib.url") || {
  href: () => {},
};

const { isNearSocial } = VM.require("${alias_new}/widget/lib.gateway") || {
  isNearSocial: false,
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
  opacity: 1 !important;
  .offcanvas.offcanvas-end {
    width: 60% !important;
  }

  .close {
    position: absolute !important;
    top: 1rem;
    left: -3rem;
  }

  @media screen and (max-width: 1200px) {
    .offcanvas.offcanvas-end {
      width: 70% !important;
    }
  }

  @media screen and (max-width: 768px) {
    .offcanvas.offcanvas-end {
      width: 100% !important;
    }

    .close {
      position: relative !important;
      top: 1rem;
      left: 0rem;
      padding: 0.5rem;
      display: flex;
      justify-content: end;
    }
  }

  .profile-card {
    background-color: #161616;
  }

  .text-yellow {
    color: #eca227;
  }

  .offcanvas {
    border-top-left-radius: 1rem !important;
    border-bottom-left-radius: 1rem !important;
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
      data-bs-scroll="false"
      data-bs-backdrop="true"
      style={{ top: isNearSocial ? "73px" : "0px", zIndex: 100 }}
    >
      <div class="close cursor" onClick={onClose}>
        <div className="d-block d-md-none">
          <i class="bi bi-x-circle h3"></i>
        </div>

        <img
          className="d-none d-md-block"
          height={40}
          src="https://ipfs.near.social/ipfs/bafkreiawbtdt3245gggyeszp7zmslrsdvpre6nom5lb3kcx64x45fa53yu"
        />
      </div>
      <div class="offcanvas-body d-flex flex-column gap-4">
        <BackgroundImage>
          {profile.backgroundImage && (
            <Widget
              loading=""
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
        <div className="profile-card p-3 d-flex gap-4 align-items-center rounded-3 justify-content-between">
          <div className="d-flex gap-4 align-items-center">
            <Widget
              loading=""
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
          </div>
          <Widget
            src="${alias_old}/widget/components.profile.Linktree"
            loading=""
            props={{
              profile,
            }}
          />
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
    <div
      style={{ pointerEvents: "none", zIndex: 50 }}
      className={`modal-backdrop fade ${showCanvas ? "show" : ""}`}
    ></div>
  </Container>
);
