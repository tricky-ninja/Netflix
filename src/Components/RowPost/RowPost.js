import React, {useEffect, useState} from 'react'
import YouTube from 'react-youtube';
import './RowPost.css'
import {image_url, API_KEY} from '../../config/config'
//const API_KEY = process.env.API_KEY
import axios from '../../axios'

function RowPost({
    title,
    isSmall,
    url
}) {

    const [movies, setMovies] = useState([])
    const [ytId, setYtId] = useState('')

    useEffect(() => {
        axios.get(url).then(res => {
            console.log(res.data)
            setMovies(res.data.results)
        }).catch(err => {
            alert(err)
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
                alert('No Video Found!')
            }
        })
      }

    return (
        <div className="row">
            { ytId && <YouTube 
            videoId={ytId.key} 
            opts={opts} 
            onEnd={() => setYtId('')}
           /> }
            <h2>{title}</h2>
            <div className='posters'>
                {
                    movies.map((obj, index) =>
                        <img onClick={()=>playTrailer(obj.id)} key={index} className={isSmall ? 'smallPoster' : 'poster'} src={image_url+obj.backdrop_path} alt="poster" />
                     )
                                           
                }
                
            </div>
            
          
        </div>
    )
}

export default RowPost
