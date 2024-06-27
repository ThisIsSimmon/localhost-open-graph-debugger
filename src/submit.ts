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
		const ExcludeMetaTag = ['[name="viewport"]', '[charset]', '[http-equiv]', '[name="theme-color"]', '[name="referrer"]', '[name="robots"]', '[name="color-scheme"]', '[name="format-detection"]', '[property="og:image"]', '[name="twitter:image"]'];
		const metaTags = document.head.querySelectorAll(`meta:not(${ExcludeMetaTag.join(',')}`);
		return JSON.stringify(Array.from(metaTags).map(meta => meta.outerHTML));
	};

	const APP_NAME = 'Localhost Open Graph Debugger';
	const log = (message: string) => {
		console.error(`${APP_NAME}: ${message}`);
	};

	const getImagesFromMetaTags = async (): Promise<{
		ogImage: File | null;
		twitterImage: File | null;
	}> => {
		const fetchImageFromMeta = async (selector: string): Promise<File | null> => {
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
				const urlObj = new URL(url);
				const pathname = urlObj.pathname;
				const fileName = pathname.split('/').pop();
				if (!fileName) {
					log(`Failed to fetch image from ${url}: Invalid File Name`);
					return null;
				}

				const file = new File([blob], fileName, { type: blob.type });
				return file;
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

			const baseUrl = 'http://192.168.11.8:5173';
			// const baseUrl = 'https://og.nullnull.dev';

			const response = await fetch(`${baseUrl}/api/post`, {
				method: 'POST',
				mode: 'cors',
				cache: 'no-cache',
				credentials: 'omit',
				body: formData,
			});
			const data = await response.json();
			if (!response.ok || !data.success) {
				log(data.message);
				return { type: 'failed' };
			}

			return { type: 'success', debugUrl: data.debugUrl };
		} catch (error) {
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
