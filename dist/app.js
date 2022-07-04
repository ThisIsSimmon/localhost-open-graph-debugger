{
	const getUniqueID = () => {
		const array = new Uint32Array(8);
		window.crypto.getRandomValues(array);
		let str = '';
		for (let i = 0, l = array.length; i < l; i++) {
			str += (i < 2 || i > 5 ? '' : '-') + array[i].toString(16).slice(-4);
		}
		return str;
	};

	const getMetaNodeList = () => {
		return document.head.querySelectorAll('meta');
	};

	const getMetaObject = (metaNodeList) => {
		let metaObject = {};
		for (const meta of metaNodeList) {
			const property = meta.getAttribute('property') || meta.getAttribute('name') || meta.getAttribute('charset');
			metaObject[property] = meta.outerHTML;
		}
		return metaObject;
	};

	const getImages = async () => {
		let images = [];
		for (const m of getMetaNodeList()) {
			const property = m.getAttribute('property');
			if (/^og:image$|^twitter:image$/.test(property)) {
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
			}
		}
		return images;
	};

	const post = async () => {
		const baseURL = 'https://og.nullnull.dev';
		const formData = new FormData();
		const uniqueID = getUniqueID();
		const results = {
			createdURL: '',
			dataBack: null,
		};
		formData.append('hash', uniqueID);
		const postImages = await getImages();
		for (const property in postImages) {
			formData.append(property, postImages[property]);
		}
		const postMeta = await getMetaObject(getMetaNodeList());
		formData.append('meta', JSON.stringify(postMeta));
		return new Promise((resolve) => {
			fetch(`${baseURL}/api/post`, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'omit',
				body: formData,
			})
				.then((response) => {
					return response.json();
				})
				.then((dataBack) => {
					if ('Success' === dataBack.status) {
						results.createdURL = `${baseURL}/site/${uniqueID}`;
					}
					results.dataBack = dataBack;
					resolve(results);
				})
				.catch((error) => {
					results.dataBack = { message: 'Unknown error', status: 'Fail' };
					resolve(results);
					console.error(error);
				});
		});
	};
	post();
}
