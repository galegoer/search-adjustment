document.getElementById("saveBtn").addEventListener("click", function () {
    const customSearch = document.getElementById("custom-search").textContent;
    const isOn = document.getElementById("ai-search").classList.contains("on");

    chrome.storage.local.set({ "ai-search": isOn, "custom-search": customSearch }, () => {
        console.log('Added to browser storage');
    });
});

document.getElementById("ai-search").addEventListener("click", function () {
    const isOn = this.classList.contains("on");
    this.classList.toggle("on");
    this.textContent = isOn ? "Off" : "On";

    chrome.storage.local.set({ "ai-search": isOn }, () => {
        console.log('Added to browser storage');
    });
});