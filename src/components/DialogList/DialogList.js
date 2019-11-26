import React, { useState, useEffect } from 'react';
import TopLineDialogList from '../TopLineDialogList/TopLineDialogList';
import styles from './DialogList.module.css';
import CreateNewChat from '../CreateNewChat/CreateNewChat';


function getDialogsList() {
	const data = JSON.parse(localStorage.getItem('DialogList'));
	return data;
}



const generateList = (chats) => {
	return chats.map(
		(chat, index) => (
			<div className={styles.chatwrap} key={index.toString()}>
				<div className={styles.wrap} id={chat.chat_id}>
					<img src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
					<div className={styles.meta}>
						<div className={styles.topic}>{`${chat.topic}`} </div>
						<div className={styles.preview}>{chat.lastmessage} </div>
					</div>
					<div className={styles.addinfo}>
						<span className={styles.dot} />
						<p>21:23</p>
					</div>
				</div>
			</div>
		)
	);
};

function DialogListImpl({chats}) {
	return (
		<div className={styles.dialogsListContainer}>
			{chats !== null && generateList(chats)}
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