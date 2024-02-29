import { useState, useRef } from "react";
import { SearchResultUser, SearchResultBand }  from "./SearchResult";

export function SearchMusician ({url}) {
  const [instrument, setInstrument] = useState([]);
  const [region, setRegion] = useState([]);
  const [style, setStyle] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const ref = useRef(null);

  const handleInstrumentChange = (e) => {
    const value = parseInt(e.target.defaultValue);
    if (e.target.checked) {
      setInstrument(instrument => [...instrument, `${value}`]);
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
      setStyle(item => [...item, `${value}`]);
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
    setIsPending(true);
    
    const formData = new FormData();
    instrument.forEach(item => { formData.append('instrument', item) });
    region.forEach(item => { formData.append('region', item) });
    style.forEach(item => { formData.append('style', item) });
    formData.append("role", "musician");

    fetch( url , {
      method: 'POST',
      headers: { 'ngrok-skip-browser-warning': 'true' },
      body: formData
    }).then(
      res => res.json()
    ).then((data) => {
      console.log(data);
      console.log('Successfully search!');
      setSearchData(data);
      setIsPending(false);
      if(searchData) setHasResult(true);
      else window.alert("No matching musician.");
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    })
  }

  const styles = ['J-rock', 'Metal', 'J-pop', 'Lo-Fi', 'Jazz', 'Post Rock', 'Math Rock', 'Acoustic', 'Softcore', 'Pop-Punk', 'Country', "Others"];
  const regions = [["KLU", "基隆市"], ["TPH", "新北市"], ["TPE", "臺北市"], ["TYC", "桃園市"], ["HSH", "新竹縣"], ["HSC", "新竹市"], ["MAL", "苗栗縣"], ["TXG", "臺中市"], ["CWH", "彰化縣"], ["NTO", "南投縣"], ["YLH", "雲林縣"], ["CHY", "嘉義縣"], ["CYI", "嘉義市"], ["TNN", "臺南市"], ["KHH", "高雄市"], ["IUH", "屏東縣"], ["ILN", "宜蘭縣"], ["HWA", "花蓮縣"], ["TTT", "臺東縣"], ["PEH", "澎湖縣"], ["GNI", "綠島"], ["KYD", "蘭嶼"], ["KMN", "金門縣"], ["LNN", "連江縣"]];
  const Instruments = ["Electric Guitar", "KB", "Drums", "Bass", "Vocal", "Saxophone", "Cello", "Acoustic Guitar", "Trumpet", "Others"];
  return (
    <div className="search">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet" />
      <div className="filter">
        <h2>Search for a Player!</h2>
        <form onSubmit={handleSubmit}>
          <div className="instrument">
            <h4>Instrument:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {Instruments.map((instrument, index) => (
                  <li><input type="checkbox" id={index} value={index+1} name={instrument} onChange={handleInstrumentChange}/><label for={index}>{instrument}</label></li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <br />
          <div className="region">
            <h4>Region:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {regions.map((region, index) => (
                  <li><input type="checkbox" id={10 + index} value={region[0]} name={region[1]} onChange={handleRegionChange}/><label for={10 + index}>{region[1]}</label></li>
                ))}
              </ul>
            </div>
          </div>	
          <br />
          <br />
          <div className="style">
            <h4>Style:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {styles.map((style, index) => (
                  <li><input type="checkbox" id={34 + index} value={index+1} name={style} onChange={handleStyleChange}/><label for={34 + index}>{style}</label></li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <br />
          { !isPending && (<button>&#xf002;&nbsp;&nbsp;Search</button>) }
          { isPending && (<button disabled style={{color: "#5b75a9"}}>Searching...</button>) }
        </form>
      </div>
      { hasResult && 
      (<div className="result" ref={ref}>
        <SearchResultUser datas={searchData} url={url}></SearchResultUser>
      </div>) }
  </div>
  
  );
}

export function SearchBand ({url}) {
  const [region, setRegion] = useState([]);
  const [style, setStyle] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const ref = useRef(null);

  const handleStyleChange = (e) => {
    const value = parseInt(e.target.defaultValue);
    if (e.target.checked) {
      setStyle(item => [...item, `${value}`]);
      console.log('Add ' + value + ' successfully!');
    }
    else {
      setStyle(style.filter(item => item !== value));
      console.log('Delete ' + value + ' successfully!');
    }
  };

  const handleRegionChange = (e) => {
    const value = e.target.defaultValue;
    if (e.target.checked) {
      setRegion(item => [...item, `${value}`]);
      console.log('Add ' + value + ' successfully!');
    }
    else {
      setRegion(region.filter(item => item !== value));
      console.log('Delete ' + value + ' successfully!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsPending(true);
    
    const formData = new FormData();
    region.forEach(item => { formData.append('region', item) });
    style.forEach(item => { formData.append('style', item) });
    formData.append("role", "band");

    fetch(url, {
      method: 'POST',
      headers: { 'ngrok-skip-browser-warning': 'true' },
      body: formData
    }).then(
      res => res.json()
    ).then((data) => {
      console.log(data);
      console.log('Successfully search!');
      setSearchData(data);
      setIsPending(false);
      if(searchData) setHasResult(true);
      else window.alert("No matching band.");
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    })
  }

  const styles = ['J-rock', 'Metal', 'J-pop', 'Lo-Fi', 'Jazz', 'Post Rock', 'Math Rock', 'Acoustic', 'Softcore', 'Pop-Punk', 'Country', "Others"];
  const regions = [["KLU", "基隆市"], ["TPH", "新北市"], ["TPE", "臺北市"], ["TYC", "桃園市"], ["HSH", "新竹縣"], ["HSC", "新竹市"], ["MAL", "苗栗縣"], ["TXG", "臺中市"], ["CWH", "彰化縣"], ["NTO", "南投縣"], ["YLH", "雲林縣"], ["CHY", "嘉義縣"], ["CYI", "嘉義市"], ["TNN", "臺南市"], ["KHH", "高雄市"], ["IUH", "屏東縣"], ["ILN", "宜蘭縣"], ["HWA", "花蓮縣"], ["TTT", "臺東縣"], ["PEH", "澎湖縣"], ["GNI", "綠島"], ["KYD", "蘭嶼"], ["KMN", "金門縣"], ["LNN", "連江縣"]];
  return (
    <div className="search">
      <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css" rel="stylesheet" />
      <div className="filter">
        <h2>Find a Band!</h2>
        <form onSubmit={handleSubmit}>
          <div className="region">
            <h4>Region:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {regions.map((region, index) => (
                  <li><input type="checkbox" id={10 + index} value={region[0]} name={region[1]} onChange={handleRegionChange}/><label for={10 + index}>{region[1]}</label></li>
                ))}
              </ul>
            </div>
          </div>	
          <br />
          <br />
          <div className="style">
            <h4>Style:</h4>
            <div className="container">
              <ul className="ks-cboxtags">
                {styles.map((style, index) => (
                  <li><input type="checkbox" id={34 + index} value={index} name={style} onChange={handleStyleChange}/><label for={34 + index}>{style}</label></li>
                ))}
              </ul>
            </div>
          </div>
          <br />
          <br />
          { !isPending && (<button>&#xf002;&nbsp;&nbsp;Search</button>) }
          { isPending && (<button disabled style={{color: "#5b75a9"}}>Searching...</button>) }
        </form>
      </div>
      { hasResult && 
      (<div className="result" ref={ref}>
        <SearchResultBand datas={searchData} url={url}></SearchResultBand>
      </div>) }
  </div>
  
  );
}