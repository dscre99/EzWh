const TestDescriptorDAO = require('../../Test_descriptor/Test_Descriptor_DAO');
const test_descriptor_dao = new TestDescriptorDAO();

function test_get_test_descriptor(expected) {
    test('Get Test Descriptor', async () => {
        let res = await test_descriptor_dao.get_test_descriptors_DB();
        expect(res).toEqual(expected);
    });
}

function test_new_test_descriptor(name, procedureDescription, idSKU, expected) {
    test('New Test Descriptor', async () => {
        
        
        let test_descriptor = {
            name: name,
            procedureDescription: procedureDescription,
            idSKU: idSKU
        }

        let res = await test_descriptor_dao.post_test_descriptor_DB(test_descriptor);
        expect(res).toEqual(expected);
    });
}

function test_get_test_descriptor_by_ID(test_descriptor_ID, expected) {
    test('Get Test Descriptor by ID', async () => {
        let res = await test_descriptor_dao.get_test_descriptor_by_ID_DB(test_descriptor_ID);
        expect(res).toEqual(expected);
    });
}

function test_modify_test_descriptor(ID, newTestDescriptor, expected) {
    test('Modify Test Descriptor', async () => {
        try {
            let res = await test_descriptor_dao.put_test_descriptor_by_ID_DB(ID, newTestDescriptor);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}

function test_delete_test_descriptor(ID, expected) {
    test('Delete Test Descriptor', async () => {
        try {
            let res = await test_descriptor_dao.delete_test_descriptor_by_ID_DB(ID);
            expect(res).toEqual(expected);
        } catch (err) {
            expect(err).toEqual(expected);
        }

    });
}


describe('Test Test Descriptor', () => {

    let test_descriptor = {
		"name": "Test Descriptor 1",
        "procedureDescription": "Procedure Description 1 ...",
        "idSKU": 1
	}


    beforeAll(async () => {
        let drop = await test_descriptor_dao.dropTestDescriptorTable();
        expect(drop).toEqual(200);
        let table = await test_descriptor_dao.newTestDescriptorTable();
        expect(table).toEqual(200);
        let res = await test_descriptor_dao.post_test_descriptor_DB(test_descriptor);
        expect(res).toEqual(true);
    });

    test_get_test_descriptor([
        {
            "id": 1,
            "name": "Test Descriptor 1",
            "procedureDescription": "Procedure Description 1 ...",
            "idSKU": 1
        }
    ])

    test_delete_test_descriptor(1, true);

    test_new_test_descriptor("Test Descriptor 2", "Procedure Description 2 ...", 1, true);

    test_get_test_descriptor([
        {
            "id": 2,
            "name": "Test Descriptor 2",
            "procedureDescription": "Procedure Description 2 ...",
            "idSKU": 1 
        }
    ])

    test_get_test_descriptor_by_ID(2, {"id": 2, "name": "Test Descriptor 2", "procedureDescription": "Procedure Description 2 ...","idSKU": 1 });
    test_modify_test_descriptor(1, {"name": "Test Descriptor 1 updated", "procedureDescription":"Procedure Description 1 updated ...", "idSKU":1}, 404);
	test_delete_test_descriptor(2,true);

    test_get_test_descriptor([]);

    // test_new_test_descriptor("Test Descriptor 3", "Procedure Description 3 ...", 3, true);
    // test_new_test_descriptor("Test Descriptor 4", "Procedure Description 4 ...", 4, true);
    // test_new_test_descriptor("Test Descriptor 5", "Procedure Description 5 ...", 5, true);
    // test_new_test_descriptor("Test Descriptor 6", "Procedure Description 6 ...", 6, true);

    // test_get_test_descriptor([
    //     {
    //         "id": 3,
    //         "name": "Test Descriptor 3",
    //         "procedureDescription": "Procedure Description 3 ...",
    //         "idSKU": 3   
    //     },
    //     {
    //         "id": 4,
    //         "name": "Test Descriptor 4",
    //         "procedureDescription": "Procedure Description 4 ...",
    //         "idSKU": 4   
    //     },
    //     {
    //         "id": 5,
    //         "name": "Test Descriptor 5",
    //         "procedureDescription": "Procedure Description 5 ...",
    //         "idSKU": 5   
    //     },
    //     {
    //         "id": 6,
    //         "name": "Test Descriptor 6",
    //         "procedureDescription": "Procedure Description 6 ...",
    //         "idSKU": 6   
    //     }
    // ])
    
})
