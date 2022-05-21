const dao = require('./mock_position_dao');
const PositionService = require('../../Position/Position');
const positionService = new PositionService(dao);

describe('get positions', () => {

    beforeEach(() => {
        dao.getPositions.mockReset();
        dao.getPositions.mockReturnValueOnce({
            "positionID": "800234543412",
		    "aisleID": "8002",
		    "row": 3454,
		    "col": 3412,
		    "maxWeight": 1000,
		    "maxVolume": 1000,
		    "occupiedWeight": 0,
		    "occupiedVolume": 0
        });
    });

    test('get positions', async() => {

		
		res = await dao.getPositions();
        expect(res).toEqual({
            "positionID": "800234543412",
		    "aisleID": "8002",
		    "row": 3454,
		    "col": 3412,
		    "maxWeight": 1000,
		    "maxVolume": 1000,
		    "occupiedWeight": 0,
		    "occupiedVolume": 0
        });
    });

});










describe("store positions", () => {
    beforeEach(() => {
        dao.mockReset;
    })
    describe("store position", () => {
        test('storePosition', async () => {
            const position = {
				positionID: '800234543411',
				aisleID: 6002,
				row: 354,
				col: 342,
				maxWeight: 1300,
				maxVolume: 1100
			};

            let res = await dao.storePosition(position.positionID, position.aisleID, position.row, position.col, position.maxWeight, position.maxVolume);
            res = await dao.getPositions();

            expect(res).toEqual([{
				"positionID": "800234543412",
				"aisleID": "8002",
				"row": 3454,
				"col": 3412,
				"maxWeight": 1000,
				"maxVolume": 1000,
				"occupiedWeight": 0,
				"occupiedVolume": 0
			}, {
				"positionID": "800234543411",
				"aisleID": "6002",
				"row": 354,
				"col": 342,
				"maxWeight": 1300,
				"maxVolume": 1100,
				"occupiedWeight": 0,
				"occupiedVolume": 0
			}]);
        })
    });
});
















