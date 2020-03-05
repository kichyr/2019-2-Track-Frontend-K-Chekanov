import React, { useEffect } from 'react';
import {useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as styles from './DialogList.module.css';
import TopLineDialogList from '../TopLineTownList/TopLineDialogList';
import { addTownToList } from '../../actions/index';
import AddNewTown from '../AddNewTown/AddNewTown';



const townshardcode = [707860, 519188, 1283378, 1270260];

const GenerateList = (towns) => {
  let history = useHistory();
  return towns.map((town, index) => (
    <div className={"chatwrap"} key={index.toString()}>
      <div
        onClick={(e) => {
          history.push(`${window.publicUrl}/town/${town.id}`)
        }}
        role="button"
        tabIndex={0}
        className={"wrap"}
        id={index}
      >
        <img className={"chatImg"} src={`http://openweathermap.org/img/wn/${town.weather[0].icon}@2x.png`} alt="" />
        <div className={"meta"}>
          <div className={styles.topic}> <h4 style={{margin: '5px'}}>{`${town.name}`}</h4> </div>
          <div className={styles.preview}>{town.weather[0].description}</div>
        </div>
        <div className={styles.addinfo}>
        <p>{Math.round(100 * (town.main.temp - 273.15)) /100 + '°C'}</p>
        </div>
      </div>
    </div>
  ))
}

function TownListImpl() {
  const towns = useSelector(state => state.townsReducer);

  return <div className={'dialogsListContainer'}>{GenerateList(towns)}</div>
}

function loadTown(town_id, dispatch) {
    const url = `https://api.openweathermap.org/data/2.5/weather?id=${town_id}&appid=7684ed29dfacd29ef3f30ff7547d3406`;
    console.log("sdsfs")
    fetch(url)
    .then(resp => resp.json())
    .then(function(data) {
        console.log(data);
        dispatch(addTownToList(data))
    })
    .catch(function(error) {
        console.log(error);
    });
}

function loadExistingTowns(townList, dispatch) {
  // eslint-disable-next-line
    townList.map((id, index) => {loadTown(id, dispatch);})
}


function TownList() {
  const dispatch = useDispatch();
  let towns = useSelector(state => state.townsReducer);
  useEffect(()=>{
    if (towns.length === 0)
      loadExistingTowns(townshardcode,dispatch)}, []);
  return (
    <div className={'dialog_list_wrap'}>
      <TopLineDialogList />
      <TownListImpl/>
      <AddNewTown/>
    </div>
  )
}

export default TownList;
