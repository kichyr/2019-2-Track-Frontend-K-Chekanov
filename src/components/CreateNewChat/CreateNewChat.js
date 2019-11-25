import React from 'react';
import { useState } from 'react';
import * as plusButtonStyles from './plusButtonStyles.module.css';
import * as CNDialogFormStyles from './createNewChatForm.module.css';


// create new Chat in local storage and return created chat
function createNewChat(login, Name, Surname) {
	let data;
	if(localStorage.getItem('DialogList') == null) {
		localStorage.setItem('DialogList', '{}')
		data = {};
	}
	else {
		data = JSON.parse(localStorage.getItem('DialogList'));
	}
	data[login] = {name: Name, surname: Surname, lastmessage: ''};
	localStorage.setItem('DialogList', JSON.stringify(data))

	let mdata;
	if(localStorage.getItem('messages') == null) {
		localStorage.setItem('messages', '{}')
		mdata = {};
	}
	else {
		mdata = JSON.parse(localStorage.getItem('messages'));
	}
	mdata[login] = [];
	localStorage.setItem('messages', JSON.stringify(data));
	return [login, data[login]];
}

function PlusButton({setHiding}) {
	return (
		<div role = "button"
			id={'isActiveForSetHiding'}
			tabIndex={0}
			className={plusButtonStyles.plusbut}
			onClick={setHiding}>
			<div className={plusButtonStyles.horizontal_plus} id={'isActiveForSetHiding'}/>
			<div className={plusButtonStyles.vertical_plus} id={'isActiveForSetHiding'}/>
		</div>
	);
}

function CreateNewDialogForm({isHide, setHiding, setChats, chats}) {
	let loginForm = null;
	let nameForm = null;
	let surnameForm = null;
	const createChatButt = (e)=>{
		e.preventDefault();
		setChats((()=>{
			const newChats =  { ...chats };
			const [login, userData] = createNewChat(
				loginForm.value,
				nameForm.value,
				surnameForm.value
			);
			newChats[login] = userData;
			console.log(newChats);
			return newChats;
		})());
	};

	return (
		<div className={CNDialogFormStyles.modal}
			id="isActiveForSetHiding"
			style={isHide ? {display: 'block'} : {display: 'none'}}
			role = "button"
			tabIndex={0}
			onClick={setHiding}>
			<div className={CNDialogFormStyles.modal_content}>
				<span className={CNDialogFormStyles.close}
					id="isActiveForSetHiding"
					role = "button"
					tabIndex={0}
					onClick={setHiding}>&times;</span>
				<h2>Create new chat</h2><br/>
				<input className={CNDialogFormStyles.login} ref={(input) => { loginForm = input; }} type="text" name="login" placeholder="Login" />
				<input className={CNDialogFormStyles.name} ref={(input) => { nameForm = input; }} type="text" name="name" id="password" placeholder="Name" />
				<input className={CNDialogFormStyles.surname} ref={(input) => { surnameForm = input; }} type="text" name="name" id="password" placeholder="Surname" />
				<button onClick={createChatButt}><span>Create new chat</span></button>
			</div>
		</div>
	);
}

function CreateChatStuff({setChats, chats}) {
	const [hidden, setHiding] = useState(false);
	const handleClick = (e)=>{
		e.preventDefault();
		if(e.target.id === 'isActiveForSetHiding')
			hidden ? setHiding(false): setHiding(true); 
	};
	return (
		<React.Fragment>
			<PlusButton setHiding={handleClick}/>
			<CreateNewDialogForm isHide={hidden} setHiding={handleClick} setChats={setChats} chats={chats}/>
		</React.Fragment>
	);
}

export default CreateChatStuff;