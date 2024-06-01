const accountId = props.accountId;
const blockHeight = parseInt(props.blockHeight);

const content = JSON.parse(
  Social.get(`${accountId}/post/comment`, blockHeight) ?? "null",
);

return content?.rootItem ? (
  <Widget src="mob.near/widget/Neddit.Comment.Page" props={props} />
) : (
  <Widget
    src="${config_account}/widget/components.comment.Post"
    props={{ commentsLimit: 30, subscribe: true, ...props }}
  />
);
