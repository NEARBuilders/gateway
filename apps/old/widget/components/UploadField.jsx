const initialMsg = (
  <>
    <i className="bi bi-cloud-upload"></i>
    <div className="d-flex flex-column gap-2">
      <p>Choose a file or drag & drop it here.</p>
      <p className="secondary">JPEG, PNG, PDF, and MP4 formats, up to 50 MB.</p>
    </div>
  </>
);

const [img, setImg] = useState("");
const [displayText, setDisplayText] = useState(initialMsg);

const SpinningIcon = styled.i`
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
const uploadFile = (files) => {
  setDisplayText(
    <>
      <SpinningIcon className="bi bi-arrow-repeat" />
      <p>Uploading...</p>
    </>,
  );
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: files[0],
  })
    .catch((e) => {
      console.error("Upload error:", e);
      setDisplayText(
        <>
          <i className="bi bi-exclamation-triangle text-danger"></i>
          <p>Failed to upload. Please try again.</p>
        </>,
      );
    })
    .then((res) => {
      setImg(res.body.cid);
      if (props.onChange) {
        props.onChange({
          ipfs_cid: res.body.cid,
        });
      }
      if (res.body.cid) {
        setDisplayText(
          <>
            <i className="bi bi-check-circle text-success"></i>
            <p>Upload successful!</p>
          </>,
        );
        setTimeout(() => setDisplayText(""), 1500);
      } else {
        setDisplayText(
          <>
            <i className="bi bi-exclamation-triangle text-danger"></i>
            <p>Failed to upload. Please try again.</p>
          </>,
        );
      }
    });
};

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
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UploadedImage = styled.img`
  height: 40px;
  width: 40px;
  border-radius: 16px;
`;

return (
  <UploadContainer background={background}>
    {msg}
    <ButtonContainer>
      <Button>
        <Files
          multiple={false}
          accepts={["image/*"]}
          clickable
          className="btn btn-outline-primary"
          onChange={(f) => uploadFile(f)}
        >
          {img ? "Replace" : "Upload File"}
        </Files>
      </Button>
      {img ? (
        <UploadedImage
          src={`https://ipfs.near.social/ipfs/${img}`}
          alt="Image Preview"
        />
      ) : props.image ? (
        <Widget
          src="${alias_mob}/widget/Image"
          loading=""
          props={{ image: props.image, style: { height: 40, width: 40 } }}
        />
      ) : (
        ""
      )}
    </ButtonContainer>
  </UploadContainer>
);
