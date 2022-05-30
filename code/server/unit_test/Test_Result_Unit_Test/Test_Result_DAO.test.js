const TestResultDAO = require('../../Test_result/Test_result_DAO');
const test_result_dao = new TestResultDAO();

function test_get_test_result(RFID, expected) {
    test('Get Test Result', async () => {
        try {
            let res = await test_result_dao.get_test_results_DB(RFID);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }
        
    });
}

function test_new_test_result(test_result, expected) {
    test('New Test Result', async () => {
        let res = await test_result_dao.post_test_result_DB(test_result);
        expect(res).toEqual(expected);
    });
}

function test_get_test_result_with_ID_by_RFID(ID, RFID, expected) {
    test('Get Test Result with ID by RFID', async () => {
        try {
            let res = await test_result_dao.get_test_result_with_id_from_rfid_DB(ID, RFID);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }
    });
}

function test_modify_test_result_with_ID_from_RFID(ID, RFID, newTestResult, expected) {
    test('Modify Test Result', async () => {
        try {
            let res = await test_result_dao.put_test_result_with_id_from_rfid_DB(ID, RFID, newTestResult);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}

function test_delete_test_result_with_id_from_rfid(ID, RFID, expected) {
    test('Delete Test Result', async () => {
        try {
            let res = await test_result_dao.delete_test_result_with_id_from_rfid_DB(ID, RFID);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}


describe('Test Test Result', () => {

    let test_result = {
		"RFID": "12345678901234567890123456789016",
        "DATE": "2021/11/28",
        "RESULT": "true",
        "IDTESTDESCRIPTOR":12
	}

    beforeAll(async () => {
        let drop = await test_result_dao.dropTestResultTable();
        expect(drop).toEqual(200);
        let table = await test_result_dao.newTestResultTable();
        expect(table).toEqual(200);
        let res = await test_result_dao.post_test_result_DB(test_result);
        expect(res).toEqual("Test Result succesfully added to the Database!");
    });

    test_get_test_result("118129282192", "The requested RFID doesn't exist!");

    let another_test_result = {"RFID":"12345678901234567890123456789015", "DATE":"2022/05/23", "RESULT":"false", "IDTESTDESCRIPTOR":13};

    test_new_test_result(another_test_result, "Test Result succesfully added to the Database!");

    test_get_test_result("12345678901234567890123456789017", 
        "The requested RFID doesn't exist!"
    )

    test_new_test_result({"RFID":"12345678901234567890123456789014", "DATE":"2022/02/20", "RESULT":"true", "IDTESTDESCRIPTOR":10}, "Test Result succesfully added to the Database!");


    test_get_test_result("12345678901234567890123456789014", 
        [{"ID":3, "RFID":"12345678901234567890123456789014", "DATE":"2022/02/20", "RESULT":"true", "IDTESTDESCRIPTOR":10}]
    )

    let new_test_result = {"IDTESTDESCRIPTOR":1, "DATE":"2022/05/24", "RESULT":"true"};
    
    test_modify_test_result_with_ID_from_RFID(2,"12345678901234567890123456789013", new_test_result, "The requested RFID doesn't exist!");
    test_delete_test_result_with_id_from_rfid(2, "12345678901234567890123456789013", "The requested RFID doesn't exist!");
    test_delete_test_result_with_id_from_rfid(2, "42345678901234567890123456789015", "The requested RFID doesn't exist!");
    test_delete_test_result_with_id_from_rfid(3, "12345678901234567890123456789014", true);

    test_get_test_result("12345678901234567890123456789014", []);


    test_new_test_result({"RFID":"12345678901234567890123456789014", "DATE":"2021/10/12", "RESULT":"false", "IDTESTDESCRIPTOR":1}, "Test Result succesfully added to the Database!");

    test_get_test_result_with_ID_by_RFID(4, "12345678901234567890123456789014", [{"ID":4, "RFID":"12345678901234567890123456789014", "DATE":"2021/10/12", "RESULT":"false", "IDTESTDESCRIPTOR":1}])    

    test_modify_test_result_with_ID_from_RFID(4, "12345678901234567890123456789014", new_test_result, "Test Result Updated!");


})  



