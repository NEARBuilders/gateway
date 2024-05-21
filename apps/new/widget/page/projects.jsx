const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;

  h1 {
    color: #fff;
    font-family: Poppins, sans-serif;
    font-size: 40px;
    line-height: 120%; /* 48px */
    letter-spacing: -1.6px;
    margin: 0;
  }
`;

return (
  <div>
    <Header>
      <div>
        <h1>Projects</h1>
      </div>
    </Header>
  </div>
);
