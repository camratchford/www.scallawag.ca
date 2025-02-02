
const bubbleInline = {
    name: 'bubbleInline',
    level: 'inline',
    start(src) {
        if (src.startsWith("()")) {
            return false;
        }
        return src.indexOf("()");
    },
    tokenizer(src, tokens) {
        const rule = /^((\(\))(?<=\(\))([\w\s]+)(?=\(\/\))(\(\/\)))/;
        const match = rule.exec(src);
        if (match) {
            const token = {
                type: 'bubbleInline',
                raw: match[1],
                text: match[3],
                tokens: []
            };
            this.lexer.inline(token.text, token.tokens);
            return token;
        }
    },
    renderer(token) {
        return `<span class="bubble">${this.parser.parseInline(token.tokens)}</span>`;
    }
};

const bubbleBlock = {
    name: 'bubbleBlock',
    level: 'block',
    start(src) {
        window.source  = src;
        return src.match(/(?<=^)\(\)/);
    },
    tokenizer(src, tokens) {
        const rule = /^(\(\)(?<=\(\))([\w\W\s]+)(?=\(\/\))(\(\/\)))/;
        const match = rule.exec(src);
        if (match) {
            const token = {
                type: 'bubbleBlock',
                raw: match[1],
                text: match[2].trim(),
                tokens: []
            };
            this.lexer.inline(token.text, token.tokens);
            return token;
        }
    },
    renderer(token) {
        return `<div class="bubble">${this.parser.parseInline(token.tokens)}</div>`;
    }
};

marked.use({ extensions: [bubbleInline, bubbleBlock] });
