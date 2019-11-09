const template = document.createElement('template');
template.innerHTML = `
<style>
    .container {
        display: flex;
        font-size: 3vh;
        background-color: #0084ff;
        height: 100%;
        align-items: center;
        justify-content: flex-end;
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
    search-bar {
        flex: 3;
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
<search-bar></search-bar>
</div>
`
;

class TopLineDialogsList extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
        this.$container = this._shadowRoot.querySelector('.container');
        this.$img = this._shadowRoot.querySelector('img');
    }
}

customElements.define('dialog_list_top-line', TopLineDialogsList);
