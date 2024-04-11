const config = {
  theme: {
    // add key values to define colors
    "--main-color": "black",
    "--secondary-color": "white",
    background: "var(--main-color)",
    color: "var(--secondary-color)",
  },
  layout: {
    src: "devs.near/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => (
      // customize your header
      <Widget
        src="${config_account}/widget/components.Navbar"
        props={{ routes: config.router.routes, ...passProps, page: props.page }}
      />
    ),
    Footer: () => <></>, // customize your footer
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
      feed: {
        path: "${config_account}/widget/page.feed",
        blockHeight: "final",
        init: {
          name: "Feed",
        },
      },
      proposal: {
        path: "${config_account}/widget/page.proposal",
        blockHeight: "final",
        init: {
          name: "Proposals",
        },
      },
      resources: {
        path: "${config_account}/widget/page.resources",
        blockHeight: "final",
        init: {
          name: "Resources",
        },
      },
      library: {
        path: "${config_account}/widget/page.library",
        blockHeight: "final",
        init: {
          name: "Library",
        },
      },
      profile: {
        path: "${config_account}/widget/page.profile",
        blockHeight: "final",
        init: {
          name: "Profile",
        },
        hide: true,
      },
      inspect: {
        path: "${config_account}/widget/page.inspect",
        blockHeight: "final",
        init: {
          name: "Inspect",
        },
        hide: true,
      },
      projects: {
        path: "${config_account}/widget/page.project-feed",
        blockHeight: "final",
        init: {
          name: "Project Feed",
        },
        hide: true,
      },
      project: {
        path: "${config_account}/widget/page.project",
        blockHeight: "final",
        init: {
          name: "Project Page",
        },
        hide: true,
      },
    },
  },
};

const Root = styled.div`
  --stroke-color: rgba(255, 255, 255, 0.2);
  --bg-1: #000;
  --bg-1-hover: #010002;
  --bg-1-hover-transparent: rgba(13, 2, 15, 0);
  --bg-2: #23242b;
  --label-color: #fff;
  --font-color: #fff;
  --font-muted-color: #cdd0d5;
  --black: #000;
  --system-red: #fd2a5c;
  --yellow: #eca227;

  --compose-bg: #23242b;

  --post-bg: #23242b;
  --post-bg-hover: #1d1f25;
  --post-bg-transparent: rgba(23, 24, 28, 0);

  --button-primary-bg: #eca227;
  --button-outline-bg: transparent;
  --button-default-bg: #23242b;

  --button-primary-color: #000;
  --button-outline-color: #fff;
  --button-default-color: #fff;

  --button-primary-hover-bg: #e49b48;
  --button-outline-hover-bg: rgba(255, 255, 255, 0.2);
  --button-default-hover-bg: #17181c;

  /* Poppins Font */
  @font-face {
    font-family: "Poppins";
    font-weight: 100;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Thin.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Thin.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Thin.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Thin.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Thin.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 200;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraLight.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraLight.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraLight.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraLight.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraLight.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 300;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Light.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Light.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Light.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Light.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Light.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 400;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Regular.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 500;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Medium.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Medium.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Medium.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Medium.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Medium.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 600;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-SemiBold.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 700;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Bold.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 800;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraBold.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraBold.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraBold.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraBold.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-ExtraBold.ttf")
        format("truetype");
    font-display: swap;
  }
  @font-face {
    font-family: "Poppins";
    font-weight: 900;
    font-style: normal;
    src: url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Black.eot");
    src:
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Black.eot?#iefix")
        format("embedded-opentype"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Black.woff2")
        format("woff2"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Black.woff")
        format("woff"),
      url("https://cdn.jsdelivr.net/gh/webfontworld/Poppins/Poppins-Black.ttf")
        format("truetype");
    font-display: swap;
  }

  /* Inter Font */
  @font-face {
    font-family: InterVariable;
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0")
      format("woff2");
  }
  @font-face {
    font-family: InterVariable;
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url("https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.0")
      format("woff2");
  }

  /* Typeahead Fix */
  .rbt-token-removeable {
    background: #007bff;
    color: #fff;
  }
`;

return (
  <Root>
    <Widget
      src="${config_account}/widget/app.view"
      props={{ config, ...props }}
    />
  </Root>
);
