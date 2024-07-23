const { Metadata } = VM.require(
  "${config_account}/widget/page.project.Metadata",
) || {
  Metadata: () => <></>,
};

const { href } = VM.require("${alias_devs}/widget/lib.url") || {
  href: () => {},
};

const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};

const Layout = ({
  projectAccountId,
  projectId,
  profile,
  children,
  project,
  tab,
  accountId,
}) => {
  const { title } = project;

  if (!projectAccountId) {
    return <p className="fw-bold text-white">No Account ID</p>;
  }
  const isOwner = accountId === projectAccountId;

  return (
    <>
      <div className="my-3 w-100">
        <Link
          style={{ textDecoration: "none" }}
          to={href({
            widgetSrc: "${config_index}",
            params: {
              page: "projects",
            },
          })}
        >
          <span className="text-white">
            <i className="bi bi-chevron-left"></i> Back to Projects
          </span>
        </Link>
        {isOwner && (
          <Button
            href="https://arizportfolio.near.page/"
            className=""
            variant="primary"
            target="_blank"
            style={{
              float: "right",
              background: "#fff",
              color: "#3d5443",
              marginTop: -5,
            }}
          >
            Open
            <img
              src="https://ipfs.near.social/ipfs/bafkreiewwaad6t7hhd6p4q6n7guranohznqaz634xuzgcgcoahxfayal5i"
              width={"30px"}
            />
            Portfolio
          </Button>
        )}
      </div>
      <Metadata
        title={title}
        profile={profile}
        projectAccountId={projectAccountId}
        projectId={projectId}
        accountId={accountId}
      />
      <h5
        style={{
          textTransform: "capitalize",
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
        className="text-white py-2"
      >
        {tab}
      </h5>
      <div
        className="tab-content"
        style={{ marginTop: 8 }}
        id="pills-tabContent"
      >
        <div
          className="tab-pane fade show active"
          id="pills-overview"
          role="tabpanel"
          aria-labelledby="pills-overview-tab"
        >
          {children}
        </div>
      </div>
    </>
  );
};
return { Layout };
