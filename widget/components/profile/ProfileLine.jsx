const accountId = props.accountId;
const hideAccountId = props.hideAccountId;
const hideName = props.hideName;
const hideImage = props.hideImage;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !!props.fast || (!props.profile && accountId);

const name = profile.name ?? accountId;
const title = props.title ?? `${name} @${accountId}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

const { href } = VM.require("${alias_devs}/widget/lib.url") || {
  href: () => {},
};

let inner = (
  <>
    {!hideImage && (
      <Widget
        key="image"
        src="${alias_mob}/widget/ProfileImage"
        props={{
          fast,
          style: { width: "1.5em", height: "1.5em", marginRight: "0.1em" },
          profile,
          accountId,
          className: "d-inline-block",
          imageClassName: "rounded w-100 h-100 align-top",
        }}
      />
    )}
    {!hideAccountId && (
      <span key="accountId" className="ms-1">
        @{accountId}
      </span>
    )}
  </>
);

inner = (
  <Link
    href={href({
      widgetSrc: "${config_index}",
      params: {
        page: "profile",
        accountId,
      },
    })}
    style={{ color: "var(--font-color, #fff)" }}
    className="text-white text-truncate d-inline-flex"
  >
    {inner}
  </Link>
);

if (props.tooltip === true) {
  return (
    <Widget
      src="${alias_mob}/widget/Profile.OverlayTrigger"
      props={{ accountId, children: inner }}
    />
  );
}
if (tooltip) {
  inner = (
    <OverlayTrigger placement="auto" overlay={<Tooltip>{tooltip}</Tooltip>}>
      {inner}
    </OverlayTrigger>
  );
}

return inner;
