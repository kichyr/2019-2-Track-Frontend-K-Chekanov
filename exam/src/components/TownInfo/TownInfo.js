import React, { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import {useSelector, useDispatch } from 'react-redux'
// eslint-disable-next-line
import styles from './styles.module.css'
import BackArrow from '../BackArrow/BackArrow'
import { setInExtraInfoPage } from '../../actions'

function TopLine() {
  const history = useHistory()
  return (
    <div id="profileTopLine"
        onClick={(e) => {
        history.push(`${window.publicUrl}/}`)
        }} 
        className={'topLineContainer'}
      >
      <div
        id="profileBack"
        style={{ flex: '0.2' }}
        role="button"
        tabIndex={0}
      >
        <BackArrow />
      </div>
      <div className={'profileTopic'}> Extra Info </div>
    </div>
  )
}

function loadWeather(townId, dispatch) {
  const url = `https://api.openweathermap.org/data/2.5/weather?id=${townId}&appid=7684ed29dfacd29ef3f30ff7547d3406`;
  console.log("sdsfs")
  fetch(url)
  .then(resp => resp.json())
  .then(function(data) {
      console.log(data);
      dispatch(setInExtraInfoPage(data))
  })
  .catch(function(error) {
      console.log(error);
  });
}

function TownInfo(props) {
  let { townId } = useParams();
  const dispatch = useDispatch();
  const info = useSelector(state => state.openedWeatherReducer);
  useEffect(()=>{
    console.log(townId);
      loadWeather(townId, dispatch);
    }, [townId]
  );
  return (
    info.weather !== undefined &&
    <div className={'profile_form'}>
      <TopLine/>
      <div style={{display: "flex"}}>
        <div className={'name'} style={{display:'flex', alignItems: 'center', justifyContent: 'center'}}>{info.name}</div>
        <img className={''} src={`http://openweathermap.org/img/wn/${info.weather[0].icon}@2x.png`} alt="Weather" />
        <div className={'name'} style={{display: 'flex', flexDirection: 'column'}}>  
          <p>{info.weather[0].main}</p>
          <p>{Math.round(100 * (info.main.temp - 273.15)) / 100 + '°C'}</p>
        </div>
      </div>
      <div  className={'name'}> longitude: {info.coord.lon} latitude: {info.coord.lat} </div>
      <div className={'status'}>Status: no pain no gain</div>
    </div>
  );
}

export default TownInfo;
