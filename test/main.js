import './style.css';

class LocalhostOpenGraphDebugger {
	constructor() {
		this.start();
	}

	async start() {
		this.uniqueID = await this.getUniqueID();
		this.postImages = await this.getImages();
		this.postMeta = await this.getMetaObject(this.getMetaNodeList());
		await this.post();
	}

	getUniqueID = () => {
		const array = new Uint32Array(8);
		window.crypto.getRandomValues(array);
		let str = '';
		for (let i = 0, l = array.length; i < l; i++) {
			str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4);
		}
		return str;
	};

	getMetaNodeList = () => {
		return document.head.querySelectorAll('meta');
	};

	getMetaObject = (metaNodeList) => {
		let metaObject = {};
		for (const meta of metaNodeList) {
			const property = meta.getAttribute('property') || meta.getAttribute('name') || meta.getAttribute('charset');
			metaObject[property] = meta.outerHTML;
		}
		return metaObject;
	};

	async getImages() {
		let images = [];
		for (const m of this.getMetaNodeList()) {
			const property = m.getAttribute('property');
			if (/og:image|twitter:image/.test(property)) {
				const imgURL = m.getAttribute('content');
				const extensionIndex = imgURL.lastIndexOf('/');
				const fileName = imgURL.slice(extensionIndex + 1);

				const fetchAsBlob = (url) =>
					fetch(url)
						.then((res) => res.blob())
						.then((blob) => {
							return blob;
						});
				const convertBlobToFile = (blob) => {
					return new File([blob], fileName, { type: 'application/octet-stream' });
				};

				const blob = await fetchAsBlob(imgURL);
				const file = await convertBlobToFile(blob);
				images[property] = file;

				// const fetchAsBlob = (url) => fetch(url).then((response) => response.blob());

				// const convertBlobToBase64 = (blob) =>
				// 	new Promise((resolve, reject) => {
				// 		const reader = new FileReader();
				// 		reader.onerror = reject;
				// 		reader.onload = () => {
				// 			resolve(reader.result);
				// 		};
				// 		reader.readAsDataURL(blob);
				// 	});

				// fetchAsBlob(imgURL)
				// 	.then(convertBlobToBase64)
				// 	.then((base64) => {
				// 		document.getElementById('image').src = base64;
				// 	});
			}
		}
		return images;
	}

	post = () => {
		const url = 'http://localhost:4000/post';
		const formData = new FormData();
		formData.append('hash', JSON.stringify(this.uniqueID));
		for (const property in this.postImages) {
			formData.append(property, this.postImages[property]);
		}
		formData.append('meta', JSON.stringify(this.postMeta));

		fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'omit',
			body: formData,
		})
			.then((response) => {
				// if (response.ok) {
				// 	return response.json();
				// }
				return response.json();

				// throw new Error(`Status: ${response.status}, statusText: ${response.statusText}`);
			})
			.then((dataBack) => {
				if ('Fail' === dataBack.status) {
					throw dataBack;
				} else {
					console.log(dataBack);
				}
			})
			.catch((error) => {
				console.error(error);
			});
	};
}

document.getElementById('run').addEventListener('click', () => {
	new LocalhostOpenGraphDebugger();
});
