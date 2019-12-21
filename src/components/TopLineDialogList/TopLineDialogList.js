import React from 'react'
import BurgerButton from '../BurgerButton/BurgerButton'
import './TopLineDialogList.css'

function SearchBar() {
  return <input type="text" placeholder="Search.." />
}

function TopLineDialogList() {
  return (
    <div className="container">
      <BurgerButton />
      <SearchBar />
    </div>
  )
}

export default TopLineDialogList
