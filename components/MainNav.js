// components/MainNav.js

import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
} from "react-bootstrap";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { favouritesAtom } from "../store";

const MainNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchField = e.target.searchField.value;
    const queryString = `title=true&q=${searchField}`;
    setSearchHistory((current) => [...current, queryString]);
    router.push(`/artwork?${queryString}`);
    setIsExpanded(false);
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavItemClick = () => {
    setIsExpanded(false);
  };

  return (
    <>
      <Navbar
        className="fixed-top"
        bg="secondary"
        variant="dark"
        expanded={isExpanded}
      >
        <Navbar.Brand>Ji Ho Nam</Navbar.Brand>
        <Navbar.Toggle
          onClick={toggleExpanded}
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link
              href="/"
              passHref
              onClick={handleNavItemClick}
              active={router.pathname === "/"}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="/search"
              passHref
              onClick={handleNavItemClick}
              active={router.pathname === "/search"}
            >
              Advanced Search
            </Nav.Link>
          </Nav>
          <Form onSubmit={handleSearchSubmit} className="d-flex">
            <FormControl type="text" placeholder="Search" name="searchField" />
            <Button variant="outline-light" type="submit">
              Search
            </Button>
          </Form>

          <Nav>
            <NavDropdown title="User Name" id="basic-nav-dropdown">
              <Link
                href="/history"
                passHref
                onClick={handleNavItemClick}
                active={router.pathname === "/history"}
              >
                history
              </Link>
              <br></br>
              <Link
                href="/favourites"
                passHref
                onClick={handleNavItemClick}
                active={router.pathname === "/favourites"}
              >
                favourites
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <br />
      <br />
    </>
  );
};

export default MainNav;
