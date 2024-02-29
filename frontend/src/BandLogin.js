import { useRef , useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const BandLogin = ({ onLogin ,url }) => {
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [info, setInfo] = useState(null);
    const [role, setRole] = useState("band");
    const history=useHistory();
    //fetch('http://localhost:8000/user/')
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    useEffect(()=>{
        if(info){
            //console.log(info);
            if(info.status === "Failed"){
                setErrMsg('Unauthorized');
            }
            else if(info.password == pwd){
                setSuccess(true);
            }
            else {
                setErrMsg('password incorrect');
            };
        }
    },[info])

    useEffect(()=>{
        if(success){
            console.log(user);
            onLogin(user , role);
            history.push('/');
        }
    },[success])

    const handleSubmit =async(e) => {
        e.preventDefault();
        //setSuccess(true);
        //setTimeout(() => {
        let formData = new FormData(); 
        formData.append('role', 'band');   //append the values with key, value pair
        formData.append('id', user );
        const role = "user";
        const id=user;
        const  newuser = { id , role };

        await fetch(url + 'sign-in',{
            method: "POST",
            headers:{
                "ngrok-skip-browser-warning": "69420"
            },
            body: formData
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            //console.log(data);
            setInfo(data);
        })
        .catch(err => {
            console.log(err.message);
            if (err.message === '404') {
                setErrMsg('Unauthorized');
            }
        })

    }

    return ( 
        <div className="contain">
            { success && (
                <div>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link to="/">Go to Home</Link>
                    </p>
                </div>
            )} 
             
            { success === false && (
            <>
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="center">
            <div className="login">
                <h1>Band Sign in</h1>
                <br></br>
                <div ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="username">BandID:</label>
                    <input
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />

                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button>Sign In</button>
                </form>
                <label>
                    Need an Account?<br />
                </label>
                <p className="line">
                    <Link to="/BandRegister">Sign Up</Link>
                </p>
                </div>
            </div></>
            )}
        </div>
    );
}
 
export default BandLogin;