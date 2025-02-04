

const button = {
    name: 'button',
    level: 'inline',                                 // Is this a block-level or inline-level tokenizer?
    start(src) { return src.indexOf('{b:'); },    // Hint to Marked.js to stop and check for a match
    tokenizer(src, tokens) {
        const rule = /^\{b:(.*?),(.*?)}/;  // Regex for the complete token, anchor to string start
        const match = rule.exec(src);

        if (match) {
            let token =  {
                type: 'button',
                raw: match[0],
                href: match[1],
                text: match[2],
                tokens: [],
            };
            return token;
        }
    },
    renderer(token) {
        return `
            <button type="button" class="md-button">
                <a href="${token.href}">${token.text}</a>
            </button>
        `;
    },
};

marked.use({ extensions: [button,] });


