const { TEMPLATES } = VM.require("${config_account}/widget/feed.templates") || {
  TEMPLATES: {},
};

const { Post } = VM.require("${config_account}/widget/components.Index") || {
  Post: () => <></>,
};

const config = {
  theme: {},
  layout: {
    src: "${alias_devs}/widget/Layout",
    props: {
      variant: "sidebar",
    },
  },
  blocks: {
    // these get passed to the layout and children
    Header: () => <></>,
    Sidebar: () => (
      <Widget
        src="${config_account}/widget/components.Sidebar"
        props={{
          routes: config.router.routes,
          currentRoute: "/${config_index}?page=activity",
          ...props,
        }}
      />
    ),
    Footer: () => <></>,
  },
  router: {
    param: "tab",
    routes: {
      all: {
        path: "${config_account}/widget/components.Feed",
        blockHeight: "final",
        init: {
          feedName: "All",
          name: "All",
          icon: "bi-list",
          requiredHashtags: ["build"],
        },
        default: true,
      },
      updates: {
        path: "${config_account}/widget/components.Feed",
        blockHeight: "final",
        init: {
          feedName: "Updates",
          name: "Updates",
          icon: "bi-bell",
          requiredHashtags: ["build", "update"],
          template: TEMPLATES.updates,
        },
      },
      question: {
        path: "${config_account}/widget/components.Feed",
        blockHeight: "final",
        init: {
          feedName: "Question",
          name: "Question",
          icon: "bi-question-lg",
          requiredHashtags: ["build", "question"],
          template: TEMPLATES.question,
        },
      },
      idea: {
        path: "${config_account}/widget/components.Feed",
        blockHeight: "final",
        init: {
          feedName: "Idea",
          name: "Idea",
          icon: "bi-lightbulb",
          requiredHashtags: ["build", "idea"],
          template: TEMPLATES.idea,
        },
      },
      feedback: {
        path: "${config_account}/widget/components.Feed",
        blockHeight: "final",
        init: {
          feedName: "Feedback",
          name: "Feedback",
          icon: "bi-chat-left-text",
          requiredHashtags: ["build", "feedback"],
        },
      },
      events: {
        path: "${config_account}/widget/components.events.Calendar",
        blockHeight: "final",
        init: {
          feedName: "Events",
          name: "Events",
          icon: "bi-calendar",
          app: "every",
          thing: "event",
        },
      },
      bookmarks: {
        path: "${config_account}/widget/components.OrderedGraphFeed",
        blockHeight: "final",
        init: {
          feedName: "Bookmarks",
          name: "Bookmarks",
          icon: "bi-bookmark",
          itemType: "bookmark",
          renderItem: (item) => {
            return (
              <Post
                accountId={item.accountId}
                blockHeight={item.blockHeight}
                noBorder={true}
                hideComments={true}
              />
            );
          },
        },
      },
      request: {
        path: "${config_account}/widget/components.Feed",
        blockHeight: "final",
        init: {
          feedName: "Request",
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
          template: TEMPLATES.request,
        },
      },
      proposals: {
        path: "${config_account}/widget/page.proposals.Index",
        blockHeight: "final",
        init: {
          feedName: "Proposals",
          name: "Proposals",
          icon: "bi-file-earmark-text",
          daoId: "build.sputnik-dao.near",
        },
      },
    },
  },
};

return (
  <div className="mt-3 container-xl">
    <Widget src="${alias_every}/widget/app.view" props={{ config, ...props }} />
  </div>
);
