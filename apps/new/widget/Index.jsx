const { CSS } = VM.require("${config_account}/widget/css") || {
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
        path: "${config_account}/widget/page.home.index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      projects: {
        path: "${config_account}/widget/page.projects.index",
        blockHeight: "final",
        init: {
          name: "Projects",
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
