
import { SearchResultUser, SearchResultBand }  from "./SearchResult";
import { useState, useEffect, useRef} from "react";
import { useHistory } from "react-router-dom";
import './EditBand.css'

const EditBand = ({user,url}) => {


    const [errMsg, setErrMsg] = useState('');

    const [info, setInfo] = useState({});
    const [name, setName] = useState('');
    const [practice_time, setPracticeTime] = useState("null");
    const [style, setStyle] = useState([]);
    const [region, setRegion] = useState([]);
    const [ig, setIg] = useState("null");
    const [fb, setFb] = useState("null");
    const [photo, setPhoto] = useState("");
    const [contact_window, setContactWindow] = useState("null");
    const [bio, setBio] = useState("null");
    const [members, setMembers] = useState([]);

    const history=useHistory();

    const id = user;

    const styles = ['J-rock', 'Metal', 'J-pop', 'Lo-Fi', 'Jazz', 'Post Rock', 'Math Rock', 'Acoustic', 'Softcore', 'Pop-Punk', 'Country', "Others"];
    const regions = [["KLU", "基隆市"], ["TPH", "新北市"], ["TPE", "臺北市"], ["TYC", "桃園市"], ["HSH", "新竹縣"], ["HSC", "新竹市"], ["MAL", "苗栗縣"], ["TXG", "臺中市"], ["CWH", "彰化縣"], ["NTO", "南投縣"], ["YLH", "雲林縣"], ["CHY", "嘉義縣"], ["CYI", "嘉義市"], ["TNN", "臺南市"], ["KHH", "高雄市"], ["IUH", "屏東縣"], ["ILN", "宜蘭縣"], ["HWA", "花蓮縣"], ["TTT", "臺東縣"], ["PEH", "澎湖縣"], ["GNI", "綠島"], ["KYD", "蘭嶼"], ["KMN", "金門縣"], ["LNN", "連江縣"]];
   
    useEffect(() => {
        console.log(photo);
    },[photo]);

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
    }

    useEffect(()=>{
        if(info){
            // fetchPhoto(info.photo);
            setName(info.name);
            setPracticeTime(info.practice_time);
            setIg(info.ig);
            setFb(info.fb);
            setContactWindow(info.contact_window);
            setBio(info.bio);
            setStyle(info.style);
            // setInstrument(info.instrument);
            setRegion(info.region);
            setMembers(info.members);
        }
        else {
            console.log("cannot fetch info");
        }
    },[info])


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
        formData.append('practice_time', practice_time);
        formData.append('bio', bio);
        formData.append('ig', ig);
        formData.append('fb', fb);
        formData.append('contact_window', contact_window);
        console.log(photo);
        if (photo !== ""){
            console.log("yes photo");
            formData.append('photo', photo);
        }
        // instrument.forEach(item => { formData.append('instrument', item) });
        region.forEach(item => { formData.append('region', item) });
        style.forEach(item => { formData.append('style', item) });

        console.log(formData.has('photo'));

        fetch(url + 'band-edit?band_id=' + id, {
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
                history.push('/bandprofile');
            }
        })
        .catch((error) => {
            console.log(`Error: ${error.message}`);
        })

    }

    if (!style || !info || !region ) return("loading");

    return (
        <div className="profile-edit">
        <div className="search">
            <div className="profile-edit-filter">
        <div calss = "profile-edit-container">
        <h2 class="profile-edit-heading">Edit Profile</h2>

            <form class = "profile-edit-from" onSubmit={handleSubmit}>
            <label for="fileInput" class="custom-upload-btn">Choose a Photo</label>
            <input type="file" id="fileInput" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} />
            <div id="fileName"></div>

                <label htmlFor="username" class = "profile-edit-lable">
                    Name:
                </label>
                <input
                    class = "profile-edit-input"
                    type="text"
                    // name="instrument"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    required
                />

        

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

                <label htmlFor="practice_time" class = "profile-edit-lable">
                    Practice_time:
                </label>
                <input
                    class="profile-edit-input"
                    type="text"
                    id="practice_time"
                    autoComplete="off"
                    onChange={(e) => setPracticeTime(e.target.value)}
                    value={practice_time}
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

                <label htmlFor="contact_window" class = "profile-edit-lable">
                    Contact Window:
                </label>               
                <input
                    class="profile-edit-input"
                    type="text"
                    id="contact_window"
                    autoComplete="off"
                    onChange={(e) => setContactWindow(e.target.value)}
                    value={contact_window}
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
 
export default EditBand;