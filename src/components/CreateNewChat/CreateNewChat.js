import React, { useState }  from 'react';
import * as plusButtonStyles from './plusButtonStyles.module.css';
import * as CNDialogFormStyles from './createNewChatForm.module.css';


// create new Chat in local storage and return created chat
function createNewChat(Topic) {
	let data;
	if(localStorage.getItem('DialogList') == null) {
		localStorage.setItem('DialogList', '[]');
		data = [];
	}
	else {
		data = JSON.parse(localStorage.getItem('DialogList'));
	}
	data.push({chat_id: data.length, topic: Topic, lastmessage: ''});
	localStorage.setItem('DialogList', JSON.stringify(data));
	let mdata;
	if(localStorage.getItem('messages') == null) {
		localStorage.setItem('messages', '{}');
		mdata = {};
	}
	else {
		mdata = JSON.parse(localStorage.getItem('messages'));
	}
	mdata[data.length] = [];
	localStorage.setItem('messages', JSON.stringify(mdata));
	return data[data.length - 1];
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
	let topicForm = null;
	const createChatButt = (e)=>{
		e.preventDefault();
		setChats((()=>{
			const newChat = createNewChat(topicForm.value);
			const newChats =  [...chats, newChat];
			return newChats;
		})());
		setHiding(e);
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
				<input className={CNDialogFormStyles.topic} ref={(input) => { topicForm = input; }} type="text" name="topic" placeholder="Chat Topic" />
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