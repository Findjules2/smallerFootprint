import React, {useState, useEffect, useContext} from "react";
import AuthContext from "../../contexts/AuthContext";
import API from "../../lib/API";
import { FiActivity } from "react-icons/fi";
import "./style.css"

//make a useEffect function with API call that sets friends as the result of the api call 
// maps api result to render
const FriendsDisplay = (props) => {
  const userInfo = useContext(AuthContext);
  const [friends, setFriends] = useState([]); //friends I follow from db
  const [hasFriends, setHasFriends] = useState("")

  useEffect(() => {
    console.log("useEffect works")
    API.Users.getThoseIFollow(userInfo.authToken)
    .then(response => {
      console.log(response.data)
      if (response.data.length > 0) {
        console.log("you have friends")
        setFriends(response.data)
        setHasFriends("you have friends")
      } else {        
        console.log("you have no friends")} 
    })
    .catch(error => console.log(error))
  }, [])

    return (
      <>
        <div>
          {hasFriends === "you have friends" ? <p>Check out your friend's progress</p> : <></>}
          <ul>
          {friends.map(friend => (
          <li key={friend.id}><button size="sm" className="btn btn_orange mb-2 mr-2"><FiActivity /></button>{friend.email} </li>
        ))}            
          </ul>
        </div>
      </>
    )
}

export default FriendsDisplay;