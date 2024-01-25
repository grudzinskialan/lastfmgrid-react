// src/components/TopAlbums.js
import { useState, useEffect } from 'react';
import axios from 'axios';
// import { GridSelect } from 'react-grid-select';

const TopAlbums = () => {
  const [username, setUsername] = useState('');
  const [period, setPeriod] = useState('overall');
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [topAlbums, setTopAlbums] = useState([]);
//   const [selectedArea, setSelectedArea] = useState({ width: null, height: null });

  const apikey = '8cbc46700844a7ef8977c3bbe441ca0b';
  const limit = rows * cols;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${period}&limit=${limit}&api_key=${apikey}&format=json`
        );
            console.log(response);
        setTopAlbums(response.data.topalbums.album);
      } catch (error) {
        console.error('Error fetching data from Last.fm:', error);
      }
    };

    fetchData();
    
  }, [username, period, rows, cols, limit]);

  return (
    <div>
           <div style={{position: 'absolute',
        left:'0px',
        top:'0px'}}>
           <h2>Top Albums</h2>
           <div>
               <label>
               Username:
               <input
                   type="text"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
               />
               </label>
           </div>
           <div>
               <label>
               Period:
               <select value={period} onChange={(e) => setPeriod(e.target.value)}>
                   <option value="overall">Overall</option>
                   <option value="7day">Last 7 Days</option>
                   <option value="1month">Last 1 Month</option>
                   <option value="3month">Last 3 Months</option>
                   <option value="6month">Last 6 Months</option>
                   <option value="12month">Last 12 Months</option>
               </select>
               </label>
           </div>

           <div>
               <label>
               Rows:
               <input
                   type="number"
                   value={rows}
                   onChange={(e) => setRows(e.target.value)}
               />
               </label>
           </div>
           <div>
               <label>
               Cols:
               <input
                   type="number"
                   value={cols}
                   onChange={(e) => setCols(e.target.value)}
               />
               </label>
           </div>
        </div>
      <div style={{
        position: "relative",
            display: 'grid',
            objectFit: "contain",
            gridTemplateColumns: `repeat(${cols}, 1fr)`,
            gap: '0px' }}>

        {console.log(topAlbums)}
        {console.log(rows)}
        {console.log(cols)}

        {topAlbums.map((album) => (
          <div key={album.name}>
              <p style={{  
                position: "relative",
                top: "35px",
                left: "3px",
                maxWidth: '174px',
                width: '100%',
                objectFit: "contain",
                fontWeight: "400",
                fontFamily: "monospace",
                fontSize: 'small',
                textShadow: "2px 0 0 #000, 0 -2px 0 #000, 0 2px 0 #000, -2px 0 0 #000",
                overflow: "hidden",
                display: "-webkit-box",
                '-webkit-box-orient': "vertical",
                '-webkit-line-clamp': '1'}} >
                    {album.name}</p>
            <img src={album.image[2]['#text']} alt={album.name} style={{height: '100%',
                objectFit: 'cover'}} />
            {/* <p></p> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopAlbums;
