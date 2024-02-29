import { useRef , useState,useEffect} from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import SearchCard from "./SearchCard";
import { click } from '@testing-library/user-event/dist/click';
const BandRequest = ({user,url}) => {
    const [isPending, setIsPending] = useState(true);
    const [datas, setSearchData] = useState([]);
    const history=useHistory();
    useEffect(() => {
        let formData = new FormData();
        formData.append('band_id',user);
        fetch( url + 'requestList?band_id=' + user, {
            method: 'POST',
            headers: { 'ngrok-skip-browser-warning': 'true' },
            body: formData
        }).then(
            res => res.json()
        ).then((data) => {
            console.log(data);
            setSearchData(data);
            setIsPending(false);
        })
        .catch(err => {
            console.log(err);
        })
    },[])
    const click = async (e) => {
        console.log(e)
        let formData = new FormData();
        formData.append('band_id',user);
        formData.append('user_id',e);
        fetch( url + 'acceptRequest', {
            method: 'POST',
            headers: { 'ngrok-skip-browser-warning': 'true' },
            body: formData
        }).then(
            res => res.json()
        ).then((data) => {
            console.log(data);
            window.location.reload(true);
        })
    }
    if(isPending) return "loading";
    else if(datas.length==0) return (<h2>No requests</h2>)
    else 
        return(
        <div className='search-result'>
          <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet" />
          
          <div className="search-detail">
            { datas.map(data => (
                <>
                <Link to={`/ProfilePublic/${data.user_id}`} className="profile-link">
                <SearchCard id={data.user_id} name={data.name} filename={data.photo}/></Link>
                <div class="col-md-7">
                <div className="login" style={{float: 'left', width: '77.5%',padding: '0px',textDecoration: ''}}>   
                <button onClick={() => {click(data.user_id)}}>Accept</button></div>
                </div></>
            )) }
          </div>
          
          
        </div>
    );
}
 
export default BandRequest;