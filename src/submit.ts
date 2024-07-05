type Result =
	| {
			type: 'success';
			debugUrl: string;
	  }
	| {
			type: 'failed';
	  };

export const submit = () => {
	const getMetaTagString = (): string => {
		const ExcludeMetaTag = ['[name="viewport"]', '[charset]', '[http-equiv]', '[name="theme-color"]', '[name="referrer"]', '[name="robots"]', '[name="color-scheme"]', '[name="format-detection"]', '[property="og:image"]', '[name="twitter:image"]', '[property="og:url"]'];
		const metaTags = document.head.querySelectorAll(`meta:not(${ExcludeMetaTag.join(',')}`);
		return JSON.stringify(Array.from(metaTags).map(meta => meta.outerHTML));
	};

	const APP_NAME = 'Localhost Open Graph Debugger';
	const log = (message: string) => {
		console.error(`${APP_NAME}: ${message}`);
	};

	const getImagesFromMetaTags = async (): Promise<{
		ogImage: Blob | null;
		twitterImage: Blob | null;
	}> => {
		const fetchImageFromMeta = async (selector: string): Promise<Blob | null> => {
			const metaTag = document.head.querySelector(selector) as HTMLMetaElement | null;
			if (!metaTag) {
				return null;
			}

			const url = metaTag.getAttribute('content');
			if (!url) {
				return null;
			}

			try {
				const response = await fetch(url);
				if (!response.ok) {
					log(`Failed to fetch image from ${url}: ${response.statusText}`);
					return null;
				}
				const blob = await response.blob();
				if (!blob.type.startsWith('image/')) {
					log(`Failed to fetch image from ${url}: Not an image`);
					return null;
				}

				return blob;
			} catch (_) {
				return null;
			}
		};

		const ogImage = await fetchImageFromMeta('meta[property="og:image"]');
		const twitterImage = await fetchImageFromMeta('meta[name="twitter:image"]');

		return { ogImage, twitterImage };
	};

	const post = async (): Promise<Result> => {
		try {
			const metaTagString = getMetaTagString();
			const images = await getImagesFromMetaTags();
			const formData = new FormData();
			formData.append('meta', metaTagString);
			if (images.ogImage) {
				formData.append('ogImage', images.ogImage);
			}
			if (images.twitterImage) {
				formData.append('twitterImage', images.twitterImage);
			}

			const baseUrl = 'https://og.nullnull.dev';

			const response = await fetch(`${baseUrl}/api/post`, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'omit',
				body: formData,
			});
			const data = await response.json();
			if (!response.ok || !data.success) {
				console.log(data);
				log(data.message);
				return { type: 'failed' };
			}

			return { type: 'success', debugUrl: data.debugUrl };
		} catch (error) {
			console.log(error);
			if (error instanceof Error) {
				log(error.message);
			} else {
				log('Unknown error');
			}
			return { type: 'failed' };
		}
	};

	return post();
};
