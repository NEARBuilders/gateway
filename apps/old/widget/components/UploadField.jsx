const image = props.image;
const onChange = props.onChange;

State.init({
  origImage: image,
  img: { cid: image.ipfs_cid },
});

if (JSON.stringify(image) !== JSON.stringify(state.image)) {
  State.update({
    image,
  });
}

let localImage = {};

if (state.origImage.ipfs_cid) {
  localImage.ipfs_cid = null;
}
localImage.ipfs_cid = state.img.cid;
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
const onImageChange = debounce((e) => {
  State.update({
    [e.target.id]: e.target.value,
  });
});

const UploadContainer = styled.div`
  display: flex;
  max-width: 390px;
  min-height: 200px;
  width: 100%;
  height: 100%;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;

  border-radius: 16px;
  border: 1px dashed var(--stroke-color, rgba(255, 255, 255, 0.2));
  background: ${(props) =>
    props.background ? "var(--bg-2, #23242B)" : "var(--bg-1, #000000)"};

  p {
    color: var(--font-color, #fff);
    text-align: center;

    /* Body/Medium-16px */
    font-size: 16px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin: 0;
  }

  p.secondary {
    color: var(--font-muted-color, #cdd0d5);
    text-align: center;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 16px; /* 133.333% */
  }

  i {
    color: var(--font-color, #fff);
    font-size: 2rem;
  }
`;
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
    color: ${props.theme === "light" ? "black" : ""};
    border: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));
    &:hover:not(:disabled) {
      background: var(--button-outline-hover-bg, rgba(255, 255, 255, 0.2));
      cursor: pointer;
    }
  }
`;

return (
  <UploadContainer background={background}>
    <i class="bi bi-cloud-upload"></i>
    <div className="d-flex flex-column gap-2">
      <p>Choose a file or drag & drop it here.</p>
      <p className="secondary">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
    </div>
    <Button>
      <IpfsImageUpload image={state.img} />
    </Button>
  </UploadContainer>
);
