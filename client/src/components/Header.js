import React from "react";

function Header ({user, setUser}) {

    function handleLogout(){
        fetch("/logout", {method: "DELETE"}).then((r) => {
            if (r.ok) {
                setUser(null)
            }
        })
    }

    return (
        <div>
            <header>
                Header
                <button onClick={handleLogout}>Logout</button>
            </header>
        </div>
    )
}

export default Header;