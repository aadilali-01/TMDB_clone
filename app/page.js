"use client"
import Nav from "@/components/Nav"
import styles from "./Styles/Homepage.module.css"
import { asyncGetPopularMovies, asyncGetTrendingMovies,asyncGetMoviesDetails } from '@/store/Actions/tmdbAction'
import { removeerrors } from "@/store/Reducers/MoviesReducer"
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from "next/link"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import LocomotiveScroll from "locomotive-scroll"
import { getAsyncTvShows } from "@/store/Actions/tvShowsAction"
import { Progress } from "@/components/ui/progress"




const page = () => {
  const [search, setsearch] = useState("")
  const {Movies, TrendingMovies,errors} = useSelector((state)=> state.MoviesReducer)
  const {TvShows} = useSelector((state)=> state.TvShowsReducer)
  const dispatch = useDispatch()
  const router = useRouter()

  // console.log(TvShows);

  if (errors.length > 0) {
    errors.map((e, i) => {
      toast.error(e);
    });
    dispatch(removeerrors());
  }


 
  // convert numeric date into alphanumeric function starts

  function convertNumericToDate(numericDate) {
    // Parse the numeric date into a Date object
    const dateObj = new Date(numericDate);
  
    // Define arrays for month names and suffixes
    const monthNames = [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ];
  
    const suffixes = ["st", "nd", "rd", "th"];
  
    // Get the day, month, and year components
    const day = dateObj.getDate();
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear();
  
    // Determine the day suffix (st, nd, rd, th)
    let suffix;
    if (day >= 11 && day <= 13) {
      suffix = "th";
    } else {
      const index = Math.min(day % 10, 3);
      suffix = suffixes[index];
    }
  
    // Construct the alphanumeric date string
    const alphanumericDate = `${month} ${day}${suffix}, ${year}`;
    return alphanumericDate;
  }

  // function ends here

  // locomotive Scroll


  const togglerDiv = useRef(null)
  const togglerText = useRef(null)
 


  let flag = 0
  const toggleHandler = () =>{
    if (flag === 0) {
      flag = 1
      togglerDiv.current.style.width = "9vmax"
      togglerDiv.current.style.left = "48%"
      togglerText.current.textContent = "This Week"
    }else{
      flag = 0
      togglerDiv.current.style.width = "8vmax"
      togglerDiv.current.style.left = "0%"
      togglerText.current.textContent = "Today"
    }
  }

  useEffect(()=>{
    dispatch(asyncGetTrendingMovies())
    // dispatch(getAsyncTvShows())
  },[])

  // search function

  const submitHandler = (e) => {
    e.preventDefault()
    router.push(`/search/${search}`)
  }


 


  
  return (
    <>
      <div className={styles.main}>
        <Nav />
        <div className="page1">
          <div className={styles.poster}>
            <div className={styles.overlay}>
              <h1 className={styles.welcome}>Welcome.</h1>
              <h4 className={styles.millions}>Millions of movies, TV shows and people to discover. Explore now.</h4>
              <div className={styles.search}>
                <form onSubmit={submitHandler}>
                  <input onChange={(e) => setsearch(e.target.value) } value={search} type="text" placeholder="Search for a movie,tv show, person....." />
                  <button>Search</button>
                </form>
              </div>
            </div>
            <img className={styles.posterImg} src="https://www.themoviedb.org/t/p/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/hoVj2lYW3i7oMd1o7bPQRZd1lk1.jpg" alt="" />
          </div>
          <div className={styles.trendingBox}>
            <div className={styles.trending}>
              <h2>Trending</h2>
              <div onClick={toggleHandler} className={styles.toggle}>
                <div ref={togglerDiv} className={styles.toggler}>
                  <h3 ref={togglerText}>Today</h3>
                </div>
                <p className={styles.today}>Today</p>
                <p className={styles.this}>This Week</p>
              </div>
            </div>
            <div className={styles.movies}>
            {TrendingMovies.map((movie,index)=>{
              return( 
                <div key={movie.id} className={styles.movieBox}>
                  <Link href={`/movie/${movie.id}`}>
                    <div className={styles.moviePoster}>
                      <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}?api_key=2a325f825de42d66968dbc58f1703c53`} alt="" />
                      <div className={styles.vote}>
                      <Progress value={100} />
                        {Math.floor(movie.vote_average*10)} <sup>%</sup> 
                      </div>
                    </div>
                    <h1>{movie.title}</h1>
                  </Link>
                  <small>{convertNumericToDate(movie.release_date)}</small>
                </div>
              )
              
            })}
              
            </div>
          </div>
        </div>
      
      </div>
    </>
  )
}

export default page
