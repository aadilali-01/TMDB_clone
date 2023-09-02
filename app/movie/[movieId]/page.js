"use client"

import styles from "@/app/Styles/MovieDetails.module.css"
import axios from "axios"
import { asyncGetMoviesDetails } from "@/store/Actions/tmdbAction"
import { useEffect, useRef, useState } from "react"
import { TfiMenuAlt } from "react-icons/tfi";
import { AiFillHeart } from "react-icons/ai";
import { BiPlay, BiSolidBookmark,BiSolidStar } from "react-icons/bi";
import { BsDot } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux"
import Nav from "@/components/Nav"
import YouTubeIframeLoader from "youtube-iframe"
import { Skeleton } from "@/components/ui/skeleton"
import { SkeletonTheme } from "react-loading-skeleton"

const page = (props) => {

  const [crew, setcrew] = useState([])
  const [cast, setcast] = useState([])

  const video = useRef(null)
  const iframeVideo = useRef(null)

  const {movieId} = props.params
  const {MovieDetails} = useSelector((state) => state.MoviesReducer)
  const trailer = MovieDetails.videos?.results.find((video) => video.type === "Trailer")
  console.log(MovieDetails);
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(asyncGetMoviesDetails(movieId))
    castNcrew()
  },[])

  // convert minutes into hours

    const convertToHoursMinutes = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    return `${hours}h ${remainingMinutes}m`;
  };

  const trailerOpenHandler = () => {
    video.current.style.display = "flex"
    iframeVideo.current.src = `https://www.youtube.com/embed/${trailer?.key}`
  }

  const trailerCloseHandler = () => {
    video.current.style.display = "none"
    iframeVideo.current.src = "#"
  }

  const errorHandler = () => {
    iframeVideo.current.style.display = "none"
  }

  const imgErrorHandler = (e) => {
    e.target.style.display = "none"
  }

  // crew and cast data

  const castNcrew = async () => {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=2a325f825de42d66968dbc58f1703c53`)
    setcrew(data.crew.filter((crew) => crew.job === "Writer" || crew.job === "Director"));
    setcast(data.cast)
  }

  // console.log(cast);


  
  
    
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <img src={`https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${MovieDetails.backdrop_path}?api_key=2a325f825de42d66968dbc58f1703c53`} alt="" />
        <div className={styles.overlay}>
          <div className={styles.poster}>
            <img src={`https://image.tmdb.org/t/p/w500//${MovieDetails.poster_path}?api_key=2a325f825de42d66968dbc58f1703c53`} alt="" />
          </div>
          <div className={styles.movieDetails}>
            <h1>{MovieDetails.title} </h1>
            <div className={styles.dates}>
              <p>{MovieDetails.release_date} <BsDot className={styles.dot} /> {MovieDetails.genres?.map(elem=>elem.name).join(', ')} <BsDot className={styles.dot} /> {convertToHoursMinutes(MovieDetails.runtime)}</p>
            </div>
            <div className={styles.userScore}>
              <div className={styles.vote}>
                {Math.floor(MovieDetails.vote_average*10)} <sup>%</sup>
              </div>
              <h3>User<br />Score</h3>
              <div className={styles.icons}>
                <TfiMenuAlt />
              </div>
              <div className={styles.icons}>
                <AiFillHeart />
              </div>
              <div className={styles.icons}>
                <BiSolidBookmark />
              </div>
              <div className={styles.icons}>
                <BiSolidStar />
              </div>
              <div onClick={trailerOpenHandler} className={styles.trailer}>
                <BiPlay className={styles.play} /> Play Trailer
              </div>

            </div>
            <div className={styles.tagline}>
              {MovieDetails.tagline}
            </div>
            <div className={styles.overview}>
              <h3>Overview</h3>
              <p>{MovieDetails.overview}</p>
            </div>
            <div className={styles.crew}>
              {
                crew.map((crew,index) =>{
                  return <div key={crew.id} className={styles.director}>
                    <h4>{crew.name}</h4>
                    <p>{crew.job}</p>
                  </div>
                })
              }
            </div>
          </div>
        </div>
        
      </div>
      <div ref={video} className={styles.video}>
        <div className={styles.videoContainer}>
          <RxCross2 onClick={trailerCloseHandler} className={styles.cross} />
          <div className={styles.player}>
            <iframe onError={errorHandler} ref={iframeVideo} src={`https://www.youtube.com/embed/${trailer?.key}`} title="youtube video" allowFullScreen ></iframe>
          </div>
        </div>
      </div>
      <div className={styles.castNrevenue}>
        <div className={styles.cast}>
          <h2>Top Billed Cast</h2>
          <div className={styles.castBox}>

            {
              cast.map((casts, i) => {
                return <div key={cast.id} className={styles.castProfile}>
                  <div className={styles.top}>
                    <img onError={imgErrorHandler} src={`https://image.tmdb.org/t/p/w500/${casts.profile_path}?api_key=2a325f825de42d66968dbc58f1703c53`} alt="" />
                  </div>
                  <div className={styles.bottom}>
                    <h4>{casts.name}</h4>
                    <h5>{casts.character}</h5>
                  </div>
                </div>
              })
            }
            
          </div>
        </div>
        <div className={styles.revenue}>
          <div className={styles.original}>
            <h4>Original Title</h4>
            <p>{MovieDetails.original_title}</p>
          </div>
          <div className={styles.original}>
            <h4>Status</h4>
            <p>{MovieDetails.status}</p>
          </div>
          <div className={styles.original}>
            <h4>Budget</h4>
            <p>{"$ "+MovieDetails.budget}</p>
          </div>
          <div className={styles.original}>
            <h4>Revenue</h4>
            <p>{"$ "+MovieDetails.revenue}</p>
          </div>
        </div>
      </div>

      
    </>
  )
}

export default page