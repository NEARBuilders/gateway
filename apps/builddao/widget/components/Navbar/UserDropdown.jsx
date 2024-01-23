const { LogoutIcon } = VM.require("buildhub.near/widget/components.Icons.LogoutIcon")
const { UserIcon } = VM.require("buildhub.near/widget/components.Icons.UserIcon")
const { Button } = VM.require("buildhub.near/widget/components")

const logout = props.logout
const accountId = context.accountId

const StyledDropdown = styled.div`
  button,
  a {
    font-weight: var(--font-weight-medium);
  }
  .dropdown-toggle {
    display: flex;
    align-items: center;
    text-align: left;
    background-color: var(--slate-dark-5);
    border-radius: 50px;
    outline: none;
    border: 0;

    &:after {
      margin: 0 15px;
      border-top-color: var(--slate-dark-11);
    }

    img {
      border-radius: 50% !important;
    }

    .profile-info {
      margin: 5px 10px;
      line-height: normal;
      max-width: 140px;

      .profile-name,
      .profile-username {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .profile-name {
        color: var(--slate-dark-12);
      }
      .profile-username {
        color: var(--slate-dark-11);
      }
    }
  }

  ul {
    background-color: var(--slate-dark-5);
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
        min-width: 24px;
        path {
          stroke: var(--slate-dark-9);
        }
      }
    }
  }
`;

  // const withdrawStorage = useCallback(async () => {
  //   await near.contract.storage_withdraw({}, undefined, "1");
  // }, [near]);
  // const [showPretendModal, setShowPretendModal] = useState(false);
  // const [showMobileQR, setShowMobileQR] = useState(false);

  return (
    <>
      <StyledDropdown className="dropdown">
        <button
          className="dropdown-toggle"
          type="button"
          id="dropdownMenu2222"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId,
              className: "d-inline-block",
              style: { width: "40px", height: "40px" },
            }}
          />
          <div className="profile-info">
            <div className="profile-name">
              <Widget src="patrick.near/widget/ProfileName" />
            </div>
            <div className="profile-username">{accountId}</div>
          </div>
        </button>
        <ul
          className="dropdown-menu"
          aria-labelledby="dropdownMenu2222"
          style={{ minWidth: "fit-content" }}
        >
          <li>
            <Link     
              className="dropdown-item"
              type="button"
              to={`near/widget/ProfilePage?accountId=${accountId}`}
            >
              <UserIcon />
              My Profile
            </Link>
          </li>
          {/* <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => withdrawStorage()}
            >
              <Withdraw />
              Withdraw {props.availableStorage.div(1000).toFixed(2)}kb
            </button>
          </li> */}
          {/* {account.pretendAccountId ? (
            <li key="pretend">
              <button
                className="dropdown-item"
                type="button"
                disabled={!account.startPretending}
                onClick={() => account.startPretending(undefined)}
              >
                <StopPretending />
                Stop pretending
              </button>
            </li>
          ) : (
            <li key="stop-pretend">
              <button
                className="dropdown-item"
                type="button"
                onClick={() => setShowPretendModal(true)}
              >
                <Pretend />
                Pretend to be another account
              </button>
            </li>
          )} */}
          {/* <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={() => setShowMobileQR(true)}
            >
              <QR />
              Mobile Sign-in QR
            </button>
          </li>
           */}
           <li>
            <button
              className="dropdown-item"
              type="button"
              onClick={logout}
            >
              <LogoutIcon />
              Sign Out
            </button>
          </li>
        </ul>
      </StyledDropdown>
      {/* <PretendModal
        show={showPretendModal}
        onHide={() => setShowPretendModal(false)}
        widgets={props.widgets}
      />
      <MobileQRModal
        show={showMobileQR}
        onHide={() => setShowMobileQR(false)}
      /> */}
    </>
  );
