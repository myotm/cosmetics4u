var dbController = require('./dbController');
var db = require('../helpers/db');
var dbError = 'DB Error. Details: ';
var uuid = require('../helpers/uuid');


exports.create = async (entity, data) => {
    try{
        if (!data.id){
            data.id = uuid.create();
        }

        var dbConn = db.collection(entity);
        var result = await dbController.create(dbConn, data);
        return {
            id: result.ops[0].id
        };
    } catch(err){
        await Promise.reject(new Error(dbError + err));
    }
}


exports.update = async (entity, data, criteria) => {
    try {
        var dbConn = db.collection(entity);
        await dbController.update(dbConn, data, criteria);
    } catch(err) {
        await Promise.reject(new Error(dbError + err));
    }
}

exports.remove = async (entity, criteria) => {
    try {
        var dbConn = db.collection(entity);
        await dbController.remove(dbConn, criteria);
    } catch(err) {
        await Promise.reject(new Error(dbError + err));
    }
}

exports.find = async (entity, criteria) => {
    try {
        var dbConn = db.collection(entity);
        return await dbController.find(dbConn, criteria);
    } catch(err) {
        await Promise.reject(new Error(dbError + err));
    }
}


