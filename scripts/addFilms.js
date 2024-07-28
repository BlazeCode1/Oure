const { MongoClient } = require('mongodb');

async function run() {
    const uri = "mongodb+srv://admin:12341234@webproject.jkt7ebw.mongodb.net/?retryWrites=true&w=majority&appName=WEBPROJECT"; // Replace with your MongoDB connection string
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();

        const database = client.db('cinema');
        const collection = database.collection('films');

        const films = [
            { title: "The Dark Knight", genre: "Action", type: "Movie", duration: 152, description: "A gripping action-packed movie about the Dark Knight's fight against crime in Gotham City.", img: "url_to_dark_knight_image" },
    { title: "Breaking Bad", genre: "Drama", type: "TV Series", duration: 49, description: "A high school chemistry teacher turned methamphetamine producer faces moral dilemmas and criminal challenges.", img: "url_to_breaking_bad_image" },
    { title: "Superbad", genre: "Comedy", type: "Movie", duration: 113, description: "A hilarious coming-of-age story about two high school friends trying to make the most of their last days before graduation.", img: "url_to_superbad_image" },
    { title: "Game of Thrones", genre: "Action", type: "TV Series", duration: 57, description: "A fantasy epic that follows the power struggles between noble families to claim the Iron Throne.", img: "url_to_game_of_thrones_image" },
    { title: "The Shawshank Redemption", genre: "Drama", type: "Movie", duration: 142, description: "The story of a man's resilience and friendship during his imprisonment at Shawshank prison.", img: "url_to_shawshank_redemption_image" },
    { title: "The Office", genre: "Comedy", type: "TV Series", duration: 22, description: "A mockumentary-style sitcom that captures the everyday lives of office employees working at Dunder Mifflin.", img: "url_to_the_office_image" },
    { title: "Inception", genre: "Action", type: "Movie", duration: 148, description: "A mind-bending thriller about a skilled thief who steals corporate secrets through dream invasion.", img: "url_to_inception_image" },
    { title: "The Sopranos", genre: "Drama", type: "TV Series", duration: 55, description: "The story of a New Jersey mob boss trying to balance his family life with his criminal organization.", img: "url_to_the_sopranos_image" },
    { title: "Anchorman", genre: "Comedy", type: "Movie", duration: 94, description: "A satirical comedy about a chauvinistic news anchor in the 1970s struggling to adapt to changing times.", img: "url_to_anchorman_image" },
    { title: "Stranger Things", genre: "Action", type: "TV Series", duration: 51, description: "A group of kids in the 1980s uncover supernatural occurrences in their small town, leading to mysterious disappearances.", img: "url_to_stranger_things_image" },
    { title: "Forrest Gump", genre: "Drama", type: "Movie", duration: 144, description: "The life story of Forrest Gump, a man with a low IQ who witnesses and influences important historical events.", img: "url_to_forrest_gump_image" },
    { title: "Parks and Recreation", genre: "Comedy", type: "TV Series", duration: 21, description: "A mockumentary-style sitcom that follows the quirky employees of the Parks and Recreation Department in Pawnee, Indiana.", img: "url_to_parks_and_recreation_image" },
    { title: "Mad Max: Fury Road", genre: "Action", type: "Movie", duration: 120, description: "A post-apocalyptic action film about a woman rebelling against a tyrannical ruler with the help of Max Rockatansky.", img: "url_to_mad_max_image" },
    { title: "The Wire", genre: "Drama", type: "TV Series", duration: 59, description: "A gritty, realistic portrayal of various institutions in Baltimore and their impact on society.", img: "url_to_the_wire_image" },
    { title: "The Big Lebowski", genre: "Comedy", type: "Movie", duration: 117, description: "A laid-back bowler named 'The Dude' gets caught up in a kidnapping scheme after being mistaken for a millionaire.", img: "url_to_the_big_lebowski_image" },
    { title: "The Mandalorian", genre: "Action", type: "TV Series", duration: 38, description: "A lone bounty hunter in the outer reaches of the galaxy undertakes missions while protecting a mysterious child.", img: "url_to_the_mandalorian_image" },
    { title: "12 Angry Men", genre: "Drama", type: "Movie", duration: 96, description: "A courtroom drama about a jury deliberating the guilt or innocence of a young defendant accused of murder.", img: "url_to_12_angry_men_image" },
    { title: "Brooklyn Nine-Nine", genre: "Comedy", type: "TV Series", duration: 22, description: "A comedy series that follows the detectives of the 99th precinct of the New York City Police Department.", img: "url_to_brooklyn_nine_nine_image" },
    { title: "Gladiator", genre: "Action", type: "Movie", duration: 155, description: "A Roman general turned gladiator seeks revenge against the corrupt emperor who betrayed him and his family.", img: "url_to_gladiator_image" },
    { title: "True Detective", genre: "Drama", type: "TV Series", duration: 55, description: "An anthology series in which police investigations reveal the personal and professional secrets of those involved.", img: "url_to_true_detective_image" },
    { title: "Step Brothers", genre: "Comedy", type: "Movie", duration: 98, description: "Two middle-aged, childish men become stepbrothers when their single parents marry, leading to comedic clashes.", img: "url_to_step_brothers_image" },
    { title: "The Boys", genre: "Action", type: "TV Series", duration: 60, description: "A group of vigilantes set out to take down corrupt superheroes who abuse their powers.", img: "url_to_the_boys_image" },
    { title: "Fight Club", genre: "Drama", type: "Movie", duration: 139, description: "A disillusioned office worker forms an underground fight club with a charismatic soap salesman.", img: "url_to_fight_club_image" },
    { title: "Friends", genre: "Comedy", type: "TV Series", duration: 22, description: "The lives, relationships, and comedic misadventures of six friends living in New York City.", img: "url_to_friends_image" },
    { title: "Die Hard", genre: "Action", type: "Movie", duration: 132, description: "An NYPD officer tries to save hostages, including his wife, taken by German terrorists during a Christmas party.", img: "url_to_die_hard_image" },
    { title: "Better Call Saul", genre: "Drama", type: "TV Series", duration: 47, description: "The story of a small-time lawyer, Jimmy McGill, and his transformation into morally challenged lawyer Saul Goodman.", img: "url_to_better_call_saul_image" },
    { title: "Dumb and Dumber", genre: "Comedy", type: "Movie", duration: 107, description: "Two dim-witted friends embark on a cross-country journey to return a briefcase full of money to its owner.", img: "url_to_dumb_and_dumber_image" },
    { title: "John Wick", genre: "Action", type: "Movie", duration: 101, description: "A retired hitman seeks vengeance for the killing of his dog, a final gift from his deceased wife.", img: "url_to_john_wick_image" },
    { title: "The Crown", genre: "Drama", type: "TV Series", duration: 58, description: "A biographical story about the reign of Queen Elizabeth II and the events that shaped the second half of the 20th century.", img: "url_to_the_crown_image" },
    { title: "Borat", genre: "Comedy", type: "Movie", duration: 84, description: "A fictional Kazakh journalist travels through the United States to make a documentary and satirize American culture.", img: "url_to_borat_image" }
        ];

        const result = await collection.insertMany(films);
        console.log(`${result.insertedCount} films were inserted`);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);