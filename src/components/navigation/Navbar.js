import React from "react"
import styled from "styled-components"
import { Navigation } from "@/components/Navbar/Navigation"
import { SigninOrJoinNow } from "components/Navbar/SinginOrJoinNow"

const StyledNavbar = styled.nav`
  display: flex;
  width: 100%;
  padding: 24px 48px;
  align-items: center;
  justify-content: space-between;

  .logo {
    img {
      width: auto;
      height: 32px;
      flex-shrink: 0;
      object-fit: cover;
    }
  }

  .active {
    border-radius: 8px;
    background: var(--Yellow, #ffaf51) !important;
    color: var(--black-100, #000) !important;

    /* Other/Button_text */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }

  .sign-in {
    all: unset;

    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;

    border-radius: 8px;
    border: 1px solid var(--white-100, #fff);

    color: var(--white-100, #fff);
    transition: all 300ms;

    &:hover {
      text-decoration: none;
      background: #fff;
      color: #000;
    }

    cursor: pointer;

    /* Other/Button_text */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
  }
`;


const logoLink =
  "https://ipfs.near.social/ipfs/bafkreihbwho3qfvnu4yss3eh5jrx6uxhrlzdgtdjyzyjrpa6odro6wdxya";

export function Navbar() {
  return (
    <div
      style={{
        borderBottom:
          "1px solid var(--Stroke-color, rgba(255, 255, 255, 0.20))",
      }}
    >
      <StyledNavbar className="container-xl position-relative">
        <div className="logo">
          <a href="/" style={{ all: "unset", cursor: "pointer" }}>
            <img src={logoLink} />
          </a>
        </div>
        <Navigation />
        <div className="d-none d-md-flex">
          <SigninOrJoinNow />
        </div>
      </StyledNavbar>
    </div>
  )
}
