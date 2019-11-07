const template = document.createElement('template');
template.innerHTML = `
<style>
    .burgerButtContainer  {
        flex: 0.15;
        margin: auto;
    }
    .burgerButtContainer > div > div{
        width: 40px;
        height: 7px;
        background-color: white;
        margin: 6px 30px;
        border-radius: 10%;
    }

    .container {
        display: flex;
        font-size: 3vh;
        background-color: #0084ff;
        height: 100%;
    }
    img {
        flex: 1;
        max-height: 10vh;
        max-width: 10vh;
        border-radius: 50%;
    }
    .name {
        color: #fff;
        margin: auto;
        padding-right: 20px;
        flex: 1;
        text-align:right;
    }
</style>

<div class="container">
<div class="burgerButtContainer">
    <div class="burgerButt">
        <div></div>
        <div></div>
        <div></div>
    </div>
</div>
<div class=name>Ivanov Ivan</div>
<img  src="http://emilcarlsson.se/assets/rachelzane.png" alt="Avatar">
</div>
`
;

class TopLine extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$container = this._shadowRoot.querySelector('.container');
        this.$img = this._shadowRoot.querySelector('img');
        this.$burgerButton = this._shadowRoot.querySelector('.burgerButtContainer');
        this.$burgerButton.addEventListener("click", function () {
            document.body.getElementsByTagName('message-form')[0].style.left = '100%';
            document.body.getElementsByTagName('dialogslist-form')[0].style.left = '0%';
        });
    }
}

customElements.define('top-line', TopLine);