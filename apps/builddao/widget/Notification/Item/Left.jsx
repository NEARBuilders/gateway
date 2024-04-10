const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {}
};

if (!props.type) {
  return "Loading ...";
}

return <>{props.message}</>;
