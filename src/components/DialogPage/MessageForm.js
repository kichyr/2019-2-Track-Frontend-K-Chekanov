import React, { useState, useEffect } from 'react';
import BurgerButton from '../BurgerButton/BurgerButton';
import singleMessStyles from './singleMessage.module.css';
import WHOAMI from '../whoami';
import topLineStyles from './topLine.module.css';
import styles from './styles.module.css';
// to delete
function getTime() {
	const today = new Date();
	const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
	const time = `${today.getHours()}:${today.getMinutes()  }:${today.getSeconds()}`;
	return `${date} ${time}`;
}
//

function getChatMessages(chatId) {
	const messages = localStorage.getItem('messages');
	return [ messages[chatId].topic, messages[chatId].messages ];
}

function postMessage(chatId, userId, messageText) {
	const data = JSON.parse(localStorage.getItem('messages'));
	const newMessage = new Message(chatId, userId, messageText);
	data[chatId].message.push(newMessage);
}

class Message {
	constructor(chatId, userId, messageText) {
		this.messageText = messageText;
		this.userId = userId;
		this.time = getTime();
		this.chatId = chatId;
	}
}

function TopLine({topic, setAppState}) {
	return (
		<div className={topLineStyles.container}>
			<BurgerButton onClick={
				(e)=>{setAppState.appPage='Chat'}
			}/>
			<div className={topLineStyles.topic}> {topic} </div>
			<img className={topLineStyles.chatImg} src="http://emilcarlsson.se/assets/rachelzane.png" alt="Avatar" />
		</div>
	);
}

function MessagesContainer({messages}) {
	return (
		<div className={styles.result}>
			{messages.map(
				(message, index) => (
					<div className={singleMessStyles.singleMess}
						key={index.toString}
						sender={Message.userId === WHOAMI.userId ? 'me' : 'him'}
					>
						<div className={singleMessStyles.singleMessText}> {message.text} </div>
						<p className={singleMessStyles.dateTime}> {message.time} </p>
					</div>
				)
			)}
		</div>
	);
}

function InputPanel({appState, setAppState}) {
	return (
		<div className={styles.input_panel}>
			<textarea name={styles.messageText} placeholder="Введите сообщеине" />
			<button>Send</button>
		</div>
	);
}

function MessageForm({appState, setAppState}) {
	return (
		<div className={styles.message_form} 
			style={appState.appPage === 'ChatList' ? {left: '100%'} : {left: '0%'}}
		>
			<TopLine topic={appState.openedChat.topic} setAppState={setAppState}/>
			<MessagesContainer 
				messages={appState.openedChat.messages}
			/>
			<InputPanel appState={appState} setAppState={setAppState}/>
		</div>
	);
}

export default MessageForm;
