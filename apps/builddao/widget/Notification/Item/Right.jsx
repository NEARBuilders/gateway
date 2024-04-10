const { href } = VM.require("${config_account}/widget/lib.url") || {
  href: () => {}
};

if (!props.type) {
  return "Loading ...";
}

return (
  <a
    className="fw-bold text-muted"
    href={href({
      widgetSrc: props.widget,
      params: {
        page: props.page,
        proposalId: props.params.proposalId,
        tab: props.params.tab,
        daoId: props.params.daoId
      }
    })}
  >
    View
  </a>
);
