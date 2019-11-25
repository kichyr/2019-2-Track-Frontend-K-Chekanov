import React, { useState, useEffect } from 'react';
import TopLineDialogList from '../TopLineDialogList/TopLineDialogList';
import styles from './DialogList.module.css';
import CreateNewChat from '../CreateNewChat/CreateNewChat';


function getDialogsList() {
	console.log(localStorage.getItem('DialogList'));
	const data = JSON.parse(localStorage.getItem('DialogList'));
	return data;
}



const generateList = (chats) => {
	let index = 0;
	const chatList = [];
	let chat = null;
	for(chat in chats){
		if (chats.hasOwnProperty(chat)){
			chatList.push(
				<div className={styles.chatwrap} key={index.toString()}>
					<div className={styles.wrap}>
						<img src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
						<div className={styles.meta}>
							<div className="name">{`${chats[chat].name} ${chats[chat].surname}`} </div>
							<div className="preview">{chats[chat].lastmessage} </div>
							<div className={styles.addinfo}>
								<span className={styles.dot} />
								<p>21:23</p>
							</div>
						</div>
					</div>
				</div>
			);
			index += 1;
		}
	}
	return chatList;
};

function DialogListImpl({chats}) {
	return (
		<div className={styles.dialogsListContainer}>
			{chats !== undefined && generateList(chats)}
		</div>
	);
}

function DialogList() {
	const [chats, setChats] = useState([]);

	const loadExistingChats = () => {
		setChats(getDialogsList());
	};
	useEffect(loadExistingChats, []);

	return (
		<React.Fragment>
			<TopLineDialogList />
			<DialogListImpl chats={chats} setChats={setChats}/>
			<CreateNewChat setChats={setChats} chats={chats}/>
		</React.Fragment>
	);
}

export default DialogList;