const { Modal } = VM.require("${config_account}/widget/components") || {
  Modal: () => <></>,
};

const showModal = props.showModal;
const toggleModal = props.toggleModal;
const toggle = props.toggle;
const theme = props.theme || "dark";
const filters = props.filters;
const setFilters = props.setFilters;

return (
  <Modal
    open={showModal}
    title={"Filter Events"}
    onOpenChange={toggleModal}
    toggle={toggle}
    theme={theme}
  >
    <Widget
      src="${config_account}/widget/components.modals.event.Filters"
      loading=""
      props={{
        theme,
        toggleModal,
        filters,
        setFilters,
      }}
    />
  </Modal>
);
