const { CSS } = VM.require("${config_account}/widget/components.CSS") || {
  CSS: () => <></>,
};

const { Footer } = VM.require("${config_account}/widget/components.Footer") || {
  Footer: () => <></>,
};

const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    Header: () => <Widget src="${alias_old}/widget/components.Navbar" />,
    Footer: () => <Footer />,
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "${config_account}/widget/page.home",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      build: {
        path: "${config_account}/widget/build",
        blockHeight: "final",
        init: {
          name: "Build",
        },
      },
    },
  },
};

return (
  <CSS>
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
