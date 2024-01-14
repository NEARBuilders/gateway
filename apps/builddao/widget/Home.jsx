const ownerId = "/*__@appAccount__*/";

const Root = styled.div`
  background-color: #0b0c14;
  color: #ffffff;
  font-family: Satoshi;

  width: 100%;
`;

const sections = ["Hero", "Goals", "Join", "Governance", "CTA", "Footer"];

return (
  <Root>
    {sections.map((section) => (
      <Widget
        src={`${ownerId}/widget/Section.${section}`}
        key={`Home-Section-${section}`}
      />
    ))}
  </Root>
);
