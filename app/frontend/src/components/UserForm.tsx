import { useState } from "react";

import Login from "./Login";
import SignUp from "./Signup";

export default function UserForm() {
    const [isLogin, setIsLogin] = useState(false);

    // Go to sign up page
    function handleChangePage() {
        setIsLogin(!isLogin);
    }
    
    return (
        <>
            <button onClick={handleChangePage}>
                Sign up
            </button>
            <button onClick={handleChangePage}>
                Login
            </button>
            {isLogin ? <Login /> : <SignUp />}
        </>
    );
}