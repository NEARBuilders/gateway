const { value } = props;

return (
  <Widget
    src="mob.near/widget/Notification.Item.LR"
    props={{
      L: (
        <Widget
          src="${config_account}/widget/notification.Item.Left"
          props={{ ...value }}
        />
      ),
      R: (
        <Widget
          src="${config_account}/widget/notification.Item.Right"
          props={{ ...value }}
        />
      ),
      ...props
    }}
  />
);
