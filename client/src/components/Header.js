import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";


function Header ({user, setUser}) {
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

    if (user.username === "Admin")
    return (
        <div>
            <header>
                Header
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleGoToProfile}>Profile</button>
                <NavLink to ="/">Home</NavLink>
                {/* <NavLink to = "/bookmarked">Bookmarked</NavLink> */}
                <NavLink to = "/addShop">AddShop</NavLink>
            </header>
        </div>
    )


    return (
        <div>
            <header>
                Header
                <button onClick={handleLogout}>Logout</button>
                <button onClick={handleGoToProfile}>Profile</button>
                <NavLink to ="/">Home</NavLink>
                <NavLink to = "/bookmarked">Bookmarked</NavLink>
            </header>
        </div>
    )
}

export default Header;