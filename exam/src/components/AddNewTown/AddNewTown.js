import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addTownToList } from '../../actions'
// eslint-disable-next-line
import * as plusButtonStyles from './plusButtonStyles.module.css'
// eslint-disable-next-line
import * as CNDialogFormStyles from './createNewChatForm.module.css'

// create new Chat in local storage and return created chat
async function createNewTown(TownName, setFindingError, setHiding, dispatch) {
  const q = TownName.split(' ');
  if(q.length === 1){
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${TownName}&appid=7684ed29dfacd29ef3f30ff7547d3406`;
    let result = await fetch(url);
    if(result.ok) {
      const data = await result.json();
      dispatch(addTownToList(data));
      setFindingError(false);
      setHiding(true);
    } else {
      setFindingError(true);
    }
  }
  if(q.length === 2) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${q[0]}&lon=${q[1]}&appid=7684ed29dfacd29ef3f30ff7547d3406`;
    let result = await fetch(url);
    if(result.ok) {
      const data = await result.json();
      dispatch(addTownToList(data));
      setFindingError(false);
      setHiding(true);
    } else {
      setFindingError(true);
    }
  }
}

function PlusButton({ setHiding }) {
  return (
    <div
      role="button"
      id={'isActiveForSetHiding'}
      tabIndex={0}
      className={"plusbut"}
      onClick={setHiding}
    >T
      <div className={"horizontal_plus"} id={'isActiveForSetHiding'} />
      <div className={"vertical_plus"} id={'isActiveForSetHiding'} />
    </div>
  )
}

function CreateNewTownForm({isHide, handleClick, setHiding}) {
  const dispatch = useDispatch();
  const [isFoundError, setFindingError] = useState(false);
  let townNameForm = null;

  return (
    <div
      className={'modal'}
      id="isActiveForSetHiding"
      style={isHide ? { display: 'block' } : { display: 'none' }}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className={'modal_content'}>
        <span
          className={'close'}
          id="isActiveForSetHiding"
          role="button"
          tabIndex={0}
          onClick={handleClick}
        >
          &times;
        </span>
        <h2>Find Weather</h2>
        <br />
        <input
          className={'topic'}
          ref={(input) => {
            townNameForm = input
          }}
          type="text"
          name="topic"
          placeholder="Town Name or Coordinates"
        />
        <p style={{
          color: "red",
          display: isFoundError ? "block" : "none",
        }}> Town not found </p>
        <button onClick={(e)=>{
          e.preventDefault();
          createNewTown(townNameForm.value, setFindingError, setHiding, dispatch);
          townNameForm.value = '';
          }}>
          <span>AddNewTown</span>
        </button>
      </div>
    </div>
  );
}

function AddNewTown() {
  const [hidden, setHiding] = useState(false)
  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.target.id === 'isActiveForSetHiding') hidden ? setHiding(false) : setHiding(true)
  }

  return (
    <React.Fragment>
     <PlusButton setHiding={handleClick} />
     <CreateNewTownForm isHide={hidden} handleClick={handleClick} setHiding={setHiding} />
    </React.Fragment>
  )
}

export default AddNewTown
