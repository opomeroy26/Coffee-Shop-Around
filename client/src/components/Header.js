import React from "react";
import { Nav, Navbar, Container, Row, Form, FormControl, Button} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { TextField } from "@mui/material";


function Header ({user, setUser, setFilterBy, filterBy, setViewState, initialViewState, searchTerm, setSearchTerm}) {
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


    function handleGoAddShop(){
        history.push("/addShop")
    }

    function handleFilterBy(e){
        setFilterBy(e.target.value)
    }

    function handleViewState(){
        setViewState(initialViewState)
    }

    function handleSearch(e){
        e.preventDefault();
    }

    if (user.username === "Admin")
    return (
        <div>
            <Row id = "row">
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" id="header">
            <img id="logo" src={require ('../CoffeeShopAround.png')} alt="logo"/>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
                <Navbar.Brand id="welcome">Welcome {user.username}!</Navbar.Brand>
                <Nav.Link id="home" onClick={handleGoHome}>Home</Nav.Link>
                <Nav.Link onClick={handleGoToProfile}>Profile</Nav.Link>
                <Nav.Link onClick={handleGoAddShop}>New Shop</Nav.Link>
            </Nav>
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Form.Select id="value" aria-label="Default select example" name="sort" onChange={handleFilterBy} value={filterBy}>
                    <option  value="All">All</option>
                    <option value="Most Liked">Most Liked</option>
                    <option value="Price">Price</option>
                    <option value="Wifi">Wifi</option>
                </Form.Select>
            </Nav>
            <Nav>
                <Form className="d-flex" id="search" onSubmit={handleSearch}>
                    <FormControl
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value = {searchTerm}
                        onChange = {(e)=> setSearchTerm(e.target.value)}
                    />
        {/* <Button variant="outline-success"onSu>Search</Button> */}
                </Form>
            </Nav>
            <Nav>
                <Nav.Link onClick={()=> handleViewState()}>Map Reset</Nav.Link> 
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
            <img id="logo" src={require ('../CoffeeShopAround.png')} alt="logo"/>
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav>
                <Navbar.Brand id="welcome">Welcome {user.username}!</Navbar.Brand>
                <Nav.Link id="homelink" onClick={handleGoHome}>Home</Nav.Link>
                <Nav.Link onClick={handleGoToProfile}>Profile</Nav.Link>
            </Nav>
            <Nav className="me-auto">
            </Nav>
            <Nav>
            <Form.Select id="value" aria-label="Default select example" name="sort" onChange={handleFilterBy} value={filterBy}>
                    <option value="All">All Shops</option>
                    <option value="Most Liked">Most Liked</option>
                    <option value="Price">Price</option>
                    <option value="Wifi">Wifi</option>
                </Form.Select>
                </Nav>
                <Nav>
        <Form className="d-flex" id="search" onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          value = {searchTerm}
          onChange = {(e)=> setSearchTerm(e.target.value)}

        />
        {/* <Button variant="outline-success"onSu>Search</Button> */}
      </Form>
        </Nav>
            <Nav>
                <Nav.Link onClick={()=> handleViewState()}>Map Reset</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
            </Nav>
    
                </Navbar.Collapse>
            </Container>
            </Navbar>
            </Row>
    )
}

export default Header;