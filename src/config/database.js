import Firebird from "node-firebird";

const dbOptions = {
    host: '192.168.0.161',
    port: 3050,
    database:'D:/Desenvolvimento/.old/API/API_FIREBIRD.FDB',  //'D:/Desenvolvimento/API/API_FIREBIRD.FDB',
    user: 'SYSDBA',
    password: 'masterkey',
};
//ssql == query
function executeQuery(ssql, params, callback){

Firebird.attach(dbOptions, function(err, db) {

    if (err){
       return callback(err, []);
    }

    // db = DATABASE
    db.query(ssql, params, function(err, result) {
        // IMPORTANT: close the connection
        db.detach();
        if (err){
            return callback(err, []);
         } else {
            return callback(undefined, result);
         }
    });

});

}

export {executeQuery};

