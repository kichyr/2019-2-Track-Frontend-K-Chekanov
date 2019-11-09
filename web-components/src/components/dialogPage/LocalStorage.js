function getTime() {
    const today = new Date()
    const date = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`
    const time = `${today.getHours()}:${today.getMinutes()  }:${today.getSeconds()}`
    return `${date} ${time}`
}

export class Message{
    constructor(messageText, sender) {
        this.messageText = messageText;
        this.sender = sender;
        this.time = getTime();
    }
}
export function saveMess(message, login) {
    let data = JSON.parse(localStorage.getItem('messages'));
    if(data[login] == null) {
        data[login] = [];
    }
    data[login].push(message);
    localStorage.setItem('messages', JSON.stringify(data));
    data = JSON.parse(localStorage.getItem('DialogList'));
    data[login].lastmessage = message;
}