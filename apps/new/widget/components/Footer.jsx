const { Button } = VM.require("${alias_old}/widget/components") || {
  Button: () => <></>,
};
const Logo =
  "https://ipfs.near.social/ipfs/bafkreihsuyli6i2wphsutag6xcxnyhyrn7wtkklvqebx4szgpz3ieqacxu";

const Container = styled.div`
  display: flex;
  padding: 48px;
  padding-bottom: 2rem;
  flex-direction: column;

  background: black;
`;
const Content = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  p {
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin: 0;
  }
`;
const SocialIcons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 15px;
`;
const LogoStyle = styled.img`
  width: 121.949px;
  height: 87.799px;
  transform: rotate(-4.223deg);
`;

const Links = styled.div`
  display: flex;
  gap: 40px;
  justify-content: space-between;
  padding-bottom: 5rem;
  border-bottom: 1px solid #1d1d1d;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;
const LeftMenu = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-bottom: 24.46px;
  gap: 20px;
  p {
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin: 0;
  }
  @media screen and (max-width: 768px) {
    align-items: center;
  }
`;
const LearnMenu = styled.div`
  width: 185px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  h2 {
    align-self: stretch;
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin: 0;
  }
  a {
    padding-top: 8px 0px;
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
    text-decoration: none;
  }
  flex-shrink: 0;
  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: flex;
    h2 {
      align-self: center;
      justify-content: flex;
    }
  }
`;
const BuildMenu = styled.div`
  width: 185px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  gap: 16px;
  h2 {
    align-self: stretch;
    color: #fff;
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin: 0;
  }
  a {
    padding-top: 8px 0px;
    text-decoration: none;
    color: var(--Color-Neutral-neutral, #666);
    font-family: Poppins;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 21px */
  }
  @media screen and (max-width: 768px) {
    align-items: center;
    justify-content: flex;
    h2 {
      align-self: center;
      justify-content: flex;
    }
  }
`;

const Credits = styled.div`
  display: flex;
  padding-top: 32px;
  align-items: center;
  justify-content: center;
  p {
    color: var(--4D4D4D, #4d4d4d);
    font-family: Poppins;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; /* 24px */
    margin: 0;
  }
`;

const Menu = styled.div`
  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const Footer = () => {
  return (
    <Container>
      <Links>
        <LeftMenu>
          <LogoStyle src={Logo} />
          <p>Dive deeper BuildDAO</p>
          <SocialIcons>
            <Button
              type="icon"
              style={{
                borderRadius: "30%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-twitter-x"
                viewBox="0 0 16 16"
              >
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
              </svg>
            </Button>
            <Button
              type="icon"
              style={{
                borderRadius: "30%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M9.98786 13.3803L12.689 16.4514C13.6898 17.5891 14.1902 18.158 14.7139 18.0195C15.2377 17.881 15.4174 17.1324 15.7765 15.6349L17.7691 7.32829C18.3224 5.02197 18.5989 3.86882 17.984 3.30004C17.3692 2.73126 16.3034 3.15441 14.1718 4.00072L4.28232 7.92711C2.57746 8.60399 1.72503 8.94245 1.67091 9.52404C1.66537 9.58354 1.66528 9.64345 1.67064 9.70295C1.72297 10.2848 2.57436 10.6261 4.27715 11.3086C5.04867 11.6179 5.43444 11.7725 5.71102 12.0687C5.74212 12.102 5.77202 12.1365 5.80067 12.172C6.05551 12.4887 6.16426 12.9043 6.38176 13.7354L6.7888 15.2909C7.00044 16.0996 7.10626 16.504 7.38342 16.5592C7.66058 16.6143 7.9019 16.279 8.38452 15.6083L9.98786 13.3803ZM9.98786 13.3803L9.72302 13.1043C9.4216 12.7901 9.27094 12.6331 9.27094 12.438C9.27094 12.2428 9.4216 12.0857 9.72302 11.7715L12.7005 8.66845"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
            <Button
              type="icon"
              style={{
                borderRadius: "30%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M8.33335 17.6796C5.47621 18.644 3.09526 17.6796 1.66669 14.7067"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.33335 18.8733V16.1716C8.33335 15.673 8.4866 15.2397 8.73369 14.8482C8.90319 14.5797 8.7871 14.1987 8.48094 14.1145C5.94497 13.4173 4.16669 12.2964 4.16669 8.57838C4.16669 7.61175 4.4834 6.70296 5.04011 5.912C5.17866 5.71515 5.24793 5.61673 5.26459 5.52758C5.28124 5.43844 5.25229 5.3221 5.19437 5.08943C4.95867 4.14243 4.97395 3.13682 5.3277 2.23019C5.3277 2.23019 6.0587 1.99201 7.7225 3.03141C8.10237 3.26872 8.29231 3.38738 8.4596 3.41392C8.62685 3.44046 8.85052 3.38486 9.29777 3.27367C9.90944 3.12162 10.5397 3.04 11.25 3.04C11.9604 3.04 12.5906 3.12162 13.2023 3.27367C13.6495 3.38486 13.8732 3.44046 14.0404 3.41392C14.2078 3.38738 14.3977 3.26872 14.7775 3.03141C16.4414 1.99201 17.1724 2.23019 17.1724 2.23019C17.5261 3.13682 17.5414 4.14243 17.3057 5.08943C17.2478 5.3221 17.2188 5.43844 17.2354 5.52758C17.2521 5.61672 17.3214 5.71516 17.4599 5.912C18.0166 6.70296 18.3334 7.61175 18.3334 8.57838C18.3334 12.2964 16.5551 13.4173 14.0191 14.1145C13.7129 14.1987 13.5969 14.5797 13.7664 14.8482C14.0134 15.2397 14.1667 15.673 14.1667 16.1716V18.8733"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </Button>
            <Button
              type="icon"
              style={{
                borderRadius: "30%",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="21"
                viewBox="0 0 18 21"
                fill="none"
              >
                <g clip-path="url(#clip0_55_28543)">
                  <path
                    d="M7.55465 14.0081H10.4313V20.54H7.55465V14.0081ZM0.904755 7.31298H5.79948L2.31981 3.97704L4.24523 1.98636L7.5625 5.41559V0.540039H10.439V5.41559L13.7562 1.99417L15.6801 3.97704L12.2021 7.30518H17.0952V10.0579H12.1741L15.6756 13.4793L13.7562 15.4234L9.00073 10.6178L4.24523 15.4234L2.31981 13.4872L5.82262 10.0657H0.904755V7.31298Z"
                    fill="#43E660"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_55_28543">
                    <rect
                      width="16.1905"
                      height="20"
                      fill="white"
                      transform="translate(0.904755 0.540039)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Button>
          </SocialIcons>
        </LeftMenu>
        <Menu className="d-flex gap-5">
          <LearnMenu>
            <h2>Learn</h2>

            <a href="#read">Read</a>
            <a href="#watch">Watch</a>
            <a href="#tools">Tools</a>
            <a href="#components">Components</a>
          </LearnMenu>
          <BuildMenu>
            <h2>Build</h2>
            <a href="#guide">Guide</a>
            <a href="#project">Project</a>
            <a href="#activity">See Activity</a>
            <a href="#feedback">Request Feedback</a>
            <a href="#program">Founding Program</a>
          </BuildMenu>
        </Menu>
      </Links>
      <Credits>
        <p>© {new Date().getFullYear} BuildDAO. All rights reserved.</p>
      </Credits>
    </Container>
  );
};

return { Footer };
