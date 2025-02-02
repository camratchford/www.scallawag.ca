

function initPage() {
    if (! window.mdContent) {
        renderContent(localStorage.getItem("currentPage"));
    }
}

