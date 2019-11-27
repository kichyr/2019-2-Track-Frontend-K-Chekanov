import React, {useState} from 'react';
import DialogList from './components/DialogList/DialogList';
import MessageForm from './components/DialogPage/MessageForm';
import './styles/globalStyles.css';



function App() {
	const [appState, setAppState] = useState( 
		{
			appPage: 'ChatList',
			openedChat: {
				chatId: -1,
				topic: '',
				messages: []
			}
		}
	);
	return (
		<React.Fragment>
			<MessageForm appState={appState} setAppState={setAppState}/>
			<DialogList appState={appState} setAppState={setAppState}/>
		</React.Fragment>
	);
}
export default App;