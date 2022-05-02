function Profile ({user}) {
    return(
        <div>
           <h1>Profile</h1>
           <img id="profile_img" alt={user.username} src={user.profile_img} />
           <h3>{user.username}</h3>
           <h5>{user.location}</h5>
        </div>
    )
}

export default Profile;