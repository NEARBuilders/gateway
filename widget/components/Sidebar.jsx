const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};

const routes = props.routes;
const currentRoute = props.currentRoute;
const routeKeys = Object.keys(routes);

function findDefaultRoute(routesObject) {
  const routeKey =
    routesObject &&
    Object.keys(routesObject).find((key) => {
      const route = routesObject[key];
      return route.default === true;
    });

  if (routeKey) {
    return routeKey;
  } else {
    return null;
  }
}

const tab = props.tab ?? findDefaultRoute(routes);

const Sidebar = styled.div`
  display: flex;
  min-width: 259px;
  min-height: 100vh;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  flex-shrink: 0;

  @media screen and (max-width: 768px) {
    flex-direction: row;

    min-height: auto;
    flex-shrink: 0;
    gap: 1rem;
  }

  @media screen and (max-width: 500px) {
    display: none;
  }

  button {
    padding: 10px 12px;
    gap: 12px;
    flex-shrink: 0;
    height: 22px;
    display: flex;
    align-items: center; /* Center items vertically */
    i {
      -webkit-text-stroke: 0.25px;
    }
  }
`;

const RouteLabel = styled.p`
  color: #666;
  font-family: Poppins, sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 140%; /* 19.6px */
  letter-spacing: -0.14px;
  text-transform: uppercase;
  margin: 0;
`;
const Container = styled.div`
  border-radius: 16px;
  border: 1px solid #23242b;
  margin-right: 1rem;
  @media screen and (max-width: 768px) {
    display: flex;
    overflow: scroll;
    scrollbar-width: none;
    align-items: center;
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 500px) {
    border-radius: 16px;
    border: 1px solid #23242b;
    padding: 24px;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`;

const SidebarMobile = styled.div`
  display: none;

  @media screen and (max-width: 500px) {
    display: flex;
    background: black;
    left: ${({ isOpen }) => (isOpen ? "0" : "-100%")};
  }
`;

const Content = styled.div`
  background: #000;
  display: flex;
  min-width: 259px;
  min-height: 100vh;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex-shrink: 0;
`;

const [isOpen, setIsOpen] = useState(false);

const handleButtonClick = () => {
  setIsOpen(false);
};
return (
  <Container>
    <Sidebar>
      {routeKeys.map((route) => {
        const routeObj = routes[route];
        const hasSubRoutes = Object.keys(routeObj.routes || {}).length > 0;
        const isActiveRoute = Object.keys(routeObj.routes || {}).includes(tab);

        return (
          <>
            {routeObj.label && <RouteLabel>{routeObj.label}</RouteLabel>}

            {hasSubRoutes ? (
              <>
                <Button
                  variant={isActiveRoute ? "primary" : "outline"}
                  className="align-self-stretch justify-content-start"
                  data-bs-toggle="collapse"
                  data-bs-target={`#${route}`}
                >
                  <i style={{ width: 16 }} className={routeObj.init.icon}></i>
                  {routeObj.init.name}
                  <i className="bi bi-chevron-down ms-auto"></i>
                </Button>

                <div
                  className={`collapse ${isActiveRoute ? "show" : ""} w-100`}
                  id={route}
                >
                  <div
                    className="d-flex flex-column gap-2 ms-3 ps-2 w-100"
                    style={{ borderLeft: "1px solid rgba(255, 255, 255, 0.2)" }}
                  >
                    {Object.keys(routeObj.routes).map((subRoute) => (
                      <Button
                        href={`${currentRoute}&tab=${subRoute}`}
                        style={{
                          backgroundColor:
                            tab === subRoute ? "#2f2008" : "transparent",
                          fontWeight: 500,
                        }}
                        className="flex-grow-1 justify-content-start"
                        linkClassName="d-flex w-100"
                      >
                        {routeObj.routes[subRoute].init.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              !routeObj.hide && (
                <Button
                  variant={tab === route ? "primary" : "outline"}
                  href={`${currentRoute}&tab=${route}`}
                  className="flex-grow-1 justify-content-start"
                  linkClassName="d-flex w-100"
                >
                  <i style={{ width: 16 }} className={routeObj.init.icon}></i>
                  {routeObj.init.name}
                </Button>
              )
            )}
          </>
        );
      })}
    </Sidebar>
    <SidebarMobile isOpen={isOpen} onClick={() => setIsOpen(false)}>
      <Button
        variant="primary"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasExample"
        aria-controls="offcanvasExample"
        style={{
          width: "70vw",
        }}
      >
        Menu
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-arrow-right"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
          />
        </svg>
      </Button>

      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
        style={{
          background: "black",
          scrollbarWidth: "none",
        }}
      >
        <div class="offcanvas-header">
          <h5
            class="offcanvas-title"
            id="offcanvasExampleLabel"
            style={{
              color: "white",
            }}
          >
            Menu
          </h5>
          <button
            type="button"
            class="btn-close btn-close-white text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <Content>
            {routeKeys.map((route) => {
              const routeObj = routes[route];
              const hasSubRoutes =
                Object.keys(routeObj.routes || {}).length > 0;
              const isActiveRoute = Object.keys(routeObj.routes || {}).includes(
                tab,
              );

              return (
                <>
                  {routeObj.label && <RouteLabel>{routeObj.label}</RouteLabel>}

                  {hasSubRoutes ? (
                    <>
                      <Button
                        variant={isActiveRoute ? "primary" : "outline"}
                        className="align-self-stretch justify-content-start"
                        data-bs-toggle="collapse"
                        data-bs-target={`#${route}`}
                      >
                        <i
                          style={{ width: 16 }}
                          className={routeObj.init.icon}
                        ></i>
                        {routeObj.init.name}
                        <i className="bi bi-chevron-down ms-auto"></i>
                      </Button>

                      <div
                        className={`collapse ${isActiveRoute ? "show" : ""} w-100`}
                        id={route}
                      >
                        <div
                          className="d-flex flex-column gap-2 ms-3 ps-2 w-100"
                          style={{
                            borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
                          }}
                        >
                          {Object.keys(routeObj.routes).map((subRoute) => (
                            <Button
                              href={`${currentRoute}&tab=${subRoute}`}
                              style={{
                                backgroundColor:
                                  tab === subRoute ? "#2f2008" : "transparent",
                                fontWeight: 500,
                              }}
                              className="flex-grow-1 justify-content-start"
                              linkClassName="d-flex w-100"
                            >
                              {routeObj.routes[subRoute].init.name}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    !routeObj.hide && (
                      <Button
                        variant={tab === route ? "primary" : "outline"}
                        href={`${currentRoute}&tab=${route}`}
                        className="flex-grow-1 justify-content-start"
                        linkClassName="d-flex w-100"
                      >
                        <i
                          style={{ width: 16 }}
                          className={routeObj.init.icon}
                        ></i>
                        {routeObj.init.name}
                      </Button>
                    )
                  )}
                </>
              );
            })}
          </Content>
        </div>
      </div>
    </SidebarMobile>
  </Container>
);
