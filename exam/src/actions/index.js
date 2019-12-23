
export function openListPage() {
	return {type: 'openList'};
}


export function openTownInfo(town_id) {
    return {type: 'townInfo', town_id: town_id};
}


export function addTownToList(town) {
    return {type: 'addedTown', town: town}
}
