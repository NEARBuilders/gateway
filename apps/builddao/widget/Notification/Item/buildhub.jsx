const { value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <Widget
          src="buildhub.near/widget/Notification.Item.Left"
          props={{ ...value }}
        />
      ),
      R: (
        <Widget
          src="buildhub.near/widget/Notification.Item.Right"
          props={{ ...value }}
        />
      ),
      ...props
    }}
  />
);
