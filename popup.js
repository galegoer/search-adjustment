// Change buttons and text input based on local storage
chrome.storage.local.get(["ai-search-off", "custom-search", "yt-music", "reddit", "exclude"], items => {    
    // TODO: Refactor this is repeated code
    if (items["ai-search-off"]) {
        document.getElementById("ai-search-off").classList.remove("on");
        document.getElementById("ai-search-off").textContent = "Off";
    } else {
        document.getElementById("ai-search-off").classList.add("on");
        document.getElementById("ai-search-off").textContent = "On";
    }

    if (items["yt-music"]) {
        document.getElementById("yt-music").classList.add("on");
        document.getElementById("yt-music").textContent = "On";
    } else {
        document.getElementById("yt-music").textContent = "Off";
    }

    if (items["reddit"]) {
        document.getElementById("reddit").classList.add("on");
        document.getElementById("reddit").textContent = "On";
    } else {
        document.getElementById("reddit").textContent = "Off";
    }

    document.getElementById("custom-search").value = items["custom-search"] || "";
    document.getElementById("exclude").value = items["exclude"] || "";
});


// Save is only for text inputs
document.getElementById("saveBtn").addEventListener("click", function () {
    const customSearch = document.getElementById("custom-search").value;
    const exclude = document.getElementById("exclude").value;

    chrome.storage.local.set({ "custom-search": customSearch, "exclude": exclude }, () => {
        console.log('Added to browser storage');
    });
});

// TODO: Make isOn a function for these click buttons
document.getElementById("ai-search-off").addEventListener("click", function () {
    const isOn = this.classList.contains("on");
    this.classList.toggle("on");
    this.textContent = isOn ? "Off" : "On";

    chrome.storage.local.set({ "ai-search-off": isOn }, () => {
        console.log('Added to browser storage');
    });
});

document.getElementById("yt-music").addEventListener("click", function () {
    this.classList.toggle("on");
    const isOn = this.classList.contains("on");
    this.textContent = isOn ? "On" : "Off";

    chrome.storage.local.set({ "yt-music": isOn }, () => {
        console.log('Added to browser storage');
    });
});

document.getElementById("reddit").addEventListener("click", function () {
    this.classList.toggle("on");
    const isOn = this.classList.contains("on");
    this.textContent = isOn ? "On" : "Off";

    chrome.storage.local.set({ "reddit": isOn }, () => {
        console.log('Added to browser storage');
    });
});

document.getElementById("resetBtn").addEventListener("click", function () {
    chrome.storage.local.clear();
});
