// components/Layout.js
import { Container } from "react-bootstrap";
import MainNav from "./MainNav";

const Layout = (props) => (
  <>
    <MainNav />
    <Container>{props.children}</Container>
    <br />
    <br />
  </>
);

export default Layout;
