const { accountId, value, blockHeight } = props;

const overlayStyle = {
  maxWidth: "30em",
  zIndex: 1070,
  maxHeight: "24em",
  overflow: "hidden",
};

const { content, popup } =
  value.item.path === `${accountId}/post/main`
    ? {
        content: (
          <Link
            className="fw-bold text-muted"
            href={`/${config_account}/widget/Index?page=post&accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            post
          </Link>
        ),
        popup: (
          <Widget
            src="${alias_mob}/widget/MainPage.N.Post"
            props={{
              accountId,
              blockHeight,
              hideComments: true,
            }}
          />
        ),
      }
    : value.item.path === `${accountId}/post/comment`
      ? {
          content: (
            <Link
              className="fw-bold text-muted"
              href={`/${config_account}/widget/Index?page=comment&accountId=${accountId}&blockHeight=${blockHeight}`}
            >
              comment
            </Link>
          ),
          popup: (
            <Widget
              src="${alias_mob}/widget/MainPage.N.Comment.Full"
              props={{
                accountId,
                blockHeight,
              }}
            />
          ),
        }
      : { content: "item???" };

return (
  <Widget
    loading={props.loading}
    src="${alias_mob}/widget/Notification.Item.LR"
    props={{
      L: (
        <>
          mentioned you in their
          <Widget
            loading={content}
            src="${alias_mob}/widget/N.Common.OverlayTrigger"
            props={{
              overlayStyle,
              popup,
              children: content,
            }}
          />
        </>
      ),
      R:
        value.item.path === `${accountId}/post/main` ? (
          <Link
            className="btn btn-outline-dark rounded-5"
            href={`/${config_account}/widget/Index?page=post&accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View post
          </Link>
        ) : value.item.path === `${accountId}/post/comment` ? (
          <Link
            className="btn btn-outline-dark rounded-5"
            href={`/${config_account}/widget/Index?page=comment&accountId=${accountId}&blockHeight=${blockHeight}`}
          >
            View comment
          </Link>
        ) : (
          ""
        ),
      ...props,
    }}
  />
);
