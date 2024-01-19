
alasql.promise([
    'SELECT * FROM CSV("data/first_names.csv", {headers:true}) AS first_names',
    'SELECT * FROM CSV("data/congressmans.csv", {headers:true}) AS congressmans',
]).then(function(tables){

    const first_names = tables[0];
    //console.log(tables);

    const sql = 'SELECT * FROM ?';
    //const sql = 'SELECT * FROM first_names';


    //const ret = alasql.promise(sql, [first_names])
    const ret = alasql.promise(sql, [first_names])
        .then(function(ret){
            console.log(ret);
        }).catch(function(err){
            console.error('Error:', err);
        });
    
}).catch(function(err){
    console.error('Error:', err);
});

