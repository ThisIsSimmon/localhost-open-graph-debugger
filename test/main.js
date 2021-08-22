import './style.css';

class LocalhostOpenGraphDebugger {
	constructor() {
		this.uniqueID = this.getUniqueID();
		this.postData = { meta: [], images: [] };

		this.postData.images = this.getImages();

		this.postMeta = this.getMetaObject(this.getMetaNodeList());

		this.post(this.postData);
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

	getImages = () => {
		let images = [];
		for (const m of this.getMetaNodeList()) {
			const property = m.getAttribute('property');
			if (/og:image|twitter:image/.test(property)) {
				const imgURL = m.getAttribute('content');

				const blob = (url) => fetch(imgURL).then((response) => response.blob());
				const extensionIndex = imgURL.lastIndexOf('/');
				const fileName = imgURL.slice(extensionIndex + 1);

				const file = new File([blob], `${this.uniqueID}_${fileName}`, { type: 'application/octet-stream' });
				images[property] = file;
				// this.postData.images.push(file);

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
	};

	post = (postData) => {
		const url = 'http://localhost:4000/post';
		const formData = new FormData();
		formData.append('meta', JSON.stringify(this.postMeta));

		fetch(url, {
			method: 'POST',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'omit',
			body: formData,
		})
			.then((response) => {
				console.log(response);
				if (response.ok) {
					return response.json();
				}
				throw new Error(`Status: ${response.status}, statusText: ${response.statusText}`);
			})
			.then((dataBack) => {
				console.log(dataBack);
			})
			.catch((error) => {
				console.error(error);
			});
	};
}

document.getElementById('run').addEventListener('click', () => {
	new LocalhostOpenGraphDebugger();
});
