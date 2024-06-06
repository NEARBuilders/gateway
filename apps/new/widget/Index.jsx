const { CSS } = VM.require("${config_account}/widget/CSS") || {
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
    Header: () => (
      <Widget
        src="${config_account}/widget/components.Navbar"
        props={{
          routes: config.router.routes,
          ...props,
        }}
      />
    ),
    Footer: () => <Footer />,
  },
  router: {
    param: "page",
    routes: {
      home: {
        path: "${config_account}/widget/page.home.Index",
        blockHeight: "final",
        init: {
          name: "Home",
        },
        default: true,
      },
      activity: {
        path: "${config_account}/widget/page.activity.Index",
        blockHeight: "final",
        init: {
          name: "Activity",
        },
      },
      projects: {
        path: "${config_account}/widget/page.projects.Index",
        blockHeight: "final",
        init: {
          name: "Projects",
        },
      },
      project: {
        path: "${config_account}/widget/page.project.Index",
        blockHeight: "final",
        init: {
          name: "Project",
        },
        hide: true,
      },
      resources: {
        path: "${config_account}/widget/page.resources.Index",
        blockHeight: "final",
        init: {
          name: "Resources",
        },
      },
      notifications: {
        path: "${config_account}/widget/page.notifications.Index",
        blockHeight: "final",
        init: {
          name: "Notifications",
        },
        hide: true,
      },
      post: {
        path: "${config_account}/widget/page.post.Index",
        blockHeight: "final",
        init: {
          name: "Post",
        },
        hide: true,
      },
      comment: {
        path: "${config_account}/widget/page.comment.Index",
        blockHeight: "final",
        init: {
          name: "Comment",
        },
        hide: true,
      },
    },
  },
};

return (
  <CSS>
    <Widget src="${alias_old}/widget/app.view" props={{ config, ...props }} />
  </CSS>
);
