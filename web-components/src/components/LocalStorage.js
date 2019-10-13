function getTime() {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    return date+' '+time;
}

export class Message{
    constructor(messageText, sender) {
        this.messageText = messageText;
        this.sender = sender;
        this.time = getTime();
    }
}
export function saveMess(message) {
    console.log(localStorage.getItem('messeges'));
    var data;
    if(localStorage.getItem('messeges') == "") {
        localStorage.setItem("messeges", "[]");
        data = {};
    }
    data = JSON.parse(localStorage.getItem('messeges'));
    data.push(message)
    localStorage.setItem('messeges', JSON.stringify(data))
    console.log(data)
}