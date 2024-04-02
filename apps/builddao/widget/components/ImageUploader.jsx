const image = props.image;
const onChange = props.onChange;
const { InputField } = VM.require("buildhub.near/widget/components") || {
  InputField: () => <></>,
};

const Tab = {
  Upload: "Upload",
  NFT: "NFT",
  URL: "URL",
};

const origTab = () =>
  image.nft.contractId || image.nft.tokenId
    ? Tab.NFT
    : !image.ipfs_cid && image.url
      ? Tab.URL
      : Tab.Upload;

State.init({
  origImage: image,
  tab: origTab(),
  url: image.url,
  nft: image.nft ?? {},
  img: { cid: image.ipfs_cid },
});

const setTab = (tab) => State.update({ tab });

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
  });
}

let localImage = {};

if (state.origImage.nft.contractId || state.origImage.nft.tokenId) {
  localImage.nft = {};
  if (state.origImage.nft.contractId) {
    localImage.nft.contractId = null;
  }
  if (state.origImage.nft.tokenId) {
    localImage.nft.tokenId = null;
  }
}
if (state.origImage.ipfs_cid) {
  localImage.ipfs_cid = null;
}
if (state.origImage.url) {
  localImage.url = null;
}

if (state.tab === Tab.NFT && (state.nft.contractId || state.nft.tokenId)) {
  localImage.nft = {
    contractId: state.nft.contractId || "",
    tokenId: state.nft.tokenId || "",
  };
} else if (state.tab === Tab.Upload && state.img.cid) {
  localImage.ipfs_cid = state.img.cid;
}
if (state.tab === Tab.URL && state.url) {
  localImage.url = state.url;
}

if (onChange && JSON.stringify(image) !== JSON.stringify(localImage)) {
  onChange(localImage);
}

const debounce = (func, wait) => {
  const pause = wait || 350;
  let timeout;

  return (args) => {
    const later = () => {
      clearTimeout(timeout);
      func(args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, pause);
  };
};

const onNFTChange = debounce((e) => {
  State.update({
    nft: {
      ...state.nft,
      [e.target.id]: e.target.value,
    },
  });
});
const onImageChange = debounce((e) => {
  State.update({
    [e.target.id]: e.target.value,
  });
});

const Button = styled.div`
  .btn {
    all: unset;
    display: inline-flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    line-height: normal;
    font-family: "Poppins", sans-serif;
    transition: all 300ms;
    background: var(--button-outline-bg, transparent);
    color: var(--button-outline-color, #fff);
    border: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
    &:hover:not(:disabled) {
      background: var(--button-outline-hover-bg, rgba(255, 255, 255, 0.2));
      cursor: pointer;
    }
  }
`;

return (
  <div>
    <ul className={`nav nav-tabs`}>
      <li className="nav-item">
        <button
          className={`nav-link ${state.tab === Tab.Upload ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.Upload)}
        >
          Upload
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${state.tab === Tab.NFT ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.NFT)}
        >
          NFT
        </button>
      </li>
      <li className="nav-item">
        <button
          className={`nav-link ${state.tab === Tab.URL ? "active" : ""}`}
          aria-current="page"
          onClick={() => setTab(Tab.URL)}
        >
          URL
        </button>
      </li>
    </ul>
    <div
      className="p-2"
      style={{
        border: "solid 1px #FFFFFF33",
        borderTop: 0,
        borderBottomLeftRadius: ".375rem",
        borderBottomRightRadius: ".375rem",
        minHeight: "9em",
      }}
    >
      <Button
        className={`${state.tab === Tab.Upload ? "" : "visually-hidden"}`}
      >
        <IpfsImageUpload image={state.img} />
      </Button>
      <div
        className={`${
          state.tab === Tab.NFT ? "d-flex flex-column gap-2" : "visually-hidden"
        }`}
      >
        <InputField
          key={"contractId"}
          label={"NFT contract"}
          placeholder={"nft contract id"}
          value={state.nft.contractId}
          onChange={onNFTChange}
        />
        <InputField
          key={"tokenId"}
          label={"NFT token id"}
          placeholder={"nft token id"}
          value={state.nft.tokenId}
          onChange={onNFTChange}
        />
      </div>
      <div
        className={`${
          state.tab === Tab.URL ? "d-flex flex-column gap-2" : "visually-hidden"
        }`}
      >
        <InputField
          key={"url"}
          label={"Image URL"}
          placeholder={"image url"}
          value={state.url}
          onChange={onImageChange}
        />
      </div>
    </div>
  </div>
);
