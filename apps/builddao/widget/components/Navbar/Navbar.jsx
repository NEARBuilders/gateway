const { Button } = VM.require("buildhub.near/widget/components")

const isSignedIn = context.accountId.length > 0

const requestSignIn = props.requestSignIn
const redirectMap = props.redirectMap
const userDropdown = props.userDropdown
const logout = props.logout

const StyledNavbar = styled.div`
  display: flex;
  width: 100%;
  padding: 24px 48px;
  align-items: center;
  justify-content: space-between;

  .logo {
    flex-grow: 1;
    flex-basis: 0;

    img {
      width: auto;
      height: 32px;
      flex-shrink: 0;
      object-fit: cover;
    }
  }

  .active {
    border-radius: 8px;
    background: var(--Yellow, #ffaf51) !important;
    color: var(--black-100, #000) !important;

    /* Other/Button_text */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .sign-in {
    all: unset;

    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;

    border-radius: 8px;
    border: 1px solid var(--white-100, #fff);

    color: var(--white-100, #fff);
    transition: all 300ms;

    &:hover {
      text-decoration: none;
      background: #fff;
      color: #000;
    }

    cursor: pointer;

    /* Other/Button_text */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;


const logoLink =
  "https://ipfs.near.social/ipfs/bafkreihbwho3qfvnu4yss3eh5jrx6uxhrlzdgtdjyzyjrpa6odro6wdxya";

  const navigation = [
    {
      label: "Home",
      href: "/"
    },
    {
      label: "Editor",
      href: "/editor"
    },
    {
      label: "Docs",
      href: "https://docs.near.org/bos"
    },
    {
      label: "Feed",
      href: "/feed"
    },
    {
      label: "Resources",
      href: "/resources"
    },
  ]

  return (
    <div
      style={{
        borderBottom:
          "1px solid var(--Stroke-color, rgba(255, 255, 255, 0.20))",
      }}
    >
      <StyledNavbar className="container-xl position-relative">
        <div className="logo">
          <Link to="/" style={{ all: "unset", cursor: "pointer" }}>
            <img src={logoLink} />
          </Link>
        </div>
        <div className="d-none flex-grow-1 justify-content-center d-md-flex align-items-center gap-3">
          {navigation.map(({ href, label }) => { 
            const isActive = window.location.pathname === href 

            return (
              <Link to={href} style={{ textDecoration: 'none' }}>
                <Button variant={isActive ? "primary" : "secondary"}>
                  {label}
                </Button>
              </Link>
            )
           })}
        </div>
        <div className="d-none d-md-block flex-grow-1" style={{ flexBasis: 0 }}>
          {isSignedIn ?
            <div>
              <Widget
                src="buildhub.near/widget/components.buttons.JoinNow"
                props={{
                  children: (
                    <Widget
                      src="buildhub.near/widget/components.Navbar.UserDropdown"
                      props={{
                        logout
                      }}
                    />
                  ),
                }}
                config={{
                  redirectMap,
                }}
              />
            </div>
            : <button className="sign-in my-3" onClick={props.requestSignIn}>
              Sign In
            </button>}
        </div>        
        <Widget src="buildhub.near/widget/components.Navbar.MobileMenu" props={{ navigation }} />
      </StyledNavbar>
    </div>
  );
