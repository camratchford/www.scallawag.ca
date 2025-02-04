
async function encodeUML(uml_text) {
    let data;
    try {
        await instance.request({
            url: "plantuml-encoder",
            method: "POST",
            data: { uml: uml_text, uri: "", png: "" },
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            data = response.data;
        })
    } catch (error) {
        console.error('Error:', error);
    }
    return data;
}


const plantuml = {
    name: 'plantuml',
    level: 'block',
    start(src) {
        return src.startsWith("@startuml");
    },
    tokenizer(src, tokens) {
        const rule = /^((@startuml)(.*?)(@enduml))/s;
        const match = rule.exec(src);

        if (match) {
            let token = {
                type: 'plantuml',
                raw: match[0],
                uml: match[3],
                png: '',
                tokens: [],
            };
            return token;
        }
    },
    renderer(token) {
        let placeholderId = `uml-${Math.random().toString(36).substr(2, 9)}`;
        encodeUML(token.uml).then(result => {
            let source = `https://www.scallawag.ca/plantuml/${result.png}`
            let img = document.getElementById(placeholderId)
            img.src = source;
            img.parentElement.href = source;

        });
        return `
        <a href="">
            <img src="" id="${placeholderId}" class="uml">
        </a>
        `
    },
};

marked.use({extensions: [plantuml]});