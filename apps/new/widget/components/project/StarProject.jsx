const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};

const item = props.item;

if (!item) {
  return "";
}

useEffect(() => {
  State.update({ hasStar: null });
}, [item]);

const stars = Social.index("star", item);
const dataLoading = stars === null;

const starsByUsers = {};

(stars || []).forEach((star) => {
  if (star.value.type === "star") {
    starsByUsers[star.accountId] = star;
  } else if (star.value.type === "unstar") {
    delete starsByUsers[star.accountId];
  }
});

if (state.hasStar === true) {
  starsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.hasStar === false) {
  delete starsByUsers[context.accountId];
}

const accountsWithStars = Object.keys(starsByUsers);
const hasStar = context.accountId && !!starsByUsers[context.accountId];

const starClick = (event) => {
  event.stopPropagation();
  event.preventDefault();
  if (state.loading || dataLoading || !context.accountId) {
    return;
  }
  State.update({
    loading: true,
  });
  const type = hasStar ? "unstar" : "star";
  const data = {
    index: {
      star: JSON.stringify({
        key: item,
        value: {
          type,
        },
      }),
    },
  };

  if (item.type === "social" && typeof item.path === "string") {
    const keys = item.path.split("/");
    if (keys.length > 0) {
      data.graph = {
        star: {},
      };
      let root = data.graph.star;
      keys.slice(0, -1).forEach((key) => {
        root = root[key] = {};
      });
      root[keys[keys.length - 1]] = hasStar ? null : "";
    }
  }

  if (!hasStar && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type,
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ loading: false, hasStar: !hasStar }),
    onCancel: () => State.update({ loading: false }),
  });
};

const title = hasStar
  ? props.titleUnstar ?? "Unstar"
  : props.titleStar ?? "Star";

const inner = (
  <div className="d-inline-flex align-items-center">
    <Button
      disabled={state.loading || dataLoading || !context.accountId}
      title={!props.tooltip ? title : undefined}
      onClick={starClick}
      className={"rounded-2"}
      variant={hasStar ? "primary" : "outline"}
      type={"icon"}
    >
      <i className={`bi ${hasStar ? "bi-star-fill" : "bi-star"}`}></i>
    </Button>
  </div>
);

return props.tooltip ? (
  <OverlayTrigger
    placement={props.overlayPlacement ?? "auto"}
    overlay={<Tooltip>{title}</Tooltip>}
  >
    {inner}
  </OverlayTrigger>
) : (
  inner
);
