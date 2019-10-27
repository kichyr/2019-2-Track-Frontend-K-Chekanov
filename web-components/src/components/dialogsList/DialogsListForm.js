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
    width: 100%;
}
.wrap {
    width:100%
    align-items: center;
    margin: 1.5vh;
    background-color: #eee;
    display: flex;
    flex-direction: row;
    border-radius: 2vh;
    font-size: 4vh;
}
.meta {
    flex:10;
}

.addinfo {
    flex: 0.5;
}
img {
    flex: 1;
    max-height: 10vh;
    max-width: 10vh;
    border-radius: 50%;
}
.preview {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 5vh;
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
                <p class="name">Rachel Zane</p>
                <p class="preview">I was thinkasdasdhasdjhfjsajbdasbdbashbdhashbdhbsabdhasb
                asdddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                hdbhasbdhbasbdhbashbdbasdbhasbdbasbdhbsabdhbsaing that we could have chicken tonight, sounds good?</p>
            </div>
            <div class="addinfo">

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
        this.$dialogsListContainer = this._shadowRoot.querySelector('dialogsListContainer');
        this.configureModal();
    }

    drawExistingDialogs() {

    }

    configureModal() {
        // Get the modal
        var modal = this._shadowRoot.querySelector('.modal');
    
        // Get the button that opens the modal
        var btn = this._shadowRoot.querySelector('.plusbut');
    
        // Get the <span> element that closes the modal
        var span = this._shadowRoot.querySelector('span');
    
        // When the user clicks the button, open the modal
        btn.addEventListener("click", function () {
            modal.style.display = "block";
        });
    
        span.addEventListener("click", function () {
            modal.style.display = "none";
        });
    
        // When the user clicks anywhere outside of the modal, close it
        modal.addEventListener("click",  function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
        });
    }
}

customElements.define('dialogslist-form', DialogsListForm);
