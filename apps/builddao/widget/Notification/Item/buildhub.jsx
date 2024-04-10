const { value } = props;

return (
  <Widget
    src="${alias_mob}/widget/Notification.Item.LR"
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
      ...props,
    }}
  />
);
