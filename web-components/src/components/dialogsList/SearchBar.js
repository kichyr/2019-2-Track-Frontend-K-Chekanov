const template = document.createElement('template');
template.innerHTML = `
<style>
input[type=text] {
    float: right;
    padding: 6px;
    border: none;
    margin-top: 8px;
    margin-right: 16px;
    font-size: 3vh;
    padding-left: 20px;
    border-radius: 20px;
}
</style>

<input type="text" placeholder="Search..">
`
;

class SearchBar extends HTMLElement{
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));
    }
}

customElements.define('search-bar', SearchBar);
