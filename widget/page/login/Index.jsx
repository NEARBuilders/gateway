const { Button } = VM.require("${config_account}/widget/components.Index") || {
  Button: () => <></>,
};

const { gatewayOrigin } = VM.require("${config_account}/widget/lib.gateway");

const LoginContainer = styled.div`
  background-color: #000000;
  color: #fff;
  height: 100vh;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  .card {
    z-index: 5;
    background: transparent;
    display: flex;
    max-width: 500px;
    width: 100%;
    max-height: 550px;
    padding: 80px 24px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    img {
      width: auto;
      height: 54px;
      object-fit: cover;
    }

    h1 {
      color: var(--white-100, #fff);
      text-align: center;

      /* H1/small */
      font-size: 2rem;
      font-style: normal;
      font-weight: 300;
      line-height: 100%; /* 32px */

      span {
        font-weight: 600;
      }
    }
  }
`;

const TopImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  object-fit: cover;
  object-position: center top;
`;

const BottomImage = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  opacity: 0.3;
  object-fit: cover;
  object-position: center bottom;
`;

const LoginView = () => {
  return (
    <LoginContainer>
      <TopImage src="https://ipfs.near.social/ipfs/bafkreielasf3vjasnx2hfnjjbhcl7gd37f33ideteqekflo4exrwm7jjvm" />
      <div className="card">
        <img
          src="https://ipfs.near.social/ipfs/bafkreidij5nptpfck3xcppnp6qg6qqeq6lwgf2egyup44hxhgvx6bjnw5e"
          alt="Build DAO Logo"
        />
        <h1>
          Designed to <span> connect and empower builders </span>in a
          multi-chain ecosystem
        </h1>
        {gatewayOrigin && gatewayOrigin.includes("${alias_web4_url}") ? (
          <Wallet
            provides={({ signOut }) => (
              <Button
                style={{
                  padding: "8px 20px",
                  width: "200px",
                }}
                variant="primary"
                onClick={signOut}
              >
                Login
              </Button>
            )}
          />
        ) : (
          <Button
            style={{
              padding: "8px 20px",
              width: "200px",
            }}
            variant="primary"
            onClick={props.requestSignIn}
          >
            Login
          </Button>
        )}
      </div>
      <BottomImage src="https://ipfs.near.social/ipfs/bafkreigsfqkniqq5le4e7dawmibmy3qpoo7bz6ldmuhdgzoqmbckda7nty" />
    </LoginContainer>
  );
};

return <LoginView />;
