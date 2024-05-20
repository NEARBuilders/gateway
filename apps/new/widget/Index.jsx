const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => <></>,
    Footer: () => <></>,
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "${config_account}/widget/home.Home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
    },
  },
};

return (
  <Widget src="buildhub.near/widget/app.view" props={{ config, ...props }} />
);
