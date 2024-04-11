const { SidebarLayout } = VM.require(
  "${config_account}/widget/template.SidebarLayout",
) || {
  SidebarLayout: () => <></>,
};

const daoName = "Build DAO";
const feedLink = "https://nearbuilders.org/feed";

const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "standard",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => <></>,
    Footer: () => <></>, // customize your footer
  },
  router: {
    param: "tab",
    routes: {
      request: {
        path: "${config_account}/widget/Feed",
        blockHeight: "final",
        init: {
          name: "Request",
          icon: "bi-file-earmark-text",
          requiredHashtags: ["build", "request"],
          customActions: [
            {
              type: "modal",
              icon: "bi-file-earmark-text",
              label: "Propose",
              onClick: (modalToggles) => {
                const toggle = modalToggles.propose;
                toggle();
              },
            },
          ],
          template: `## REQUEST TITLE
(posted via [${daoName} Gateway](${feedLink}?tab=request))

#### Description
[Detailed description of what the proposal is about.]

#### Why This Proposal?
[Explanation of why this proposal is necessary or beneficial.]
`,
        },
        default: true,
      },
      proposals: {
        path: "${config_account}/widget/Proposals",
        blockHeight: "final",
        init: {
          name: "Proposals",
          icon: "bi-file-earmark-text",
          daoId: "build.sputnik-dao.near",
        },
      },
    },
  },
};

const Root = styled.div``;

return (
  <Root>
    <SidebarLayout
      currentPath={"/${config_account}/widget/app?page=proposal"}
      page={props.tab}
      routes={config.router.routes}
    >
      <Widget
        src="${config_account}/widget/app.view"
        props={{ config, ...props }}
      />
    </SidebarLayout>
  </Root>
);
