const bubbleBlock = {
    name: 'bubbleBlock',
    level: 'block',                                     // Is this a block-level or inline-level tokenizer?
    start(src) { return src.indexOf(" ()"); }, // Hint to Marked.js to stop and check for a match
    tokenizer(src, tokens) {
        const rule = /((\(\))(?<=\(\))([\w\s]+)(?=\(\/\))(\(\/\)))/;    // Regex for the complete token, anchor to string start
        const match = rule.exec(src);
        if (match.indices) {
            const token = {                                   // Token to generate
                type: 'bubbleBlock',                          // Should match "name" above
                raw: match[1],                                // The capture group encompassing the markup and text
                text: match[3].trim(),                               // The capture group of just text
                tokens: []                                    // Array where child inline tokens will be generated
            };
            this.lexer.inline(token.text, token.tokens);    // Queue this data to be processed for inline tokens
            return token;
        }
    },
    renderer(token) {
        return `<div class="bubble">${this.parser.parseInline(token.tokens)}</div>`; // parseInline to turn child tokens into HTML
    }
};



// marked.use({ extensions: [bubbleBlock] });

// ^(\(\))(?:\n|$| )*(?<=\(\))[\w\s]+(?=\(\\\))(\(\\\))(?=\n|$| )+
// (\(\))*(?<=\(\))[\w\s]+(?=\(\\\))(\(\\\))