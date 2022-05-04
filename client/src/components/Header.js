import React from "react";
import { Nav, Dropdown} from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";


function Header ({user, setUser, setFilterBy, filterBy}) {
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

    function handleFilterBy(e){
        setFilterBy(e.target.value)
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
            <div className ="filterWrapper">
            <div className = "uimenu">
                {/* <label>Sort by Size</label> */}
            </div>
            <div>
                <select 
                    className="uiSelectionDropdown"
                    name="sort"
                    onChange={handleFilterBy}
                    value={filterBy}
                    >
                    <option value="All">All</option>
                    <option value="Most Liked">Most Liked</option>
                    <option value="Price">Price</option>
                    <option value="Wifi">Wifi</option>
                    </select>
                </div>
                </div>
            </header>
        </div>
    )
}

export default Header;