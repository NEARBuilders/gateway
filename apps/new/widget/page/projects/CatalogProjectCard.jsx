const project = props.project;
if (!project) {
  return "No Project Passed";
}

const MAX_DESCRIPTION_LENGTH = 80;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-radius: 1rem;
  background: #23242b;
  color: white;
  transition: all 300ms;
  height: 100%;

  &:hover {
    transform: translateY(-0.5rem);
    cursor: pointer;
  }

  .image {
    height: 168px;
    border-radius: 16px 16px 0px 0px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    padding: 16px 24px;
    gap: 16px;
    flex: 1;
  }

  .title {
    font-size: 16px;
    font-weight: 600;
    width: 100%;
  }

  .description {
    font-size: 14px;
    font-weight: 400;
    word-wrap: break-word;
  }

  .tags {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    box-shadow: 0px -0.699999988079071px 0px rgba(123, 123, 123, 0.36) inset;
    padding: 4px 8px;
    border-radius: 4px;
    border: 1px solid rgba(123, 123, 123, 0.36);
  }
`;

const getImageSrc = (image) => {
  const defaultImageUrl =
    "https://ipfs.near.social/ipfs/bafkreih4i6kftb34wpdzcuvgafozxz6tk6u4f5kcr2gwvtvxikvwriteci";
  if (!image) return defaultImageUrl;
  const { url, ipfs_cid } = image;
  if (ipfs_cid) {
    return ipfsUrlFromCid(ipfs_cid);
  } else if (url) {
    return url;
  }
  return defaultImageUrl;
};

return (
  <Card
    className="project-card"
    onClick={() => props.setSelectedProjectId(project.slug)}
  >
    <img
      src={getImageSrc(project.profile.image)}
      className="image"
      alt={project.profile.name}
    />
    <div className="info">
      <h6 className="title">{project.profile.name}</h6>
      <p className="description">
        {project.profile.tagline.length > MAX_DESCRIPTION_LENGTH
          ? project.profile.tagline.slice(0, MAX_DESCRIPTION_LENGTH) + "..."
          : project.profile.tagline}
      </p>
      <div className="tags">
        {Object.values(project.profile.tags).map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  </Card>
);
