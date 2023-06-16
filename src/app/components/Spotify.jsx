"use client";

import { useEffect, useState } from "react";

export const Spotify = () => {
    const [music, setMusic] = useState([]);
    const [searchArtist, setSearchArtist] = useState('')
    const [artist, setArtist] = useState([])


    const clientId = '236c3ccf236c4c0bba54e8bcdb4689b2';
    const clientSecret = '3e34b400e5d84b9d9d95ca6f483fa392';
    const getToken = async () => {
      const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

      try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
          },
          body: 'grant_type=client_credentials'
        });
        const data = await response.json();
        console.log('Access Token:', data.access_token);
        return data.access_token;
      } catch (error) {
        console.error('Error:', error);
      }
    };  
    useEffect(() => {
        const getList = async (accessToken) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/playlists/37i9dQZEVXbNvXzC8A6ysJ/tracks?offset=0&limit=10&locale=es-ES,es;q=0.9', {
            headers: {
                'Authorization': 'Bearer ' + accessToken
            }
            });
            const data = await response.json();
            console.log('Top music:', data);
            setMusic(data.items);
        } catch (error) {
            console.error('Error:', error);
        }
        };

        getToken().then((accessToken) => {
        getList(accessToken);
        });
  }, []);
  const getArtist = async () => {
    const query = searchArtist;
    const limit = 10;
    try{
      const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=${limit}`, {
      headers: {
          'Authorization': 'Bearer ' + await getToken()
      }
      });
      const data = await response.json();
      console.log('get artist', data.artists);
      setArtist(data.artists.items)
    }catch (error) {
      console.error('Error:', error);
    }
  }
    console.log(searchArtist)
    console.log(music)
    console.log("arr artists",artist)
  return (
    <div>
      <div>
        <h1>Más escuchados</h1>
        <ol>
          { music ? music.map((music) => (
            <li key={music.track.album.id}>{music.track.album.name} - {music.track.album.artists.map((music) => music.name).join(", ")}<img src={music.track.album.images[0]?.url} alt="" width="50px" /></li>
          )) : <div></div>} 
        </ol>
      </div>
      {/* buscador */}
      <h2>buscador</h2>
      <div>
        <div>
            <input type="text" onChange={() => setSearchArtist(event.target.value)}/>
            <button onClick={() => getArtist(searchArtist)}>Buscar</button>
        </div>
        <div>
          <ol>
            {artist? artist.map((artist)=> (
              <li key={artist.id}>{artist.name}<img src={artist.images[0]?.url} width="50px" alt="" /></li>
            )): <div></div> }
          </ol>
        </div>
      </div>
    </div>
  );
}
