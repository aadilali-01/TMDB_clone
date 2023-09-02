"use client"
import { BiPlusMedical } from "react-icons/bi";
import { TbBellFilled } from "react-icons/tb";
import { CgProfile } from "react-icons/cg";
import { HiSearch } from "react-icons/hi";
import styles from "@/app/Styles/Nav.module.css"
import { useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { changePage } from "@/store/Reducers/MoviesReducer";

const Nav = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [tvDropdown, setTvDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Popular');
  const dispatch = useDispatch()

  const handleDropdownToggle = () => {
    setShowDropdown((prevState) => !prevState);
    setTvDropdown(false);
  };

  const handletvDropdownToggle = () => {
    setTvDropdown((prevState) => !prevState);
    setShowDropdown(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setShowDropdown(false); // Close the dropdown after selecting an option
  };

  const handletvOptionChange = (event) => {
    // setSelectedOption(event.target.value);
    setTvDropdown(false); // Close the dropdown after selecting an option
  };

  const pageHandler = () => {
    dispatch(changePage(1))
  }

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.leftNav}>
          <Link href="/"><img className={styles.img} src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="" /></Link>
          <div className={styles.movies}>
            <p onClick={handleDropdownToggle} className={styles.p}>Movies</p>
            {showDropdown && (
              <div className={styles.dropdown} value={selectedOption} onChange={handleOptionChange}>
                <Link onClick={pageHandler} href="/popular" value="Popular">Popular</Link>
                <Link onClick={pageHandler} href="/now_playing" value="Now Playing">Now Playing</Link>
                <Link onClick={pageHandler} href="/upcoming" value="Upcoming">Upcoming</Link>
                <Link onClick={pageHandler} href="/top_rated" value="Top Rated">Top Rated</Link>
              </div>
            )}
          </div>
          <div className={styles.shows}>
            <p onClick={handletvDropdownToggle} className={styles.p}>TV Shows</p>
            {tvDropdown && (
              <div className={styles.tvdropdown} value={selectedOption} onChange={handletvOptionChange}>
                <Link onClick={pageHandler} href="/tv/popular" value="Popular">Popular</Link>
                <Link onClick={pageHandler} href="/tv/airing_today" value="Now Playing">Airing Today</Link>
                <Link onClick={pageHandler} href="/tv/on_the_air" value="Upcoming">On TV</Link>
                <Link onClick={pageHandler} href="/tv/top_rated" value="Top Rated">Top Rated</Link>
              </div>
            )}
          </div>
          <p className={styles.p}>People</p>
          <p className={styles.p}>More</p>
        </div>
        <div className={styles.rightNav}>
          <BiPlusMedical className={styles.plus} />
          <div className={styles.en}>EN</div>
          <TbBellFilled className={styles.bell} />
          <CgProfile className={styles.bell} />
          <HiSearch className={styles.search} />
        </div>
      </div>
    </>
  )
}

export default Nav