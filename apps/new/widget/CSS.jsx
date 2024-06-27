const CSS = styled.div`
  min-height: 100vh;

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

  /* Fix compose */
  --bg-2: #23242b;

  /* Typeahead Fix */
  .rbt-token-removeable {
    background: #007bff;
    color: #fff;
  }

  .rbt-input-multi {
    padding: 12px !important;
  }

  .placeholder-glow {
    background: var(--bg-1, black);
  }

  .content {
    background: var(--bg-1, #000);

    .main {
      min-width: 0;
    }
  }
`;

return { CSS };
