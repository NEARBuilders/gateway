const { Button } = VM.require("${config_account}/widget/components") || {
  Button: () => <></>,
};

const { href } = VM.require("${config_account}/widget/lib.url") || {
  href: () => {},
};

const NavContainer = styled.div`
  display: flex;
  padding: 24px 48px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  font-family: "Poppins", sans-serif;

  background-color: var(--bg, #000);
  border-bottom: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));

  .grey-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #23242b;
    color: #fff;
    border-radius: 8px;
    outline: none;
    border: 0px;
    width: 40px;
    height: 40px;
    text-decoration: none;
  }
  .test-btn-content {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .test-btn-text {
    font-family: "Poppins";
    display: flex;
    font-size: 8px;
    width: 16px;
    height: 16px;
    line-height: 11.2px;
    letter-spacing: -0.01em;
    font-weight: 700;
    justify-content: center;
    align-items: center;
  }
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 50px;

  @media screen and (max-width: 960px) {
    gap: 16px;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;

  @media screen and (max-width: 960px) {
    gap: 16px;
  }

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileView = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: column;
    position: fixed;
    background: var(--bg, #000);
    z-index: 1001;
    padding: 24px 48px;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
`;

const MobileNavigation = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 36px;

  span {
    color: var(--text-white, #fff);
  }

  .active {
    color: var(--eca-227, #eca227);
    font-weight: 700;
  }

  @media screen and (max-width: 960px) {
    gap: 16px;
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-top: 38px;
    span {
      font-size: 20px;
    }
  }
`;

const StyledDropdown = styled.div`
  .dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #23242b;
    color: #fff;
    border-radius: 8px;
    outline: none;
    border: 0;
    width: 40px;
    height: 40px;

    &:after {
      display: none;
    }

    .menu {
      width: 18px;
      height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      div {
        background-color: var(--slate-dark-11);
        height: 2px;
        width: 100%;
        border-radius: 30px;
      }
    }

    :hover {
      .menu {
        div {
          background-color: white;
        }
      }
    }
  }

  ul {
    background-color: #23242b;
    width: 100%;

    li {
      padding: 0 6px;
    }

    button,
    a {
      color: var(--slate-dark-11);
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 12px;

      :hover,
      :focus {
        text-decoration: none;
        background-color: var(--slate-dark-1);
        color: white;

        svg {
          path {
            stroke: white;
          }
        }
      }

      svg {
        margin-right: 7px;
        path {
          stroke: var(--slate-dark-9);
        }
      }
    }
  }
`;

const MobileContent = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
`;

const getNotificationCount = () => {
  const lastBlockHeight = Storage.get("lastBlockHeight");
  if (lastBlockHeight === null) {
    return "";
  }
  const notifications = Social.index("notify", context.accountId, {
    order: "asc",
    from: (lastBlockHeight ?? 0) + 1,
    subscribe: true,
  });

  return notifications.length;
};

const unreadNotifications = getNotificationCount();

function Navbar(props) {
  const { page, routes } = props;
  const [dropdown, setDropdown] = useState(false);

  const toggleDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const TestBtn = () => {
    const { networkId } = context;
    const isTestnet = networkId === "testnet";

    const config = isTestnet
      ? {
          href: "https://www.nearbuilders.org/",
          imgSrc:
            "https://ipfs.near.social/ipfs/bafkreicymekzxfo5csgpkuwmes3l2ow4wmn5oxuqdfrfhpfrtzeibi7clq",
          text: "TEST",
        }
      : {
          href: "https://test.nearbuilders.org/",
          imgSrc:
            "https://ipfs.near.social/ipfs/bafkreih2sbm2fc5y7dgalzl2yf7bx254j3ymxh32lpxs5wrwpzxf6abpqu",
          text: "MAIN",
        };

    return (
      <a target="_blank" className="grey-btn" href={config.href}>
        <div className="test-btn-content">
          <img src={config.imgSrc} height={20} width={20} alt="network icon" />
          <div className="test-btn-text">{config.text}</div>
        </div>
      </a>
    );
  };

  return (
    <NavContainer>
      <MainContent className="container-xl">
        <Left>
          <Link
            to={href({
              widgetSrc: "${config_account}/widget/app",
              params: {
                page: "home",
              },
            })}
            className="d-flex align-items-center"
          >
            <img
              className="object-fit-cover"
              style={{ height: 46 }}
              src="https://ipfs.near.social/ipfs/bafkreiglw3t6b3dx2axk7x4ftzk6pwwe6ziiyexlszlkhenxist6osrlbe"
            />
          </Link>
          <NavLinks>
            {routes &&
              (Object.keys(routes) || []).map((k) => {
                const route = routes[k];
                if (route.hide) {
                  return null;
                }
                return (
                  <Link
                    key={`desktop=${k}`}
                    style={{ textDecoration: "none" }}
                    to={href({
                      widgetSrc: "${config_account}/widget/app",
                      params: {
                        page: k,
                      },
                    })}
                  >
                    <span key={k} className={page === k ? "active" : null}>
                      {route.init.icon && <i className={route.init.icon}></i>}
                      {route.init.name}
                    </span>
                  </Link>
                );
              })}
          </NavLinks>
        </Left>
        <Right>
          {context.accountId && (
            <Button
              className="rounded-3 position-relative"
              type="icon"
              href={href({
                widgetSrc: "${config_account}/widget/app",
                params: {
                  page: "notifications",
                },
              })}
            >
              <i className="bi bi-bell"></i>
              {unreadNotifications > 0 && (
                <div
                  className="position-absolute d-flex align-items-center justify-content-center text-white fw-bold"
                  style={{
                    top: 0,
                    background: "red",
                    borderRadius: "100%",
                    right: 0,
                    width: 18,
                    height: 18,
                    fontSize: 10,
                    margin: -4,
                  }}
                >
                  {unreadNotifications}
                </div>
              )}
            </Button>
          )}
          <div
            style={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <StyledDropdown className="dropdown ">
              <div className="d-flex justify-content-end align-items-center gap-3">
                <button
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenu2222"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i
                    style={{ color: "white" }}
                    className="bi bi-three-dots"
                  ></i>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenu2222"
                >
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={href({
                        widgetSrc: "${config_account}/widget/app",
                        params: {
                          page: "inspect",
                          widgetPath: routes[page].path,
                        },
                      })}
                      type="icon"
                      variant="outline"
                      className="d-flex align-tiems-center gap-2"
                    >
                      <i className="bi bi-code"></i>
                      <span>View source</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`/edit/${routes[page].path}`}
                      type="icon"
                      variant="outline"
                      className="d-flex align-items-center gap-2"
                    >
                      <i className="bi bi-pencil"></i>
                      <span>Edit code</span>
                    </Link>
                  </li>
                </ul>
              </div>
            </StyledDropdown>
            {context.accountId ? (
              <Widget
                src="${config_account}/widget/components.buttons.UserDropdown"
                loading=""
                props={props}
              />
            ) : (
              <Button
                variant="primary"
                linkClassName="d-flex"
                href="${alias_gateway_url}/join"
                noLink={true}
                className="w-100"
              >
                Sign In
              </Button>
            )}
            <TestBtn />
          </div>
        </Right>
        <MobileNavigation>
          <Link
            to={href({
              widgetSrc: "${config_account}/widget/app",
              params: {
                page: "home",
              },
            })}
          >
            <img
              className="object-fit-cover"
              onClick={() => setDropdown(false)}
              src="https://ipfs.near.social/ipfs/bafkreifotevq6g6ralhvutlcssaasa7xbfjjc6mbo5hlnvgpxxgfmwswmq"
              style={{ height: 40 }}
              alt="BuildDAO"
            />
          </Link>
          <div className="d-flex align-items-center gap-2">
            {context.accountId && (
              <Button
                className="rounded-3 position-relative"
                type="icon"
                href={href({
                  widgetSrc: "${config_account}/widget/app",
                  params: {
                    page: "notifications",
                  },
                })}
              >
                <i className="bi bi-bell"></i>
                {unreadNotifications > 0 && (
                  <div
                    className="position-absolute d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{
                      top: 0,
                      background: "red",
                      borderRadius: "100%",
                      right: 0,
                      width: 18,
                      height: 18,
                      fontSize: 10,
                      margin: -4,
                    }}
                  >
                    {unreadNotifications}
                  </div>
                )}
              </Button>
            )}
            <Button
              type="icon"
              className="rounded-2 border-0"
              onClick={toggleDropdown}
            >
              <i style={{ fontSize: 24 }} className="bi bi-list"></i>
            </Button>
          </div>
        </MobileNavigation>
      </MainContent>

      {dropdown && (
        <MobileView>
          <MobileNavigation>
            <Link
              to={href({
                widgetSrc: "${config_account}/widget/app",
                params: {
                  page: "home",
                },
              })}
            >
              <img
                onClick={() => setDropdown(false)}
                src="https://ipfs.near.social/ipfs/bafkreifotevq6g6ralhvutlcssaasa7xbfjjc6mbo5hlnvgpxxgfmwswmq"
                style={{ height: 40 }}
                alt="BuildDAO"
              />
            </Link>
            <Button
              type="icon"
              variant="outline"
              className="rounded-2 border-0"
              onClick={toggleDropdown}
            >
              <i style={{ fontSize: 24 }} className="bi bi-list"></i>
            </Button>
          </MobileNavigation>
          <MobileContent>
            <NavLinks>
              {routes &&
                (Object.keys(routes) || []).map((k) => {
                  const route = routes[k];
                  if (route.hide) {
                    return null;
                  }
                  return (
                    <Link
                      key={`mobile=${k}`}
                      style={{ textDecoration: "none" }}
                      to={href({
                        widgetSrc: "${config_account}/widget/app",
                        params: {
                          page: k,
                        },
                      })}
                    >
                      <span
                        onClick={toggleDropdown}
                        key={k}
                        className={page === k ? "active" : null}
                      >
                        {route.init.icon && <i className={route.init.icon}></i>}
                        {route.init.name}
                      </span>
                    </Link>
                  );
                })}
            </NavLinks>
            <div className="d-flex flex-column gap-2 w-100">
              <div className="d-flex gap-2">
                <Button
                  linkClassName="d-flex w-100"
                  className="w-100"
                  href={href({
                    widgetSrc: "${config_account}/widget/app",
                    params: {
                      page: "inspect",
                      widgetPath: routes[page].path,
                    },
                  })}
                >
                  <span>View source</span>
                </Button>
                <Button
                  linkClassName="d-flex w-100"
                  className="w-100"
                  href={`/edit/${routes[page].path}`}
                >
                  Edit Code
                </Button>
              </div>
              <div className="d-flex gap-2">
                {context.accountId ? (
                  <div className="mx-auto d-flex align-items-stretch ">
                    <Widget
                      src="${config_account}/widget/components.buttons.UserDropdown"
                      loading=""
                      props={props}
                    />
                  </div>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      linkClassName="d-flex"
                      href="${alias_gateway_url}/join"
                      noLink={true}
                      className="w-100"
                      onClick={() => setDropdown(false)}
                    >
                      Sign In
                    </Button>
                  </>
                )}
                <TestBtn />
              </div>
            </div>
          </MobileContent>
        </MobileView>
      )}
    </NavContainer>
  );
}

return <Navbar {...props} />;
