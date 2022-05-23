const Position_DAO = require('../../Position/Position_DAO');
const position_dao = new Position_DAO();

function test_get_positions(expected) {
    test('Get Positions', async () => {
        let res = await position_dao.getPositions();
        expect(res).toEqual(expected);
    });
}

function test_new_position(positionID, aisleID, row, col, maxWeight, maxVolume, expected) {
    test('New Position', async () => {
        let position = {
            positionID: positionID,
            aisleID: aisleID,
            row: row,
            col: col,
            maxWeight: maxWeight,
            maxVolume: maxVolume,
			occupiedWeight: 0,
			occupiedVolume: 0
        }

        let res = await position_dao.storePosition(position);
        expect(res).toEqual(expected);
    });
}

function test_modify_position(positionID, aisleID, row, col, maxWeight, maxVolume, occupiedWeight, occupiedVolume, expected) {
    test('Modify Position', async () => {
        let position = {
            positionID: positionID,
            aisleID: aisleID,
            row: row,
            col: col,
            maxWeight: maxWeight,
            maxVolume: maxVolume,
            occupiedWeight: occupiedWeight,
			occupiedVolume:occupiedVolume
        }
        try {
            let res = await position_dao.put_position_by_ID_DB(positionID, position);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}

function test_modify_position_ID(actual_positionID, new_positionID, expected) {
    test('Modify Position ID', async () => {
        
        try {
            let res = await position_dao.put_positionID_by_ID_DB(actual_positionID, new_positionID);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}

function test_delete_position(positionID, expected) {
    test('Delete Position', async () => {
        try {
            let res = await position_dao.delete_position_by_ID_DB(positionID);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}



describe('Test Position', () => {

    let position = {
		"positionID": "800234543412",
		"aisleID": "8002",
		"row": 3454,
		"col": 3412,
		"maxWeight": 1000,
		"maxVolume": 1000,
		"occupiedWeight": 0,
		"occupiedVolume": 0
	}


    beforeAll(async () => {
        let drop = await position_dao.dropPositionTable();
        expect(drop).toEqual(200);
        let table = await position_dao.newPositionTable();
        expect(table).toEqual(200);
        let pos = await position_dao.storePosition(position);
        expect(pos).toEqual(position.positionID);
    });

    test_get_positions([
		{
			"positionID": "800234543412",
			"aisleID": "8002",
			"row": 3454,
			"col": 3412,
			"maxWeight": 1000,
			"maxVolume": 1000,
			"occupiedWeight": 0,
			"occupiedVolume": 0
		}
	])

	test_new_position("800234545410", "6000", 2000, 1200, 300, 200, "800234545410");
	test_modify_position("800234545410", "500", 14, 12, 30, 10, 3, 5, true);
	test_modify_position_ID("800234545410", "500234545417", true);
	test_delete_position("800234545410", true);

    
})