import React from 'react';
import styles from './styles.module.css';
import BackArrow from '../BackArrow/BackArrow';
import { useHistory } from "react-router-dom";

function TopLine ({appState, setAppState}){
	let history = useHistory();
	return (
		<div id="profileTopLine" className={styles.topLineContainer}>
			<div id="profileBack" onClick={
				(e)=>{
					history.push(appState.prevAppPage);
				}
			}
			style={{flex: '0.2'}}
			role = "button"
			tabIndex={0}>
				<BackArrow />
			</div>
			<div className={styles.profileTopic}> Profile Page </div>
		</div>
	);
}

function ProfilePage({appState, setAppState}) {
	return (
		<div className={styles.profile_form} >
			<TopLine appState={appState} setAppState={setAppState}/>
			<img className={styles.profileImg} src="http://emilcarlsson.se/assets/rachelzane.png" alt="Avatar" />
			<div className={styles.name}>Кирилл Чеканов</div>
			<div className={styles.status}>Status: no pain no gain</div>
		</div>
	);
}

export default ProfilePage;