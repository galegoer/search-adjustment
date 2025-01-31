document.getElementById("saveBtn").addEventListener("click", function () {
    const patElement = document.getElementById("pat");
    const pat = patElement.value;

    const repoPathElement = document.getElementById("repoPath");
    const repoPath = repoPathElement.value;

    const ownerElement = document.getElementById("owner");
    const owner = ownerElement.value;
    console.log(pat);
    console.log(repoPath);
    console.log(owner);

    if (pat == "" || repoPath == "" || owner == "") {
        // TODO: add error popup in red
        console.log('one of the params is empty');
        return;
    }
    chrome.storage.local.set({ "pat": pat, "repoPath": repoPath, "owner": owner }, () => {
        console.log('Added to browser storage');
    });
    // TODO: add success popup
});

document.getElementById("ai-search").addEventListener("click", function () {
    const isOn = this.classList.contains("on");
    this.classList.toggle("on", !isOn);
    this.classList.toggle("off", isOn);
    this.textContent = isOn ? "Off" : "On";

    chrome.storage.local.set({ "ai-search": isOn }, () => {
        console.log('Added to browser storage');
    });
});
