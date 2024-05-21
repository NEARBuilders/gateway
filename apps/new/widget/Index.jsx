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

const poppinsCss = fetch(
  "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap",
).body;

const CSS = styled.div`
  ${poppinsCss}
`;

return (
  <CSS>
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
