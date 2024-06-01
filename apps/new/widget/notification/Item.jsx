const { value } = props;

const loading = <div className="placeholder" style={{ height: "48px" }} />;

const widgetSrc =
  value.type === "follow" || value.type === "unfollow"
    ? "${alias_mob}/widget/Notification.Item.Follow"
    : value.type === "poke"
      ? "${alias_mob}/widget/Notification.Item.Poke"
      : value.type === "like"
        ? "${config_account}/widget/notification.item.Like"
        : value.type === "comment"
          ? "${config_account}/widget/notification.item.Comment"
          : value.type && value.type?.startsWith("devgovgigs/")
            ? "${alias_mob}/widget/Notification.Item.DevGov"
            : value.type === "mention"
              ? "${config_account}/widget/notification.item.Mention"
              : value.type === "repost"
                ? "${config_account}/widget/notification.item.Repost"
                : value.type === "star"
                  ? "${alias_mob}/widget/Notification.Item.Star"
                  : value.type === "chess-game"
                    ? "chess-game.near/widget/Notification.Item.ChessGame@98857466"
                    : null;

return (
  <div className="mb-3">
    {widgetSrc ? (
      <Widget loading={loading} src={widgetSrc} props={{ loading, ...props }} />
    ) : (
      <div>
        Unknown notification:{" "}
        <span className="font-monospace">{JSON.stringify(value)}</span>
      </div>
    )}
  </div>
);
