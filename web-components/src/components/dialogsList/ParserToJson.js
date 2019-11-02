
export function createNewChat(login, Name, Surname) {
    var data
    if(localStorage.getItem('DialogList') == null) {
        localStorage.setItem("DialogList", "{}")
        data = {}
    }
    else {
        data = JSON.parse(localStorage.getItem('DialogList'));
    }
    data[login] = {name: Name, surname: Surname, lastmessage: ''};
    localStorage.setItem('DialogList', JSON.stringify(data))

    if(localStorage.getItem('messages') == null) {
        localStorage.setItem("messages", "{}")
        data = {}
    }
    else {
        data = JSON.parse(localStorage.getItem('messages'));
    }
    data[login] = [];
    localStorage.setItem('messages', JSON.stringify(data));
    console.log(localStorage.getItem('messages'));
}

export function getDialogsList() {
    var data = JSON.parse(localStorage.getItem('DialogList'));
    return data;
}