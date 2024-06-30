const { Metadata } = VM.require(
  "${config_account}/widget/page.project.Metadata",
) || {
  Metadata: () => <></>,
};

const { href } = VM.require("${alias_old}/widget/lib.url") || {
  href: () => {},
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
