const columnBlockTwo = {
    name: 'columnBlockTwo',
    level: 'block',                                 // Is this a block-level or inline-level tokenizer?
    start(src) { return src.match(/^\|==/); },    // Hint to Marked.js to stop and check for a match
    tokenizer(src, tokens) {
        const rule = /^((\|==)(.+)(?<!=)(==\|))/s;  // Regex for the complete token, anchor to string start
        const match = rule.exec(src);

        if (match) {
            let rows = match[3];
            let rowList = rows.split('\n');
            let token = {
                type: 'columnBlockTwo',
                raw: match[0],
                leftRow: [],
                rightRow: [],
            };
            const rowPattern = /^((\|=)((?<=^\|=)(.+)(?:=\|=))((?<==\|=)(.+)(?:=\|$)))/
            rowList.forEach(row => {
                let rowMatch = rowPattern.exec(row);
                if (rowMatch) {
                    token.leftRow.push(window.marked.parse(rowMatch[4]));
                    token.rightRow.push(window.marked.parse(rowMatch[6]));
                }
            });
            return token;
        }
    },

    renderer(token) {
        const columnRow = '<div class="column-2-row">rowText</div>'
        let leftRows = [];
        let rightRows = [];

        token.leftRow.forEach( text => {
            if (text) {
                let row = columnRow.replace("rowText", text);
                leftRows.push(row);
            }

        })
        token.rightRow.forEach( text => {
            if (text) {
                let row = columnRow.replace("rowText", text);
                rightRows.push(row);
            }

        })

        return `
            <div class="column-2-block">
                <div class="column-2-col">
                    ${leftRows.join("\n")}
                </div>
                <div class="column-2-col">
                    ${rightRows.join("\n")}
                </div>
            </div>
        `;
    },
};

const columnBlockThree = {
    name: 'columnBlockThree',
    level: 'block',                                 // Is this a block-level or inline-level tokenizer?
    start(src) { return src.match(/^\|===/); },    // Hint to Marked.js to stop and check for a match
    tokenizer(src, tokens) {
        const rule = /^((\|===)(.+)(===\|))/s;  // Regex for the complete token, anchor to string start
        const match = rule.exec(src);

        if (match) {
            let rows = match[3];
            let rowList = rows.split('\n');
            let token = {
                type: 'columnBlockThree',
                raw: match[0],
                leftRow: [],
                middleRow: [],
                rightRow: [],
            };
            const rowPattern = /^((\|=)((?<=^\|=)(.+)(?:=\|=))((?<==\|=)(.+)(?:=\|=))((?<==\|=)(.+)(?:=\|$)))/
            rowList.forEach( row => {
                let rowMatch = rowPattern.exec(row);
                if (rowMatch) {
                    token.leftRow.push(window.marked.parse(rowMatch[4]));
                    token.middleRow.push(window.marked.parse(rowMatch[6]));
                    token.rightRow.push(window.marked.parse(rowMatch[8]));
                }
            })
            return token;
        }
    },
    renderer(token) {
        const columnRow = '<div class="column-3-row">rowText</div>'
        let leftRows = [];
        let middleRows = [];
        let rightRows = [];

        token.leftRow.forEach( text => {
            if (text) {
                let row = columnRow.replace("rowText", text);
                leftRows.push(row);
            }

        })
        token.middleRow.forEach( text => {
            if (text) {
                let row = columnRow.replace("rowText", text);
                middleRows.push(row);
            }
        })
        token.rightRow.forEach( text => {
            if (text) {
                let row = columnRow.replace("rowText", text);
                rightRows.push(row);
            }

        })

        return `
            <div class="column-3-block">
                <div class="column-3-col">
                    ${leftRows.join("\n")}
                </div>
                <div class="column-3-col">
                    ${middleRows.join("\n")}
                </div>
                <div class="column-3-col">
                    ${rightRows.join("\n")}
                </div>
            </div>
        `;
    },
};



marked.use({ extensions: [columnBlockTwo, columnBlockThree] });

// Block regex /(^\|==)(.+)(==\|)/gms
// Row regex /^((\|=)((?<=^\|=)(.+)(?:=\|=))((?<==\|=)(.+)(?:=\|$)))/gm