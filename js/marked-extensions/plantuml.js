
// async function encodeUML(uml_text) {
//     let data;
//     try {
//         await instance.request({
//             url: "plantuml-encoder",
//             method: "POST",
//             data: { uml: uml_text, uri: "", png: "" },
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }).then(response => {
//             data = response.data;
//         })
//     } catch (error) {
//         console.error('Error:', error);
//     }
//     return data;
// }

async function EncodeUML(placeholderId, pumlData, fileName) {
    await instance.request({
        url: "plantuml",
        method: "POST",
        data: { uml: pumlData, file_name: fileName },
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        console.log(response.data)
        let imgElement = document.getElementById(placeholderId);
        imgElement.parentElement.href = response.data.url;
        imgElement.innerHTML = response.data.svg;
        imgElement.children[0].style = ""
    })
}

async function loadUMLFile(fileName) {
    let pumlData = "";
    await instance.request({
        url:  `content/${fileName}.puml`,
        method: "GET",
        data: {},
        headers: {}
    }).then(function (response) {
        if (response.data) {
            pumlData = response.data;
        }
    });
    return pumlData;
}


const plantuml = {
    name: 'plantuml',
    level: 'block',
    start(src) {
        return src.indexOf('{plantuml:');
    },
    tokenizer(src, tokens) {
        const rule = /^\{plantuml:(.*?),(.*?)}/;
        const match = rule.exec(src);

        if (match) {
            return {
                type: 'plantuml',
                raw: match[0],
                fileName: match[1],
                altText: match[2],
                tokens: [],
            };
        }
    },
    renderer(token) {
        let placeholderId = `uml-${Math.random().toString(36).slice(2, 9)}`;
        let fileName = token.fileName;
        loadUMLFile(fileName).then((response) => {
            EncodeUML(placeholderId, response, fileName).then((response) => {

            })
        })


        return `
        <a href="">
            <div id="${placeholderId}" class="uml"></div>    
        </a>
`
    },
};



// const plantuml = {
//     name: 'plantuml',
//     level: 'block',
//     start(src) {
//         return src.startsWith("@startuml");
//     },
//     tokenizer(src, tokens) {
//         const rule = /^((@startuml)(.*?)(@enduml))/s;
//         const match = rule.exec(src);
//
//         if (match) {
//             let token = {
//                 type: 'plantuml',
//                 raw: match[0],
//                 uml: match[3],
//                 png: '',
//                 tokens: [],
//             };
//             return token;
//         }
//     },
//     renderer(token) {
//         let placeholderId = `uml-${Math.random().toString(36).substr(2, 9)}`;
//         encodeUML(token.uml).then(result => {
//             let source = `https://www.scallawag.ca/plantuml/${result.png}`
//             let img = document.getElementById(placeholderId)
//             img.src = source;
//             img.parentElement.href = source;
//
//         });
//         return `
//         <a href="">
//             <img src="" id="${placeholderId}" class="uml">
//         </a>
//         `
//     },
// };

marked.use({extensions: [plantuml]});
