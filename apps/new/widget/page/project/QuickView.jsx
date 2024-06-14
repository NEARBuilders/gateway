const showCanvas = props.showCanvas;
const onClose = props.onClose;

const Container = styled.div`
  .offcanvas.offcanvas-end {
    width: 80% !important;
  }
`;

return (
  <div>
    <div
      className={`offcanvas offcanvas-end ${showCanvas ? "show" : ""}`}
      tabIndex="-1"
      id="offcanvasRight"
      aria-labelledby="offcanvasRightLabel"
      style={{ visibility: showCanvas ? "visible" : "hidden" }}
    >
      <div class="offcanvas-header">
        <button
          type="button"
          class="btn-close text-reset h5"
          onClick={onClose}
        ></button>
      </div>
      <div class="offcanvas-body"></div>
    </div>
  </div>
);
