
export function createNewChat(login, Name, Surname) {
    var data
    if(localStorage.getItem('DialogList') == null) {
        localStorage.setItem("DialogList", "{}")
        data = {}
    }
    else {
        data = JSON.parse(localStorage.getItem('DialogList'));
    }
    console.log(data);
    data[login] = {name: Name, surname: Surname, lastmessage: ''};
    localStorage.setItem('DialogList', JSON.stringify(data))
}