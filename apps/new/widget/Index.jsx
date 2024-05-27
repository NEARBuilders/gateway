const { CSS } = VM.require("${config_account}/widget/CSS") || {
  CSS: () => <></>,
};

const { Footer } = VM.require("${config_account}/widget/Components.Footer") || {
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
        path: "${config_account}/widget/Page.Home.Index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      projects: {
        path: "${config_account}/widget/Page.Projects.Index",
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
