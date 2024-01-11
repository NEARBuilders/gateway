import React, { useCallback, useState } from "react"
import styled from "styled-components"
import { mobileNavbarNavigationItems, navbarNavigationItems } from "@/utils/constants"
import { SigninOrJoinNow } from "./SinginOrJoinNow";

const NavLink = styled.a`
  all: unset;

  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 8px;
  background: var(--bg-2, #23242b);
  color: var(--white-100, #fff) !important;

  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;

  cursor: pointer;
  transition: all 300ms;

  &:hover {
    text-decoration: none;
    background: #ffaf51 !important;
    color: #000 !important;
  }

  @media (max-width: 768px) {
    gap: 4px;
    border: 1px solid var(--white-100, #fff);
    background: transparent;
  }
`;

const MobileDropdownButton = styled.button`
  all: unset;

  color: #fff;
  padding: 0.5rem;
  font-size: 2rem;
`;

export function Navigation() {
  const [dropdown, setDropdown] = useState(false)

  const toggleDropdown = useCallback(() => {
    setDropdown((prev) => !prev);
  }, [])

  return (
    <nav>
      <div className="d-none d-md-flex flex-grow-1 flex-shrink-1 justify-content-center align-items-center gap-3 list-unstyled">
        {navbarNavigationItems.map(({ href, label }) => {
          const isActive = window.location.href === window.location.origin.concat(href)

          return (
            <NavLink
              key={label}
              href={href}
              className={isActive && "active"}
            >
              {label}
            </NavLink>
          )
        })}
      </div>
      <div className="d-block d-md-none">
        <MobileDropdownButton onClick={toggleDropdown}>
          <i className={`bi ${dropdown ? "bi-x" : "bi-list"}`}></i>
        </MobileDropdownButton>
      </div>
      <div
        className={`d-md-none ${dropdown ? "d-flex" : "d-none" } w-100 flex-column gap-3 text-white position-absolute start-50 top-100 shadow`}
        style={{
          transform: "translateX(-50%)",
          background: "#0b0c14",
          padding: "24px 48px",
          zIndex: 5,
          borderBottom: "1px solid var(--Stroke-color, rgba(255, 255, 255, 0.20))"
        }}
      >
        {mobileNavbarNavigationItems.map(({ href, label }) => {
          const isActive = window.location.href === window.location.origin.concat(href)

          return (
            <NavLink
              key={label}
              href={href}
              className={isActive && "active"}
            >
              {label}
            </NavLink>
          )
        })}
        <SigninOrJoinNow />
      </div>
    </nav>
  )
}