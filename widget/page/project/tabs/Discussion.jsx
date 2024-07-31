const { Feed } = VM.require("${alias_devs}/widget/Feed") ?? {
  Feed: () => <></>,
};
const { Post } = VM.require("${config_account}/widget/components.Index") || {
  Post: () => <></>,
};
const { getProjectMeta } = VM.require(
  "${config_account}/widget/lib.projects",
) || {
  getProjectMeta: () => {},
};

const { id } = props;

const project = getProjectMeta(id);
const { projectAccountId } = project;

return (
  <div className="mt-3">
    <Widget
      loading={
        <div
          className="placeholder-glow h-100 w-100"
          style={{ height: 400 }}
        ></div>
      }
      src="${config_account}/widget/components.Compose"
      props={{
        draftKey: id + "_discussions",
      }}
    />
    <Feed
      index={[
        {
          action: "post",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: [projectAccountId],
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
        {
          action: "repost",
          key: "main",
          options: {
            limit: 10,
            order: "desc",
            accountId: [projectAccountId],
          },
          cacheOptions: {
            ignoreCache: true,
          },
        },
      ]}
      Item={(p) => (
        <Post
          accountId={p.accountId}
          blockHeight={p.blockHeight}
          noBorder={true}
          currentPath={`/${config_index}?page=activity`}
        />
      )}
    />
  </div>
);
