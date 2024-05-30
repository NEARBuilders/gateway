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
  profile,
  routes,
  children,
  project,
  id,
  tab,
}) => {
  const { title } = project;

  if (!projectAccountId) {
    return <p className="fw-bold text-white">No Account ID</p>;
  }

  const Nav = styled.div`
    .nav-pills {
      background: var(--bg-1, #0b0c14);
      font-weight: 500;
      --bs-nav-pills-border-radius: 0;
      --bs-nav-link-color: var(--font-color, #fff);
      --bs-nav-pills-link-active-color: var(--font-color, #fff);
      --bs-nav-pills-link-active-bg: var(--bg-1, #0b0c14);
      --bs-nav-link-padding-y: 0.75rem;
      border-bottom: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
      padding-top: 3px;
    }
    .nav-link.active {
      border-bottom: 2px solid var(--Yellow, #ffaf51);
    }

    .nav-item:not(:has(> .disabled)):hover {
      background: rgba(13, 110, 253, 0.15);
    }
  `;
  return (
    <>
      <div className="my-3 w-100">
        <Link
          style={{ textDecoration: "none" }}
          to={href({
            widgetSrc: "${config_account}/widget/Index",
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
      />
      <Nav>
        <ul className="nav nav-pills nav-fill" id="pills-tab" role="tablist">
          {routes &&
            Object.keys(routes).map((it) => (
              <li className="nav-item" role="presentation" key={it}>
                <Link
                  to={href({
                    widgetSrc: `${config_account}/widget/Index`,
                    params: {
                      page: "project",
                      id: id,
                      tab: it,
                    },
                  })}
                  key={it}
                  style={{ textDecoration: "none" }}
                >
                  <button
                    className={`nav-link ${it === tab ? "active" : ""}`}
                    id={`pills-${id}-tab`}
                    data-bs-toggle="pill"
                    data-bs-target={`#pills-${it}`}
                    type="button"
                    role="tab"
                    aria-controls={`pills-${it}`}
                    aria-selected={i === 0}
                  >
                    {it.slice(0, 1).toUpperCase() + it.slice(1)}
                  </button>
                </Link>
              </li>
            ))}
        </ul>
      </Nav>
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
