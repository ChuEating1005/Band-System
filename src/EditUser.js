
import { SearchResultUser, SearchResultBand }  from "./SearchResult";
import { useState, useEffect, useRef} from "react";
import { useHistory } from "react-router-dom";
import './EditUser.css'

const EditUser = ({user,url}) => {


    const [errMsg, setErrMsg] = useState('');

    const [info, setInfo] = useState({});
    const [name, setName] = useState('');
    const [prefered_time, setPrefered_time] = useState("null");
    const [instrument, setInstrument] = useState([]);
    const [style, setStyle] = useState([]);
    const [region, setRegion] = useState([]);
    const [ig, setIg] = useState("null");
    const [fb, setFb] = useState("null");
    const [photo, setPhoto] = useState("null");
    const [email, setEmail] = useState("null");
    const [bio, setBio] = useState("null");

    const history=useHistory();

    const id = user.user;

    const styles = ['J-rock', 'Metal', 'J-pop', 'Lo-Fi', 'Jazz', 'Post Rock', 'Math Rock', 'Acoustic', 'Softcore', 'Pop-Punk', 'Country', "Others"];
    const regions = [["KLU", "基隆市"], ["TPH", "新北市"], ["TPE", "臺北市"], ["TYC", "桃園市"], ["HSH", "新竹縣"], ["HSC", "新竹市"], ["MAL", "苗栗縣"], ["TXG", "臺中市"], ["CWH", "彰化縣"], ["NTO", "南投縣"], ["YLH", "雲林縣"], ["CHY", "嘉義縣"], ["CYI", "嘉義市"], ["TNN", "臺南市"], ["KHH", "高雄市"], ["IUH", "屏東縣"], ["ILN", "宜蘭縣"], ["HWA", "花蓮縣"], ["TTT", "臺東縣"], ["PEH", "澎湖縣"], ["GNI", "綠島"], ["KYD", "蘭嶼"], ["KMN", "金門縣"], ["LNN", "連江縣"]];
    const Instruments = ["Electric Guitar", "KB", "Drums", "Bass", "Vocal", "Saxophone", "Cello", "Acoustic Guitar", "Trumpet", "Others"];

    useEffect(() => {
        loadInitialPage();
    },[]);

    const loadInitialPage = async () => {
        console.log("init");
        const response = await fetch(url + 'user?user_id=' + id, {
            method: 'GET'
        });
        const data = await response.json();
        console.log(data);
        setInfo(data);
        console.log(info);
    }

    useEffect(()=>{
        if(info){
            fetchPhoto(info.photo);
            setName(info.name);
            setPrefered_time(info.prefered_time);
            setIg(info.ig);
            setFb(info.fb);
            setEmail(info.email);
            setBio(info.bio);
            setStyle(info.style);
            setInstrument(info.instrument);
            setRegion(info.region);
            console.log("style: ");
            console.log(style);
        }
        else {
            console.log("cannot fetch info");
        }
    },[info])

    const fetchPhoto = async(filename) => {
        if(!filename)
        {
            console.log("no filename");
            return
        }
        const res = await fetch('http://127.0.0.1:5000/image/' + filename ,{
            // mode: "no-cors",
            method: 'GET',
        });
        const imageBlob = await res.blob();
        const photoURL = URL.createObjectURL(imageBlob);
        console.log(photoURL)
        setPhoto(photoURL);
        console.log(photo)
    }

    const handleInstrumentChange = (e) => {
        const value = parseInt(e.target.defaultValue);
        if (e.target.checked) {
          setInstrument(instrument => [...instrument, value]);
          console.log('Add ' + e.target.name + ' successfully!');
        }
        else {
          setInstrument(instrument.filter(item => item !== value));
          console.log('Delete ' + e.target.name + ' successfully!');
        }
      };

    const handleStyleChange = (e) => {
    const value = parseInt(e.target.defaultValue);
    if (e.target.checked) {
        setStyle(item => [...item, value]);
        console.log('Add ' + e.target.name + ' successfully!');
    }
    else {
        setStyle(style.filter(item => item !== value));
        console.log('Delete ' + e.target.name + ' successfully!');
    }
    };

    const handleRegionChange = (e) => {
        const value = e.target.defaultValue;
        if (e.target.checked) {
            setRegion(item => [...item, `${value}`]);
            console.log('Add ' + e.target.name + ' successfully!');
        }
        else {
            setRegion(region.filter(item => item !== value));
            console.log('Delete ' + e.target.name + ' successfully!');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData(); 
        formData.append('name', name);
        formData.append('prefered_time', prefered_time);
        formData.append('bio', bio);
        formData.append('ig', ig);
        formData.append('fb', fb);
        formData.append('email', email);
        instrument.forEach(item => { formData.append('instrument', item) });
        region.forEach(item => { formData.append('region', item) });
        style.forEach(item => { formData.append('style', item) });

        formData.append('photo', "IMG_4363");

        console.log(formData.get("instrument"));

        fetch(url + 'user-edit?user_id=' + id, {
            method: 'PUT',
            body: formData
        }).then((response) => {
            console.log(response.text);
            return response.text(); 
        }).then((data) => {
            if(data == 'id not found'){
                setErrMsg("id not found");
            }
            else{
                history.push('/profile');
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        })

    }

    if (!style || !info || !region || !instrument) return("loading");

    return (
        <div className="profile-edit">
        <div className="search">
            <div className="profile-edit-filter">
        <div calss = "profile-edit-container">
        <h2 class="profile-edit-heading">Edit Profile</h2>

            <form class = "profile-edit-from" onSubmit={handleSubmit}>

                <label htmlFor="username" class = "profile-edit-lable">
                    Name:
                </label>
                <input
                    class = "profile-edit-input"
                    type="text"
                    name="instrument"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />

                <label htmlFor="username" class = "profile-edit-lable">
                    Instrument:
                </label>
                <ul className="ks-cboxtags">
                {Instruments.map((instrument_name, index) => (
                  <li><input type="checkbox" id={index} value={index+1} name={instrument_name} checked={instrument.includes(index+1)} onChange={handleInstrumentChange}/>
                  <label for={index}>{instrument_name}</label></li>
                ))}
                </ul>

                <label htmlFor="username" class = "profile-edit-lable">
                    Region:
                </label>
                <ul className="ks-cboxtags">
                {regions.map((region_name, index) => (
                  <li><input type="checkbox" id={10 + index} value={region_name[0]} name={region_name[1]} checked={region.includes(region_name[0])} onChange={handleRegionChange}/>
                  <label for={10 + index}>{region_name[1]}</label></li>
                ))}
                </ul>

                <label htmlFor="username" class = "profile-edit-lable">
                    Style:
                </label>
                <ul className="ks-cboxtags">
                {styles.map((style_name, index) => (
                  <li><input type="checkbox" id={34 + index} value={index+1} name={style_name} checked={style.includes(index+1)} onChange={handleStyleChange} /><label for={34 + index}>{style_name}</label></li>
                ))}
                </ul>

                <label htmlFor="prefered_time" class = "profile-edit-lable">
                    Prefered_time:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="prefered_time"
                    autoComplete="off"
                    onChange={(e) => setPrefered_time(e.target.value)}
                    value={prefered_time}
                    required
                />

                <label htmlFor="ig" class = "profile-edit-lable">
                    Instagram:
                </label>
                <input  
                    class="profile-edit-input"
                    type="text"
                    id="ig"
                    autoComplete="off"
                    onChange={(e) => setIg(e.target.value)}
                    value={ig}
                    required
                />

                <label htmlFor="fb" class = "profile-edit-lable">
                    Facebook:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="fb"
                    autoComplete="off"
                    onChange={(e) => setFb(e.target.value)}
                    value={fb}
                    required
                />

                <label htmlFor="email" class = "profile-edit-lable">
                    Email:
                </label>               
                <input
                    class="profile-edit-input"
                    type="text"
                    id="email"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                />

                <label htmlFor="bio" class = "profile-edit-lable">
                    Bio:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="bio"
                    autoComplete="off"
                    onChange={(e) => setBio(e.target.value)}
                    value={bio}
                    required
                />
                <button type = "submit" class="profile-edit-button" >Save</button>
            </form>
        </div>
        </div>
        </div>
        </div>
    )


}
 
export default EditUser;