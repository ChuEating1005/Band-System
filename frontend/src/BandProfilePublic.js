import { useParams} from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFacebook,
    faInstagram
  } from "@fortawesome/free-brands-svg-icons";

import { faEnvelope } from '@fortawesome/free-solid-svg-icons'

import { useState, useEffect } from "react";
import './profile.css'
import { click } from "@testing-library/user-event/dist/click";

const BandProfilePublic = ({user, role , url}) => {
    const {id} = useParams();
    const [info, setInfo] = useState(null);
    const [photo, setPhoto] = useState(null);
    const [fetcherr, setFetcherr] = useState(false);
    const [request_send, setReq] = useState(false);
    console.log(id);

    useEffect(()=>{
        if(info){
            console.log(info.photo);
            fetchPhoto(info.photo);
            setFetcherr(false);
        }
        else {
            setFetcherr(true);
            console.log("cannot fetch info");
        }
    },[info])

    useEffect(() => {
        loadInitialPage();
    },[]);

    const loadInitialPage = async () => {
        console.log("init");
        const response = await fetch(url + 'band?band_id=' + id, {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setInfo(data);
        console.log(info);

    }
    
    
    const click = async () =>{
        setReq(true);
        console.log(id)
        let formData = new FormData();
        formData.append('band_id',id);
        formData.append('user_id',user);
        fetch( url + 'requestBand', {
            method: 'POST',
            headers: { 'ngrok-skip-browser-warning': 'true' },
            body: formData
        }).then(
            res => res.json()
        ).then((data) => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
    }
    const fetchPhoto = async(filename) => {
        
        if(filename == "")
        {
            console.log("fetch")
            filename = "default.jpg"

        }
        
        const res = await fetch(url + 'image/' + filename ,{
            // mode: "no-cors",
            method: 'GET',
        });
        console.log(res.status)
        const imageBlob = await res.blob();
        const photoURL = URL.createObjectURL(imageBlob);
        console.log(photoURL)
        setPhoto(photoURL);
        console.log(photo)
    }

    const styles = ['J-rock', 'Metal', 'J-pop', 'Lo-Fi', 'Jazz', 'Post Rock', 'Math Rock', 'Acoustic', 'Softcore', 'Pop-Punk', 'Country', "Others"];
    const regions = {
        "KLU": "基隆市",
        "TPH": "新北市", 
        "TPE": "臺北市", 
        "TYC": "桃園市", 
        "HSH": "新竹縣", 
        "HSC": "新竹市", 
        "MAL": "苗栗縣", 
        "TXG": "臺中市", 
        "CWH": "彰化縣",
        "NTO": "南投縣",
        "YLH": "雲林縣", 
        "CHY": "嘉義縣", 
        "CYI": "嘉義市", 
        "TNN": "臺南市", 
        "KHH": "高雄市", 
        "IUH": "屏東縣", 
        "ILN": "宜蘭縣",
        "HWA": "花蓮縣",
        "TTT": "臺東縣", 
        "PEH": "澎湖縣", 
        "GNI": "綠島", 
        "KYD": "蘭嶼", 
        "KMN": "金門縣", 
        "LNN": "連江縣"
    };
    if(!info || !photo) return "loading...";
    if(fetcherr) return "can't find the band ID";
    console.log(info.region)
    return(
        <div className="container emp-profile">     
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-img">
                            <img src={photo} alt="profile"/>

                        </div>
                    </div>
                    <div class="col-md-6">
                        
                        
                        <div class="profile-head">
                                    <h1>
                                        {info.name}
                                    </h1>
                        </div>
                        <br />{role=="user" ? (
                            <>
                            {request_send ? (
                                <p>Request Sended</p>
                                ):(
                                    <div className="login" style={{width: 'auto',padding: '0px'}}>
                                    <div class="col-md-0" >
                                        <button onClick={click}>Send Request</button> 
                                    </div></div>
                                )
                            }
                            </>
                        ) : (
                            <></>
                        )}
                        <div class="profile-head row" >
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>
                        
                                </ul>
                        </div>
                        
                        <div class="overflow-wrap text-break" >
                            {info.bio}   
                        </div>
                    </div>          
                </div>
                <div class="row">
                    <div class="col-md-4">
                        <div class="profile-work">
                            <p>CONTACT</p>
                            <div className="mt-3">
                                <div className="d-inline p-2"><a href="" ><FontAwesomeIcon icon={faInstagram} size="2x" /></a></div>
                                <div className="d-inline p-2">{info.ig}</div>
                                <br/>
                            </div>

                            <div className="mt-3">
                                <div className="d-inline p-2"><a href="" ><FontAwesomeIcon icon={faFacebook} size="2x" /></a></div>
                                <div className="d-inline p-2">{info.fb}</div>
                                <br/>
                            </div>
                            
                            <div className="mt-3">
                                <a href="" className="d-inline p-2"><FontAwesomeIcon icon={faEnvelope} size="2x"/></a>
                                <div className="d-inline p-2">{info.contact_window}</div>
                            </div>
                            
                            

                        </div>
                    </div>
                    <div class="col-md-8">
                    
                        <div class="tab-content profile-tab" id="myTabContent">
                            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                        
                                        <div class="row border mt-3 rounded">
                                            <div class="col-md-6">
                                                <label className="mt-1">User Id</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p className="mt-1">{id}</p>
                                            </div>
                                        </div>
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label className="mt-1">Music Style</label>
                                            </div>
                                            <div class="col-md-6">
                                                {info.style.map((i, index) => (
                                                        <p  className="mt-1" key={index}>{styles[i-1]}</p>
                                                ))}
                                             
                                            </div>
                                        </div>
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label className="mt-1 mb-2">Region</label>
                                            </div>
                                            <div class="col-md-6 mt-1 rounded">
                                                {info.region.map((i, index) => (
                                                    <p className="mt-1" key={index}>{regions[i]}</p>
                                                ))}
              
                                            </div>
                                        </div>
                                        
                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label  className="mt-1">practice Time</label>
                                            </div>
                                            <div class="col-md-6">
                                                <p  className="mt-1">{info.practice_time}</p>
                                            </div>
                                        </div>

                                        <div class="row border mt-1 rounded">
                                            <div class="col-md-6">
                                                <label className="mt-1 mb-2">members</label>
                                            </div>
                                            <div class="col-md-6 mt-1 rounded">
                                                {info.members.map((member_id, index) => (
                                                    <Link to={"/profilepublic/" + member_id}><p className="mt-1" key={index}>{ member_id }</p></Link>
                                                ))}
                                            </div>
                                        </div>
                            </div>

                        </div>
                    </div>
                </div>           
        </div>

    ); 
}
 
export default BandProfilePublic;