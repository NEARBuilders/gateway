const CardSkeletonContainer = styled.div`
  @keyframes loadingSkeleton {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 0.6;
    }
  }

  display: flex;
  flex-direction: column;
  height: 447px;
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  background: var(--bg-color, #23242b);
  color: var(--text-color, #fff);
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  animation-name: loadingSkeleton;
  animation-duration: 1s;
  animation-iteration-count: infinite;
`;

const HeaderSkeleton = styled.div`
  display: block;
  width: 100%;
  height: 168px;
  background: #eee;
`;

const ProfileImageSkeleton = styled.div`
  background: #e0e0e0;
  margin-left: 32px;
  transform: translateY(148px);
  width: 40px;
  height: 40px;
  position: absolute;
  border-radius: 999px;
`;

const TitleSkeleton = styled.div`
  width: 120px;
  height: 24px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const DescriptionSkeleton = styled.div`
  width: 83%;
  height: 48px;
  background: #eee;
  margin-left: 24px;
  margin-top: 24px;
`;

const TagSkeleton = styled.div`
  background: #eee;
  border-radius: 4px;
  height: 34px;
  width: 110px;
  margin: 24px;
`;

const FooterItemSkeleton = styled.div`
  width: 150px;
  height: 40px;
  background: #eee;

  @media screen and (max-width: 390px) {
    width: 100px;
  }
`;

const DonationsInfoContainerSkeleton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  width: 100%;
  border-top: 1px #f0f0f0 solid;
`;

const DonationsInfoItemSkeleton = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

const CardSkeleton = ({ variant }) => {
  return varaint === "potlock" ? (
    <CardSkeletonContainer>
      <HeaderSkeleton />
      <ProfileImageSkeleton />
      <TitleSkeleton />
      <DescriptionSkeleton />
      <TagSkeleton />
      <DonationsInfoContainerSkeleton>
        <DonationsInfoItemSkeleton>
          <FooterItemSkeleton />
        </DonationsInfoItemSkeleton>
        <DonationsInfoItemSkeleton>
          <FooterItemSkeleton />
        </DonationsInfoItemSkeleton>
      </DonationsInfoContainerSkeleton>
    </CardSkeletonContainer>
  ) : (
    <CardSkeletonContainer>
      <HeaderSkeleton />
      <TitleSkeleton />
      <DescriptionSkeleton />
      <TagSkeleton />
    </CardSkeletonContainer>
  );
};

return { CardSkeleton };
