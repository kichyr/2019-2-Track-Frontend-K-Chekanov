const template = document.createElement('template');
template.innerHTML = `
    <style>
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
            flex-direction: column
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
        
          
        li{
            display:inline-block;
            clear: both;
            padding: 20px;
            border-radius: 30px;
            margin-bottom: 2px;
            font-size: 3vh;
            max-width: 70%; 
          }
          
          .him{
            background: #eee;
            float: left;
          }
          
          .me{
            float: right;
            background: #0084ff;
            color: #fff;
          }
          
          .him + .me{
            border-bottom-right-radius: 5px;
          }
          
          .me + .me{
            border-top-right-radius: 5px;
            border-bottom-right-radius: 5px;
          }
          
          .me:last-of-type {
            border-bottom-right-radius: 30px;
          }

    </style>
    <form>
        <ul class="result"></ul>
        <div class = input_panel>
            <textarea name="message-text" placeholder=" Введите сообщеине"></textarea>
            <button>Send</button>
        </div>
    </form>`;

class MessageForm extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$form = this._shadowRoot.querySelector('form');
        this.$input = this._shadowRoot.querySelector('textarea');
        this.$messages = this._shadowRoot.querySelector('.result');

        this.$form.addEventListener('submit', this._onSubmit.bind(this));
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this));
    }

    _onSubmit (event) {
        event.preventDefault();
        var ul = document.createElement('li');
        ul.setAttribute("class", "me");
        ul.innerHTML = this.$input.value;
        this.$messages.appendChild(ul);
        //---------------TO_FIX-----------------
        var ul = document.createElement('li');
        ul.setAttribute("class", "him");
        ul.innerHTML = "Hi, fix me later"
        this.$messages.appendChild(ul);
        // -------------------------------------
        this.scrollToBot();
    }

    _onKeyPress (event) {
        if (event.keyCode == 13) {
            this.$form.dispatchEvent(new Event('submit'));
        }
    }

    scrollToBot() {
        let chatHistory = this.$messages;
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
}

customElements.define('message-form', MessageForm);
