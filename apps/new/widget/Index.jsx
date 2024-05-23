const { CSS } = VM.require("${config_account}/widget/components.css") || {
  CSS: () => <></>,
};

const { Footer } = VM.require("${config_account}/widget/components.footer") || {
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
    <Widget
      src="${config_account}/widget/app.view"
      props={{ config, ...props }}
    />
  </CSS>
);
