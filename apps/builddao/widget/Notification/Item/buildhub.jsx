const { value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <Widget
          src="buildhub.near/widget/notification.Item.Left"
          props={{ ...value }}
        />
      ),
      R: (
        <Widget
          src="buildhub.near/widget/notification.Item.Right"
          props={{ ...value }}
        />
      ),
      ...props
    }}
  />
);
