chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		files: ['class-localhost-open-graph-debugger.js'],
	});
});
