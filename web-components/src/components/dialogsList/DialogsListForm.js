import {getDialogsList} from './ParserToJson'

const template = document.createElement('template');
template.innerHTML = `
<style>
/* The Modal (background) */
.modal {
    font-size: 3vh;
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    padding-top: 100px; /* Location of the box */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content */
.modal-content {
  background-color: #fefefe;
  margin: auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
}

/* The Close Button */
.close {
    font-size: 6vh;
    color: #aaaaaa;
    float: right;
    font-weight: bold;
}

.close:hover,
.close:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.plusbut {
    position: fixed;
    right: 3vh;
    bottom: 3vh;
    border-radius: 50%;
    width: 8vh;
    height: 8vh;

    background-color: #0084ff;
  }
  
  .horizontal-plus {
    position: relative;
    background-color: #FFFFFF;
    width: 50%;
    height: 12.5%;
    left: 25%;
    top: 43.75%;
  }
  .vertical-plus {
    position: relative;
    background-color: #FFFFFF;
    width: 12.5%;
    height: 50%;
    left: 43.75%;
    top: 12.5%;
  }
.container {
    display: flex;
    flex-direction: column;
    height: 100%;
}

dialog_list_top-line {
    flex: 1.5;
}

.dialogsListContainer {
    flex: 15;
}

adder-new-dialog-button {
    position: fixed;
    height: 100%;
    bottom: 0px;
    width:100%;
    left: 0px;
}

.chatwrap {
    display: flex;
    width: 100%;
    justify-content: center;
    height: 15%;
    align-items: center;
}
.wrap {
    width: 95%;
    height: 90%;
    align-items: center;
    background-color: #eee;
    display: flex;
    flex-direction: row;
    border-radius: 2vh;
    font-size: 3vh;
}
.wrap:hover, .wrap:active {
    background-color: #c0c0c0;
}
.meta {
    flex:10;
}

.addinfo {
    flex: 1;
    width: 5 vh;
    display: flex;
}
img {
    margin: 3vh;
    flex: 1;
    max-height: 10vh;
    max-width: 10vh;
    border-radius: 50%;
}
.preview {
    color: blue;
    width: 420px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 5vh;
    margin: 1vh;
}
.name {
    font-weight: bold;
    margin: 1vh;
}

p{
    font-size: 3vh;
    margin: 5px;
}
.dot {
    margin-top: 7px;
    height: 3vh;
    width: 3vh;
    background-color: #92C1F0;
    border-radius: 50%;
    display: inline-block;
  }
</style>

<div class="container">
    <dialog_list_top-line></dialog_list_top-line>
    <!-- Dialogs List -->
    <div class="dialogsListContainer">
        <div class=chatwrap>


            <div class="wrap">
            <img src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
            <div class="meta">
                <div class="name">Rachel Zane</div>
                <div class="preview">I was thinkasdasdhasdjhfjsajbdasbdbashbdhashbdhbsabdhasb
                asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                hdbhasbdhbasbdhbashbdbasdbhasbdbasbdhbsabdhbsaing that we could have chicken tonight, sounds good?</div>
            </div>
            <div class="addinfo">
                <span class="dot"></span>
                <p>21:23</p>
            </div>

        </div>
        </div>
    </div>
    <div class='plusbut'>
        <div class='horizontal-plus'></div>
        <div class='vertical-plus'></div>
    </div>

    <!-- The Modal -->
    <div id="myModal" class="modal">

    <!-- Modal content -->
    <div class="modal-content">
        <span class="close">&times;</span>
        <create-new-dialog-form></create-new-dialog-form>
    </div>

    </div>
</div>
`
;

class DialogsListForm extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$container = this._shadowRoot.querySelector('.container');
        this.$dialogsListContainer = this._shadowRoot.querySelector('.dialogsListContainer');
        this.$modal = this._shadowRoot.querySelector('.modal');
        this.configureModal();
        this.drawExistingDialogs();
    }

    drawExistingDialogs() {
        var dlist = getDialogsList();
        if (dlist == null)
            return;
        Object.keys(dlist).forEach(function(e){
            var name = dlist[e].name;
            var surname = dlist[e].surname;
            var last_message = dlist[e].lastmessage.messageText;
            var login = e;
            var chatPattern = `
                <div class="wrap">
                    <img src="http://emilcarlsson.se/assets/rachelzane.png" alt="" />
                    <div class="meta">
                        <div class="name">${name} ${surname}</div>
                        <div class="preview">${last_message}</div>
                    </div>
                        <div class="addinfo">
                        <span class="dot"></span>
                        <p>21:23</p>
                    </div>
                </div>
            `;
            var child = document.createElement('div');
            child.setAttribute("class", "chatwrap");
            child.setAttribute("login", login);
            child.innerHTML = chatPattern;
            child.addEventListener("click", function () {
                var $messageForm = document.body.getElementsByTagName('message-form')[0];
                $messageForm.loadOldMessages(login);
                $messageForm.style.display = 'block';
                document.body.getElementsByTagName('dialogslist-form')[0].style.display = 'none';
            });
            this.$dialogsListContainer.appendChild(child);
            this.closeModal();
        }.bind(this));
    }

    configureModal() {
    
        // Get the button that opens the modal
        var btn = this._shadowRoot.querySelector('.plusbut');
    
        // Get the <span> element that closes the modal
        var span = this._shadowRoot.querySelector('.close');
    
        // When the user clicks the button, open the modal
        btn.addEventListener("click", function () {
            this.$modal.style.display = "block";
        }.bind(this));
    
        span.addEventListener("click", function () {
            this.closeModal();
        }.bind(this));
    
        // When the user clicks anywhere outside of the modal, close it
        this.$modal.addEventListener("click",  function(event) {
        if (event.target == this.$modal) {
            this.closeModal();
        }
        }.bind(this));
    }

    closeModal() {
        this.$modal.style.display = "none";
    }
}

customElements.define('dialogslist-form', DialogsListForm);
