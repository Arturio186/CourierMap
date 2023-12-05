const normalizeCoords = (coords : Array<number>) => {
    return coords.map((coord) => parseFloat(coord.toFixed(4)));
}

export default normalizeCoords;