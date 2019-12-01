import React, { useState, useEffect } from 'react';
import TopLineDialogList from '../TopLineDialogList/TopLineDialogList';
import styles from './DialogList.module.css';
import CreateNewChat from '../CreateNewChat/CreateNewChat';


function getDialogsList() {
	const data = JSON.parse(localStorage.getItem('DialogList'));
	return data == null ? [] : data;
}

function getChat(chatIdParameter) {
	const messages = JSON.parse(localStorage.getItem('messages'));
	const chatInfo = JSON.parse(localStorage.getItem('DialogList'))[chatIdParameter];
	console.log({chatId: chatIdParameter, topic: chatInfo.topic, messages: messages[chatIdParameter]})
	return {chatId: chatIdParameter, topic: chatInfo.topic, messages: messages[chatIdParameter]};
}


const generateList = (chats, setAppState) => (
	chats.map(
		(chat, index) => (
			<div className={styles.chatwrap} key={index.toString()}>
				<div 
					onClick={(e) => {openChat(
						chat.chat_id, setAppState);}}
					role = "button"
					tabIndex={0}
					className={styles.wrap}
					id={chat.chat_id}
				>
					<img className={styles.chatImg} src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
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
	)
);

function DialogListImpl({chats, setAppState}) {
	return (
		<div className={styles.dialogsListContainer}>
			{chats !== null && generateList(chats, setAppState)}
		</div>
	);
}

function openChat(chatId, setAppState) {
	setAppState({
		appPage: 'Chat',
		openedChat: getChat(chatId)
	});
}

function DialogList({appState, setAppState}) {
	const [chats, setChats] = useState([]);
	const loadExistingChats = () => {
		setChats(getDialogsList());
	};
	useEffect(loadExistingChats, []);

	return (
		<div className={styles.dialog_list_wrap} 
			style={appState.appPage === 'ChatList' ? {left: '0%'} : {left: '-100%'}}
		>
			<TopLineDialogList />
			<DialogListImpl chats={chats} setChats={setChats} setAppState={setAppState}/>
			<CreateNewChat setChats={setChats} chats={chats}/>
		</div>
	);
}

export default DialogList;