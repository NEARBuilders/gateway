const { Feed } = VM.require("${alias_devs}/widget/Feed") ?? {
  Feed: () => <></>,
};
const { Post } = VM.require("${alias_old}/widget/components") || {
  Post: () => <></>,
};
const { getProjectMeta } = VM.require(
  "${alias_new}/widget/lib.projects",
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
      src="${alias_old}/widget/Compose"
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
          currentPath={`/${alias_old}/widget/app?page=feed`}
        />
      )}
    />
  </div>
);
