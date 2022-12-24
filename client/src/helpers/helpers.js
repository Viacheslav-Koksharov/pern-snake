const getRandomCoordinates = () => {
	let min = 1;
	let max = 28;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
	return [x, y];
};

const getRandomFeedType = () => {
	return Math.floor((Math.random() * 3));
}

const fetchPlayers = async (api) => {
    const { data } = await api.getPlayer();
    return data;
};

const addPlayer = async (api, { name, count }) => {
	const { data } = await api.postPlayer({ name, 'score': count });
	return data;
};

export { getRandomCoordinates, getRandomFeedType, fetchPlayers, addPlayer };