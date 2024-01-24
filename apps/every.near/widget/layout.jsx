const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

// Define the new component that follows the AppLayout pattern
function AppLayout({ Header, Footer, children }) {
  Header = Header ?? <></>;
  Footer = Footer ?? <></>;

  return (
    <>
      <Container>
        <Header />
        <ContentContainer>{children}</ContentContainer>
        <Footer />
      </Container>
    </>
  );
}

return { AppLayout };
