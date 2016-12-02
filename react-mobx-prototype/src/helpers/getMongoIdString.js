export const getMongoIdString = (machineid, userid) => {
	const bytes1 = 256;
	const bytes2 = 65536;
	const bytes3 = 16777216;
	let dateStr = Math.floor(Date.now()/1000).toString(16);
	let machineidStr = ("000000" + ((machineid||0) % bytes3).toString(16)).slice(-6);
	let useridStr = ("0000" + ((userid||0) % bytes2).toString(16)).slice(-4);
	let rnd = ("000000" + (Math.random(0, bytes3 - 1)).toString(16)).slice(-6);

	return '' + dateStr + machineidStr + useridStr + rnd;
};
