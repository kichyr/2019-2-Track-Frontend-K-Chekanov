import {Message, saveMess} from "./LocalStorage"
const template = document.createElement('template');
template.innerHTML = `
    <style>
        top-line {
            flex: 1.5;
        }
        .input_panel {
            background: #eee;
            flex: 1;
            padding: 25px;
            opacity: 1;
            display: flex;
            font-family: Helvetica, Arial, sans-serif;
        }

        textarea {
            flex: 8;
            font-size: 3vh;
            border-radius: 20px;
            overflow:hidden;
            padding-left: 20px;
        }
        button {
            background-color: #0084ff;
            color: #fff;
            font-size: 3vh;
            border-radius: 20px;
            flex: 1;
        }

        form {
            flex: 1;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        .result {
            vertical-align: bottom;
            color: blue;
            overflow-y: auto;
            flex: 14;
        }
        ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
        }
            
        ::-webkit-scrollbar-track {
            border: 1px solid blue;
            border-radius: 10px;
            }
            
        ::-webkit-scrollbar-thumb {
            background: blue;
            border-radius: 10px;
            }
            
        ::-webkit-scrollbar-thumb:hover {
            background: #88ba1c;  
            }

        input[type=submit] {
            visibility: collapse;
        }
        
          
        .singleMess {
            display:inline-block;
            clear: both;
            padding: 20px;
            border-radius: 30px;
            margin-bottom: 2px;
            font-size: 3vh;
            max-width: 70%; 
            margin-top: 10px;
            text-align:right;
        }
        
        [sender = him]{
        background: #eee;
        float: left;
        }
        
        [sender = me]{
        float: right;
        background: #0084ff;
        color: #fff;
        }
        
    [sender]{
        border-bottom-right-radius: 5px;
    }
        
    [sender = me]{
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
        
    [sender = him]:last-of-type {
        border-bottom-right-radius: 30px;
    }

    .dateTime {
        font-size: 2vh;
        margin: 0;
        align: right;
    }
    [sender = me] .dateTime {
        color: LightGray;
    }
    [sender = him] .dateTime {
        color: Gray;
    }
        
    </style>
    <form>
        <top-line></top-line>
        <div class="result"></div>
        <div class = input_panel>
            <textarea name="message-text" placeholder="Введите сообщеине"></textarea>
            <button>Send</button>
        </div>
    </form>`;


var WHOAMI = 'me';

class MessageForm extends HTMLElement {
    constructor () {
        super();
        this.interlocutorName = "him";
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('textarea');
        this.$messages = this._shadowRoot.querySelector('.result');
        this.loadOldMessages();

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    }

    loadOldMessages() {
        if(localStorage.getItem('messeges') == "")
            return;
        var data = JSON.parse(localStorage.getItem('messeges'));
        for (let i = 0; i < data.length; i++) {
            this.displayMessage(data[i])
        }
    }

    _onSubmit (event) {
        event.preventDefault();
        var message = new Message(this.$input.value, WHOAMI);
        saveMess(message);
        this.displayMessage(message);
        //---------------TO_FIX-----------------
        var message_bot = new Message("Hi, fix me later pls)", this.interlocutorName);
        saveMess(message_bot);
        this.displayMessage(message_bot);
        // -------------------------------------
        this.scrollToBot();
        this.$input.value = '';
    }

    dateTime() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        return date + " " + time;
    }

    _onKeyPress(event) {
        if (event.keyCode == 13) {
            this.$form.dispatchEvent(new Event('submit'));
        }
    }

    scrollToBot() {
        let chatHistory = this.$messages;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }

    displayMessage(message) {
        var mess = document.createElement('div');
        mess.setAttribute("class", "singleMess");
        var dateTime = document.createElement('p');
        dateTime.setAttribute("class", "dateTime");
        dateTime.innerHTML = message.time;
        if(message.sender == WHOAMI)
            mess.setAttribute("sender", "me");
        else
            mess.setAttribute("sender", "him");
        mess.innerHTML = message.messageText;
        mess.appendChild(dateTime);
        this.$messages.appendChild(mess);
    }
}

customElements.define('message-form', MessageForm);
