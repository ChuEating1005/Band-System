import { useRef , useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import emailjs from '@emailjs/browser';
const Forget = ({forget,url}) => {

    const [id, setId] = useState('');
    const [mail, setMail] = useState('');
    const [info, setInfo] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const form = useRef();
    let temp = form.current;
    useEffect(()=>{
        if(info){
            if(info.status == "Failed"){
                setErrMsg('Unauthorized');
            }
            else if(info.email == mail){
                setSuccess(true);
            }
            else {
                setErrMsg('mail incorrect or not set');
            };
        }
    },[info])

    useEffect(()=>{
        if(success){
            forget({ user: id , role : "user"});
            emailjs.sendForm('service_band','template_ot2ru8f',temp,'K7JxayUwMKsXWf5YO')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        }
    },[success])

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch( url+'user?user_id=' + id,{
            method: "Get",
            headers:{
                "ngrok-skip-browser-warning": "69420"
            }
        })
        .then(res => {
            return res.json();
        })
        .then(data => {
            console.log(data);
            setInfo(data);
        })
        .catch(err => {
            console.log(err.status_code);
        })
        temp=form.current;
        console.log(temp);
    }
    return (  
        
        <div className="login"> 
            { success && (
                <div>
                    <h1>Check your Email</h1>
                </div>
            )} 
            { success === false && (  
            <>
            <h1>Forget Password</h1>
            <div  className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</div>
            <form ref={form} onSubmit={handleSubmit}>
                <label htmlFor="username">UserID:</label>
                <input
                    type="name"
                    id="username"
                    name="name"
                    autoComplete="off"
                    required
                    onChange={(e) => setId(e.target.value)}
                    value={id}
                />

                <label htmlFor="password">Email:</label>
                
                <input
                    name="recipient"
                    type="email"
                    id="password"
                    required
                    onChange={(e) => setMail(e.target.value)}
                    value={mail}
                />
                <button>Sign In</button>
            </form>
            </>
            )}
        </div>
     );
}
 
export default Forget;