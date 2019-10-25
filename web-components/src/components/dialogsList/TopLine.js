const template = document.createElement('template');
template.innerHTML = `
<style>
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
<div class=name>Ivanov Ivan</div>
<img src="test_img.png" alt="Avatar">
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
    }
}

customElements.define('top-line', TopLine);
