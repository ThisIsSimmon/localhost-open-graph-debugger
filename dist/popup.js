chrome.runtime.sendMessage('start');

chrome.runtime.onMessage.addListener((results, sender, sendResponse) => {
	document.querySelector('.icon--loader').classList.remove('active');

	if ('Success' === results.dataBack.status) {
		const iconSuccess = document.getElementById('icon--success');
		const iconSuccessContent = iconSuccess.content.querySelector('.icon--success').cloneNode(true);
		document.querySelector('.container').prepend(iconSuccessContent);

		const openLink = document.querySelector('.open-link');
		openLink.href = results.createdURL;
	}

	if ('Fail' === results.dataBack.status) {
		const iconFail = document.getElementById('icon--fail');
		const iconFailContent = iconFail.content.querySelector('.icon--fail').cloneNode(true);
		document.querySelector('.container').prepend(iconFailContent);
		document.querySelector('.icon--fail').classList.add('active');
	}

	const message = document.querySelector('.message');
	message.classList.add('processed');
	message.innerHTML = results.dataBack.message;

	sendResponse({});
	return true;
});
