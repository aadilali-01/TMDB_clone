"use client"

import styles from "@/app/Styles/Movies.module.css"
import Nav from "@/components/Nav";
import { changePage } from '@/store/Reducers/MoviesReducer';
import Link from "next/link";
import React, { useEffect, useState } from 'react'
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from "react-infinite-scroll-component";
import { getAsyncTvShows } from "@/store/Actions/tvShowsAction";

const page = ({params}) => {
  const [click, setclick] = useState(params.popular)
  const {TvShows} = useSelector((state) => state.TvShowsReducer)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getAsyncTvShows(params.popular))
  },[TvShows])
  


  function convertNumericToDate(numericDate) {
    // Parse the numeric date into a Date object
    const dateObj = new Date(numericDate);
  
    // Define arrays for month names and suffixes
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
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

  const handlePageClick = (e) => {
    dispatch(changePage((e.selected + 1)))
  }

 





  return (
    <>
      <div className={styles.main}>
        <Nav />
        <div className={styles.container}>
            {TvShows.map((tvShows,index)=>{
              return <div key={tvShows.id} className={styles.card}>
                        <Link href={`/tvShow/${tvShows.id}`}>
                          <div className={styles.movieImage}>
                            <img src={`https://image.tmdb.org/t/p/w500//${tvShows.poster_path}?api_key=2a325f825de42d66968dbc58f1703c53`} alt="" />
                          </div>
                        </Link>
                        <div className={styles.movieDetails}>
                        <Link href={`/tvShow/${tvShows.id}`}><h3>{tvShows.name}</h3></Link>
                          <p>{convertNumericToDate(tvShows.first_air_date)}</p>
                        </div>
                      </div>
            })}
        </div>
        <ReactPaginate
        className={styles.pagination}
        activeClassName={styles.selected}
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={10}
        previousLabel="< previous"
      />
      </div>
    </>
  )
}

export default page