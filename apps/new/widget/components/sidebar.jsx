const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const routes = props.routes;
const currentRoute = props.currentRoute;
const routeKeys = Object.keys(routes);
const tab = props.tab ?? "allProjects";

const Sidebar = styled.div`
  border-radius: 16px;
  border: 1px solid #23242b;
  background: #000;
  display: flex;
  min-width: 259px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;

  button {
    padding: 10px 12px;
    gap: 12px;

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

return (
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
                <i
                  style={{ width: 16, height: 16 }}
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
                <i
                  style={{ width: 16, height: 16 }}
                  className={routeObj.init.icon}
                ></i>
                {routeObj.init.name}
              </Button>
            )
          )}
        </>
      );
    })}
  </Sidebar>
);
