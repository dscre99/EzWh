const PositionService = require('../../Position/Position');
const dao = require('./mock_position_dao')
const position_service = new PositionService(dao);


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

    test('get position', async () => {

		// let req = {"body":{}};
		// let res = await position_service.get_positions();
		
        expect(res).toEqual([{
            "positionID": "800234543412",
		    "aisleID": "8002",
		    "row": 3454,
		    "col": 3412,
		    "maxWeight": 1000,
		    "maxVolume": 1000,
		    "occupiedWeight": 0,
		    "occupiedVolume": 0
        }]);
    });

});

