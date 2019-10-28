import {createNewChat} from './ParserToJson'

const template = document.createElement('template');
template.innerHTML = `
<style>
input {
	font-size: 3vh;
	box-sizing : border-box;
	width: 95%;
	margin: 2%;
}

button {
	background-color: #0084ff;
	color: #fff;
	font-size: 3vh;
	border-radius: 20px;
	flex: 1;
	right: 4vh;
}

</style>

<div>
  <h2>Create new chat</h2><br/>

  <input class="login" type="text" name="login" placeholder="Login" size = 40% />
  <input class="name" type="text" name="name" id="password" placeholder="Name">
  <input class="surname" type="text" name="name" id="password" placeholder="Surname">

  <button><span>Sign up</span></button>
</div>
`
;

class CreateNewDialogForm extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
		this._shadowRoot.appendChild(template.content.cloneNode(true));
		this.$login = this._shadowRoot.querySelector('.login');
		this.$name = this._shadowRoot.querySelector('.name');
		this.$surname = this._shadowRoot.querySelector('.surname');
		this.$btn = this._shadowRoot.querySelector('button');
		this.$btn.addEventListener("click", function () {
            createNewChat(this.$login.value, this.$name.value, this.$surname.value);
        }.bind(this));
        /* this.$container = this._shadowRoot.querySelector('.container');
        this.$img = this._shadowRoot.querySelector('img');
        this.$burgerButton = this._shadowRoot.querySelector('.burgerButtContainer');
        this.$burgerButton.addEventListener("click", function () {
            document.body.getElementsByTagName('message-form')[0].style.display = 'none';
            document.body.getElementsByTagName('dialogslist-form')[0].style.display = 'block';
        }); */
    }
}

customElements.define('create-new-dialog-form', CreateNewDialogForm);

