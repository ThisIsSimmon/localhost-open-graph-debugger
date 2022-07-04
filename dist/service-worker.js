async function getCurrentTab() {
	let queryOptions = { active: true, currentWindow: true };
	let [tab] = await chrome.tabs.query(queryOptions);
	return tab;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if ('start' === message) {
		getCurrentTab().then((tab) => {
			chrome.scripting.executeScript(
				{
					target: { tabId: tab.id },
					files: ['app.js'],
				},
				(injectionResults) => {
					setTimeout(() => {
						chrome.runtime.sendMessage(injectionResults[0].result);
					}, 1500);
				}
			);
		});
	}

	sendResponse({});
	return true;
});
