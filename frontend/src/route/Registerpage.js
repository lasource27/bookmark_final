import React, {useContext} from 'react'
import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faUser as faUserRegular} from '@fortawesome/free-regular-svg-icons'



const Registerpage = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {user} = useContext(AuthContext)

    const registerUser = async(e) => {
        e.preventDefault()
        const response = await fetch('/backend/register/', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body:JSON.stringify({'username':e.target.username.value, 'email':e.target.email.value, 'password':e.target.password.value})
        })
        const data = await response.json()
        console.log(data)
        if (response.status === 201) {
            alert("Your user registration was successful. You can now log into your account.")
        } else {
            if (data.username == null && data.email == null) {
                console.log("here1")
                alert(data.non_field_errors)
            } else if (data.username === undefined) {
                console.log("here3")
                alert("Email:"+data.email)
            } else if(data.email === undefined) {
                console.log("here4")
                alert("Username:"+data.username)
            }  else {
                alert("Email:"+data.email)
                alert("Username:"+data.username)
                console.log("here2")
            }
        }
        console.log("data:",data, response.status)
    }


    return (
        <div className="identity_page register_page">
            <div className="identity_image"></div>
            <div className="identity_content">
                <div className="identity_content_container">
                    <div className="identity_content_bg"></div>
                    <form className="identity_form" onSubmit={registerUser}>
                        <div className="profile">
                            <FontAwesomeIcon icon={["far","user"]} />
                        </div>
                        <div className="form_control identity first">
                            <div className="identity_icon">
                                <FontAwesomeIcon icon="user" />
                            </div>
                            <input type="text" name="username" value={username} onChange={(e)=> {setUsername(e.target.value)}} placeholder="Username"/>
                        </div>
                        <div className="form_control identity">
                            <div className="identity_icon">
                                <FontAwesomeIcon icon="envelope" />
                            </div>
                            <input type="text" name="email" value={email} onChange={(e)=> {setEmail(e.target.value)}} placeholder="Email"/>
                        </div>
                        <div className="form_control identity">
                            <div className="identity_icon">
                                <FontAwesomeIcon icon="lock" />
                            </div>
                            <input type="password" name="password" value={password} onChange={(e)=> {setPassword(e.target.value)}} placeholder="Password"/>
                        </div>
                        <input type="submit" value="REGISTER" className="identity_button"/>
                        <Link to="/login" style={{ textDecoration: 'none',color: "#375174", fontWeight:"bold"}}>Already have an account? Login here.</Link>                        
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Registerpage
