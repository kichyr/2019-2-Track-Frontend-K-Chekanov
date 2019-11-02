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
            color: transparent;
            text-shadow: 0px 0px 0px #000000;
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
        this.scrollToBot();
        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        //this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
        console.log(localStorage.getItem('messages'));
    }

    loadOldMessages(login) {
        this.$messages.innerHTML = '';
        this.login = login;
        if(localStorage.getItem('messages') == null)
            return
        var data = JSON.parse(localStorage.getItem('messages'));
        console.log("kek");
        data = data[login];
        for (let i = 0; i < data.length; i++) {
            this.displayMessage(data[i])
        }
    }

    _onSubmit (event) {
        event.preventDefault();
        if(this.$input.value == "")
            return;
        var message = new Message(this.$input.value, WHOAMI);
        saveMess(message, this.login);
        this.displayMessage(message);
        //---------------TO_FIX-----------------
        var message_bot = new Message("Hi, fix me later pls)", this.interlocutorName);
        saveMess(message_bot, this.login);
        this.displayMessage(message_bot);
        // -------------------------------------
        this.scrollToBot();
        this.$input.value = '';
    }

    dateTime() {
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
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
        var mess = document.createElement('single-mess');
        mess.init(message, WHOAMI);
        this.$messages.appendChild(mess);
    }
}

customElements.define('message-form', MessageForm);