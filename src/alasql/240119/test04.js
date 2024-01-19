
alasql.promise([
    'SELECT * FROM CSV("data/first_names.csv", {headers:true}) AS first_names',
    'SELECT * FROM CSV("data/congressmans.csv", {headers:true}) AS congressmans',
]).then(function(tables){

    //console.log(tables);
    const first_names = tables[0];
    const congressmans = tables[1];

    //const sql = 'SELECT * FROM ?';
    //const sql = 'SELECT * FROM ? A JOIN ? B ON B.first_name = A.first_name';
    const sql = `SELECT * FROM ? A JOIN ? B ON B.first_name = A.first_name`;

    const ret = alasql.promise(sql, [first_names, congressmans])
        .then(function(ret){
            console.log(ret);
        }).catch(function(err){
            console.error('Error:', err);
        });
    
}).catch(function(err){
    console.error('Error:', err);
});

