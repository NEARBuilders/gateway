const { accountId, blockHeight, value } = props;

const overlayStyle = {
  maxWidth: "30em",
  zIndex: 1070,
  maxHeight: "24em",
  overflow: "hidden",
};

const { content, popup } =
  value.item.path === `${context.accountId}/post/main`
    ? {
        content: (
          <Link
            className="fw-bold text-muted"
            href={`/builddao.near/widget/Index?page=post&accountId=${context.accountId}&blockHeight=${value.item.blockHeight}`}
          >
            post
          </Link>
        ),
        popup: (
          <Widget
            src="mob.near/widget/MainPage.N.Post"
            props={{
              accountId: context.accountId,
              blockHeight: value.item.blockHeight,
              hideComments: true,
            }}
          />
        ),
      }
    : { content: "item???" };

const commentContent = (
  <Link
    className="fw-bold text-muted"
    href={`/builddao.near/widget/Index?page=comment&accountId=${accountId}&blockHeight=${blockHeight}`}
  >
    replied
  </Link>
);

const commentPopup = (
  <Widget
    src="mob.near/widget/MainPage.N.Comment.Full"
    props={{
      accountId,
      blockHeight,
    }}
  />
);

return (
  <Widget
    loading={props.loading}
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          <Widget
            loading={commentContent}
            src="mob.near/widget/N.Common.OverlayTrigger"
            props={{
              overlayStyle,
              popup: commentPopup,
              children: commentContent,
            }}
          />
          to your
          <Widget
            loading={content}
            src="mob.near/widget/N.Common.OverlayTrigger"
            props={{
              overlayStyle,
              popup,
              children: content,
            }}
          />
        </>
      ),
      R: (
        <>
          <Link
            className="btn btn-outline-dark rounded-5"
            href={`/builddao.near/widget/Index?page=comment&accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View comment
          </Link>
        </>
      ),
      ...props,
    }}
  />
);
