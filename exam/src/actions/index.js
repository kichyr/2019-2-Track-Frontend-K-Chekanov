
export function openListPage() {
	return {type: 'openList'};
}


export function openTownInfo(town_id) {
    return {type: 'townInfo', town_id: town_id};
}


export function addTownToList(town) {
    return {type: 'addedTown', town: town};
}

export function setInExtraInfoPage(town) {
    return {type: 'extraInfo', location: town};
}