import { useState } from "react";
import SearchCard from "./SearchCard";
import { Link } from "react-router-dom";

export function SearchResultUser({ datas, url }) {
  const [filter, setFilter] = useState("1");
  console.log(datas);
  const handleFilter = value => {
    setFilter(value);
    if(filter === 1){
      datas.sort((a, b) => parseFloat(b.instrument_count) - parseFloat(a.instrument_count));
    }
    else if(filter === 2){
      datas.sort((a, b) => parseFloat(b.region_count) - parseFloat(a.region_count));
    }
    else{
      datas.sort((a, b) => parseFloat(b.style_count) - parseFloat(a.style_count));
    }
  };

  //(datas[0].photo);
  return(
    <div className='search-result'>
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet" />
      <div className="search-filter-container">
        <span>&#xf0b0; Order by</span>
        <select className="search-filter" onChange={e => handleFilter(e.target.value)}>
        	<option key="1" value="1">Instrument</option>
        	<option key="2" value="2">Region</option>.
          <option key="3" value="3">Style</option>.
        </select>
      </div>
      
      <div className="search-detail">
        { datas.map(data => (
          <Link to={`/ProfilePublic/${data.user_id}`} className="profile-link">
            <SearchCard id={data.user_id} name={data.name} filename={data.photo} url={url}/>
          </Link>
        )) }
      </div>
      
    </div>
  );
}

export function SearchResultBand({ datas, url }) {
  console.log(datas);
  return(
    <div className='search-detail'>
      { datas.map(data => (
        <Link to={`/BandProfilePublic/${data.band_id}`} className="profile-link">
          <SearchCard id={data.band_id} name={data.name} filename={data.photo} url={url}/>
        </Link>
      )) }
    </div>
  );
}
