const template = document.createElement('template');
template.innerHTML = `
    <style>
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

        .singleMess {
            word-wrap: break-word;
            display: inline-block;
            clear: both;
            padding: 20px;
            border-radius: 30px;
            margin-bottom: 2px;
            font-size: 3vh; 
            text-align:right;
            max-width: 70%;
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

        [animation = "newMessage"] {
            animation: msg;
            animation-duration: 0.3s;
        }
        @keyframes msg {
            0% {
                transform: scale(0);
            }
            100% {
                transform: scale(1);
            }
        }
    
    </style>
    <div class="singleMess">
        <div class="singleMessText">
        </div>
        <p class="dateTime">
        </p>
    </div>
`;

class SingleMess extends HTMLElement {
    constructor () {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$dateTime = this.shadowRoot.querySelector(".dateTime");
        this.$singleMessBlock = this.shadowRoot.querySelector(".singleMess");
        this.$singleMessTextBlock = this.shadowRoot.querySelector(".singleMessText");
    }
    init(message, WHOAMI) {
        this.$dateTime.innerHTML = message.time;
        this.$singleMessTextBlock.innerHTML = message.messageText;

        if(message.sender == WHOAMI)
            this.$singleMessBlock.setAttribute("sender", "me");
        else
            this.$singleMessBlock.setAttribute("sender", "him");
    }
    setAnimation() {
        this.$singleMessBlock.setAttribute("animation", "newMessage");
    }
}

customElements.define('single-mess', SingleMess);