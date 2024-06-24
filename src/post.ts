type Result =
	| {
			type: 'success';
			debugUrl: string;
	  }
	| {
			type: 'failed';
			debugUrl: never;
	  };

export const post = async (): Promise<Result> => {
	await new Promise(resolve => setTimeout(resolve, 1000));
	return { type: 'success', debugUrl: 'https://example.com' };
};
