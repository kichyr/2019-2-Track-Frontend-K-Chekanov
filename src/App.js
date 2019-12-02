import React, {useState, useEffect} from 'react';
import DialogList from './components/DialogList/DialogList';
import MessageForm from './components/DialogPage/MessageForm';
import ProfilePage from './components/ProfilePage/ProfilePage'
import './styles/globalStyles.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	withRouter
} from "react-router-dom";
import { match } from 'minimatch';



const App = withRouter((props) => {
	const [appState, setAppState] = useState( 
		{
			appPage: '', // Chat, ProfilePage
			prevAppPage: 'ChatList',
			openedChat: {
				chatId: -1,
				topic: '',
				messages: []
			}
		}
	);
useEffect(()=>{
	switch (props.location.pathname) {
		case '/':
			if (appState.appPage !== 'ChatList')
				setAppState({...appState, prevAppPage: appState.appPage, appPage: 'ChatList'});
			break;

		case '/profile':
			if (appState.appPage !== 'ProfilePage')
				setAppState({...appState, prevAppPage: appState.appPage, appPage: 'ProfilePage'});
			break;
			
		case '/chat':
			if (appState.appPage !== 'Chat')
				setAppState({...appState, prevAppPage: appState.appPage, appPage: 'Chat'});
			break;	
		default:
			break;
	}
},[]);

	useEffect(
		()=>{
			switch (appState.appPage) {
				case 'ProfilePage':
					props.history.replace('profile');
					break;
				
				case 'ChatList':
					props.history.push('/');
					break;
			
				case 'Chat':
					props.history.replace('/chat');
					break;
				default:
					break;
			}
			
		},
		[appState.appPage]
	);
	console.log(appState.appPage + appState.appPage);
	return (
		<React.Fragment>
			<MessageForm appState={appState} setAppState={setAppState}/> 
			<DialogList appState={appState} setAppState={setAppState}/> 
			<ProfilePage appState={appState} setAppState={setAppState} />
		</React.Fragment>
	);
});

const RouteApp = (() => {
	return (
		<Router>
			<Switch>
				<Route path='/(profile||Chat)' 
					component={App}
				/> 
			</Switch>
		</Router>
	);
});

export default RouteApp;