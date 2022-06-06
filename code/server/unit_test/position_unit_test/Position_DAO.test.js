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
            newAisleID: aisleID,
            newRow: row,
            newCol: col,
            newMaxWeight: maxWeight,
            newMaxVolume: maxVolume,
            newOccupiedWeight: occupiedWeight,
			newOccupiedVolume:occupiedVolume
        }
        try {
            let res = await position_dao.put_position_by_ID_DB(positionID, position);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}

function test_modify_position_ID(actual_positionID, body, expected) {
    test('Modify Position ID', async () => {
		let data = {
			newPositionID: body.positionID,
			newAisleID: body.aisleID,
            newRow: body.row,
            newCol: body.col,
            newMaxWeight: body.maxWeight,
            newMaxVolume: body.maxVolume,
            newOccupiedWeight: body.occupiedWeight,
			newOccupiedVolume:body.occupiedVolume
		}
        try {
            let res = await position_dao.put_positionID_by_ID_DB(actual_positionID, data);
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
		},
        {
            "positionID": "800234545410",
			"aisleID": "500",
			"row": 14,
			"col": 12,
			"maxWeight": 30,
			"maxVolume": 10,
			"occupiedWeight": 3,
			"occupiedVolume": 5  
        }
	])


	test_modify_position_ID("800234545410", {"positionID":"500234545417", "aisleID": "500", "row": 14, "col": 12, "maxWeight": 30, "maxVolume": 10, "occupiedWeight": 3,"occupiedVolume": 5}, true);
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
		},
        {
            "positionID": "500234545417",
			"aisleID": "500",
			"row": 14,
			"col": 12,
			"maxWeight": 30,
			"maxVolume": 10,
			"occupiedWeight": 3,
			"occupiedVolume": 5  
        }
	])
    test_delete_position("500234545417", true);

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

    test_new_position("100234545416", "1000", 6000, 2200, 700, 1200, "100234545416");
    test_new_position("200234545417", "2000", 7000, 3200, 800, 1300, "200234545417");
    test_new_position("300234545418", "3000", 8000, 4200, 900, 1400, "300234545418");
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
		},
        {
			"positionID": "100234545416",
			"aisleID": "1000",
			"row": 6000,
			"col": 2200,
			"maxWeight": 700,
			"maxVolume": 1200,
			"occupiedWeight": 0,
			"occupiedVolume": 0
		},
        {
			"positionID": "200234545417",
			"aisleID": "2000",
			"row": 7000,
			"col": 3200,
			"maxWeight": 800,
			"maxVolume": 1300,
			"occupiedWeight": 0,
			"occupiedVolume": 0
		},
        {
			"positionID": "300234545418",
			"aisleID": "3000",
			"row": 8000,
			"col": 4200,
			"maxWeight": 900,
			"maxVolume": 1400,
			"occupiedWeight": 0,
			"occupiedVolume": 0
		}
	])
    test_new_position("400234545419", "4000", 9000, 5200, 1000, 1500, "400234545419");
    test_new_position("500234545410", "5000", 1000, 6200, 1100, 1600, "500234545410");


    
})