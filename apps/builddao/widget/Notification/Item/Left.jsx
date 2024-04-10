const { href } = VM.require("${config_account}/widget/lib.url") || {
  href: () => {}
};

if (!props.type) {
  return "Loading ...";
}

return <>{props.message}</>;
