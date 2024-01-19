
//const sql = 'SELECT * FROM CSV("data/first_names.csv", {headers:true})';

//const sql = 'SELECT * FROM CSV("data/first_names.csv", {headers:true}) A';






    //SELECT A.*
    //FROM CSV("data/first_names.csv", {headers:true}) A
    //JOIN CSV("data/congressmans.csv", {headers:true}) B
        //ON B.first_name = A.name
    //ORDER BY B.first_name, last_name

    //WITH fnames AS (
        //SELECT *
        //FROM CSV("data/first_names.csv", {headers:true})
    //), congs AS (
        //SELECT *
        //FROM CSV("data/congressmans.csv", {headers:true})
    //)
    //SELECT B.*
    //FROM fnames
    //JOIN congs B
        //ON B.first_name = A.first_name




alasql.promise(sql)
    .then(function(data){
    


        
        console.log(data);
    }).catch(function(err){
        console.log('Error:', err);
    });

