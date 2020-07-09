// function demoAsyncNature() {
//     setTimeout(() => {
//         console.log("Executing after 4 seconds");
//     })
// }

// demoAsyncNature();

console.log("1 : Before calling Db ... ")

function getMovieDataFromDb() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("2 : Reading movie data from our db ... ");
            let dbData = { id: 30, name: 'Avengers : End Game' }
            resolve(dbData.name);
        }, 4000);
    })
    
}

// let movieDataFromDB = getMovieDataFromDb();
// console.log("3 : Movie data : " + movieDataFromDB);

// -- Using Resolved Promise --
// getMovieDataFromDb().then((result) => {
//     let movieDataFromDB = result;
//     console.log("3 : Movie data : " + movieDataFromDB);
// });

async function printMovieDetails() {
    let movieDataFromDB = await getMovieDataFromDb();
    console.log("3 : Movie data : " + movieDataFromDB);
}

printMovieDetails();


console.log("4 : Doing some other work now ... ");
