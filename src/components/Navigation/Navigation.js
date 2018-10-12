import React from 'react';

const Navigation = ({ onRouteChange, isSignedIn }) => {
    if (isSignedIn) {
        return (
            <nav>
                <p onClick={() => onRouteChange("SignOut")} className="f3 link dim black underline ma4 white pointer">Sign out</p>
            </nav>
        );
    } else {
        return (
            <nav>
                <p onClick={() => onRouteChange("SignIn")} className="f3 link dim black underline ma4 white pointer">Sign In</p>
                <p onClick={() => onRouteChange("Register")} className="f3 link dim black underline ma4 white pointer">Register</p>
            </nav>
        )
    }
}

export default Navigation;