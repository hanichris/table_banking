import React from "react";
import { useState } from "react";


export default function SignUp() {
    const [user, setUser] = useState({
        email: '',
        password: '',
        fullName: '',
    });

    function handleChange(e:React.ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form action="">
            <input type="email" name="email" id="email" value={user.email} onChange={handleChange}/>
            <input type="password" name="password" id="password" value={user.password} onChange={handleChange} />
            <input type="text" name="fullName" id="fullname" value={user.fullName} onChange={handleChange}/>
        </form>
    );
}