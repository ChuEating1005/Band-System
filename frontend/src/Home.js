import useFetch from "./useFetch";
import background from "./img/home_background2.jpg"
import { Link } from 'react-router-dom'

const Home = () => { 
  return (
    <div className="homepage">
      <div className="background-container">
        <img alt="thumb" src={background}/>
      </div>
      
      <div className="home-buttom">
        <Link to="/searchmusician">
          <button className="button-89">Search&emsp;Player</button>
        </Link>
        <Link to="/searchband">
          <button className="button-89">Search&emsp;Band</button>
        </Link>
      </div>
    </div>
  );
}
 
export default Home;