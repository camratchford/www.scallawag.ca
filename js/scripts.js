

function init_page() {
    if (! window.mdContent) {
        renderContent(localStorage.getItem("currentPage"));
    }
}

