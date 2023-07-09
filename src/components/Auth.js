import { auth, provider } from "../firebase-config.js";
import { signInWithPopup } from "firebase/auth";
import Cookies from "universal-cookie";
import "../styles/Auth.css";
const cookies = new Cookies();


export const Auth = (props) => {
    const { setIsAuth } = props;

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            cookies.set("auth-token", result.user.refreshToken);
            setIsAuth(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans" />
            <div className="title">
                <h1>Chat Room</h1>
            </div>


            <button type="button" class="login-with-google-btn" onClick={signInWithGoogle}>
                Sign in with Google
            </button>
        </>
    );
};