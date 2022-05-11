import React from "react";
import { Nav, Navbar, Container, NavDropdown, Dropdown, Row, Form} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";


function Header ({user, setUser, setFilterBy, filterBy, viewState, setViewState, initialViewState}) {
    const history = useHistory()

    function handleLogout(){
        fetch("/logout", {method: "DELETE"}).then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }

    function handleGoToProfile(){
        history.push("/profile")
    }

    function handleGoHome(){
        history.push("/")
    }

    function handleGoBookmarked(){
        history.push("/bookmarked")
    }

    function handleGoAddShop(){
        history.push("/addShop")
    }

    function handleFilterBy(e){
        setFilterBy(e.target.value)
    }

    function handleViewState(){
        setViewState(initialViewState)
    }

    if (user.username === "Admin")
    return (
        <div>
            <Row id = "row">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header">
            <Container>
                <Navbar.Brand>Coffee Shop Around</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link onClick={handleGoHome}>Home</Nav.Link>
                {/* <Nav.Link onClick={handleGoBookmarked}>Bookmarked</Nav.Link> */}
                <Form.Select aria-label="Default select example" name="sort" onChange={handleFilterBy} value={filterBy}>
                    <option value="All">All</option>
                    <option value="Most Liked">Most Liked</option>
                    <option value="Price">Price</option>
                    <option value="Wifi">Wifi</option>
                </Form.Select>
            </Nav>
            <Nav>
                <Navbar.Brand>Welcome {user.username}</Navbar.Brand>
                <Nav.Link onClick={handleGoToProfile}>Profile</Nav.Link>
                <Nav.Link onClick={handleGoAddShop}>New Shop</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </Row>
        </div>
    )


    return (
            <Row id="row"> 
            <Navbar bg="dark" variant="dark" id="header">
            <Container>
                <Navbar.Brand>Coffee Shop Around</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link onClick={handleGoHome}>Home</Nav.Link>
                {/* <Nav.Link onClick={handleGoBookmarked}>Bookmarked</Nav.Link> */}
                <Form.Select aria-label="Default select example" name="sort" onChange={handleFilterBy} value={filterBy}>
                    <option value="All">All</option>
                    <option value="Most Liked">Most Liked</option>
                    <option value="Price">Price</option>
                    <option value="Wifi">Wifi</option>
                </Form.Select>
            </Nav>
            <Nav>
                <Navbar.Brand>Welcome {user.username}</Navbar.Brand>
                <Nav.Link onClick={handleGoToProfile}>Profile</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                <Nav.Link onClick={()=> handleViewState()}>Map Reset</Nav.Link>
            </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </Row>
    )
}

export default Header;