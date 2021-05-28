import React, {useEffect, useState} from 'react'
import './Banner.css'
import {image_url, API_KEY} from '../../config/config'
//const API_KEY = process.env.API_KEY
import YouTube from 'react-youtube';
import axios from '../../axios'

function Banner() {

    const [movie, setMovie] = useState()
    const [ytId, setYtId] = useState('')

    

    useEffect(() => {
       axios.get(`trending/all/week?api_key=${API_KEY}&language=en-US`).then((res) => {
            const movie_num = Math.floor(Math.random() * res.data.results.length)
           setMovie(res.data.results[movie_num])
           console.log(res.data.results[movie_num])
       })
    }, [])

    const opts = {
        height: '650vh',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
          cc_load_policy: 1,
          cc_lang_pref: 'en',
          color: 'red',
          controls: 0,
          modestbranding: 1,
          fs: 0,
        },
      };

      const playTrailer = (id) =>{
        console.log(id)
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(res => {
            console.log(res.data)
            if(res.data.results.length !== 0){
                setYtId(res.data.results[0])
            } else {
                console.log('Length Zero')
            }
        })
    }

    return (
        <div 
        style={{backgroundImage: `url(${image_url}${movie ? movie.backdrop_path : ''})`}}
        className="banner">
            <div className="content">
                <h1 className="title">{movie ? movie.title ? movie.title : movie.name : ''}</h1>
                <div className="banner_buttons">
                    <button onClick={() => movie && playTrailer(movie.id)} className="button">Play</button>
                    <button onClick={() => alert('Backend is not yet finished! Unitl then this feature is not available')} className="button">My List</button>
                </div>
                <h1 className="description">{movie ? movie.overview : ''}</h1>
            </div>
            <div className="fade_bottom"></div>
            <div className="yt">
            { ytId && <YouTube 
            videoId={ytId.key} 
            opts={opts} 
            onEnd={() => setYtId('')}
           /> }
        </div>
        </div>
    )
}

export default Banner
