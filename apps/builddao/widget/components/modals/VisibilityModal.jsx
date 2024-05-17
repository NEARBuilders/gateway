const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  place-items: center;
  overflow-y: auto;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: var(--modal-overlay-color, rgba(35, 36, 43, 0.7));
`;

function VisibilityModal({
  children,
  title,
  open,
  onOpenChange,
  toggle,
  toggleContainerProps,
  key,
  hideCloseBtn,
  disableOutsideClick,
  theme,
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Overlay asChild>
        <Overlay key={`Overlay-${key}`}>
          <Dialog.Content>{children}</Dialog.Content>
        </Overlay>
      </Dialog.Overlay>
    </Dialog.Root>
  );
}

return { VisibilityModal };
