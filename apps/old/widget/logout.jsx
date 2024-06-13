const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const LogoutContainer = styled.div`
  background-color: #000000;
  color: #fff;
  height: 100vh;

  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  /* img {
    width: 100%;
    max-height: 100vh;
    object-fit: cover;
    object-position: center top;
    position: absolute;
    top: 0%;
    left: 50%;
    transform: translateX(-50%);
  } */

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
      font-weight: 500;
      line-height: 100%; /* 32px */
    }

    /* button {
      all: unset;
      cursor: pointer;
      display: flex;
      padding: 16px 20px;
      justify-content: center;
      align-items: center;
      gap: 4px;
      align-self: stretch;

      border-radius: 8px;
      background: #eca227;

      &:hover {
        background: #e49b48;
      }

      color: var(--black-100, #000);

      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    } */
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

const LogoutView = () => {
  return (
    <LogoutContainer>
      {/* <div className="card">
        <img
          src="https://ipfs.near.social/ipfs/bafkreihbwho3qfvnu4yss3eh5jrx6uxhrlzdgtdjyzyjrpa6odro6wdxya"
          alt="Build DAO Logo"
        />
        <button onClick={props.logOut}>Sign Out</button>
      </div>
      <img
        src="https://ipfs.near.social/ipfs/bafybeibqnkvafyflci4iap73prugmjw4wlwmrazbiudvnsyr34yzmk75i4"
        alt="Preview of Profiles"
      /> */}
      <TopImage src="https://ipfs.near.social/ipfs/bafkreielasf3vjasnx2hfnjjbhcl7gd37f33ideteqekflo4exrwm7jjvm" />
      <div className="card">
        <img
          src="https://ipfs.near.social/ipfs/bafkreidij5nptpfck3xcppnp6qg6qqeq6lwgf2egyup44hxhgvx6bjnw5e"
          alt="Build DAO Logo"
        />
        <Button
          style={{
            padding: "8px 20px",
            width: "200px",
          }}
          variant="primary"
          onClick={props.logOut}
        >
          Sign Out
        </Button>
      </div>
      <BottomImage src="https://ipfs.near.social/ipfs/bafkreigsfqkniqq5le4e7dawmibmy3qpoo7bz6ldmuhdgzoqmbckda7nty" />
    </LogoutContainer>
  );
};

return <LogoutView />;
