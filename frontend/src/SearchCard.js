import defaultphoto from "./img/default.jpg";
import { Link } from "react-router-dom";
const SearchCard = ({url, id, name, filename}) => {
  var pathname
  if(filename) pathname = url + "image/" + filename;
  else pathname = defaultphoto;
  console.log(pathname);
  return (
      <div className="search-card">
        <div className="photo">
          <img src={pathname} alt="profile"/>
        </div>
        <div className="name-id">
          <h3>{name}</h3>
          <p>{id}</p>
        </div>
      </div>
  );
}
 
export default SearchCard;