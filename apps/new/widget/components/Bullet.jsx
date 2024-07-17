const StyledBullet = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 12px;
  font-family: Aeonik, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 8px;
`;

function Bullet({ children, variant }) {
  const defaultVariant = variant || "default";

  return (
    <StyledBullet variant={defaultVariant}>
      {children}
    </StyledBullet>
  );
}

return { Bullet };
