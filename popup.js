let profitButton = document.getElementById("populate-profits");
let stocks = document.querySelectorAll('#pnlEqPendingDelivery tr.expand-box');
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

profitButton.addEventListener('click', async () => {
  let tab = await getCurrentTab();

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['content-script.js']
  });
});