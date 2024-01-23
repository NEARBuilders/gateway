const { Button } = VM.require("buildhub.near/widget/components");

const navigation = props.navigation
const requestSignIn = props.requestSignIn
const isSignedIn = context.accountId.length !== null

const MobileLink = styled("Link")`
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
`;

const MobileDropdownButton = styled.button`
  all: unset;

  color: #fff;
  padding: 0.5rem;
  font-size: 2rem;
`;

const [dropdown, setDropdown] = useState(false);

const toggleDropdown = useCallback(() => {
  setDropdown((prev) => !prev);
}, []);

return (
  <>
    <div className="d-block d-md-none">
      <MobileDropdownButton onClick={toggleDropdown}>
        <i className={`bi ${dropdown ? "bi-x" : "bi-list"}`}></i>
      </MobileDropdownButton>
    </div>
    <div
      className={`d-md-none ${dropdown ? "d-flex" : "d-none"
        } w-100 flex-column gap-3 text-white position-absolute start-50 top-100 shadow`}
      style={{
        transform: "translateX(-50%)",
        background: "#0b0c14",
        padding: "24px 48px",
        zIndex: 5,
        borderBottom: "1px solid var(--Stroke-color, rgba(255, 255, 255, 0.20))"
      }}
    >
      {navigation.map(({ href, label }) => { 
        const isActive = window.location.pathname === href 

        return (
          <MobileLink
            to={href}
            className={isActive && "active"}
          >
            {label}
          </MobileLink>
        )
      })}
      {isSignedIn ?
        <div>
          <Widget
            src="buildhub.near/widget/components.buttons.JoinNow"
                config={{
              redirectMap,
            }}
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
          />
        </div>
        : (
          <button className="sign-in my-3" onClick={requestSignIn}>
            Sign In
          </button>
        )
      }
    </div>
  </>
)