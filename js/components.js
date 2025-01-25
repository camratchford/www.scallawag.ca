class Bubble extends HTMLElement {
    constructor() {
        super();
        // Ensure the onload event listener is set up
        const shadow = this.attachShadow({ mode: "open" });

        const styleSheet = document.querySelector("link[href=\"css/content.css\"]");
        const shadowHead = document.createElement("head");
        shadowHead.appendChild(styleSheet)
        shadow.appendChild(shadowHead)

        let element = "p";
        if (this.hasAttribute("element")) {
            element = this.getAttribute("element");
        }
        const el = document.createElement(element);
        el.classList.add("bubble");
        el.textContent = this.textContent;
        this.textContent = "";
        shadow.appendChild(el);


        shadow.appendChild(shadowHead);
        if (document.adoptedStyleSheets.length > 0) {
            shadow.adoptedStyleSheets = document.adoptedStyleSheets;
        }
        const parent = this.parentElement;
        if (this.parentElement.className !== "markdown-body") {
            this.parentElement.parentElement.appendChild(this);
            parent.remove()
        }
    }

    connectedCallback() {
        // Trigger the 'load' event manually since custom elements don't natively have an onload
        const event = new Event("load");
        this.dispatchEvent(event);
    }
}

// Define the custom element
customElements.define("h-bub", Bubble);
