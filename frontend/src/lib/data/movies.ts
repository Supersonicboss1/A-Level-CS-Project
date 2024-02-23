export type Movie = {
    id: number;
    title: string;
    posterURL: string;
    year: number;
    rating: number;
    description: string;
    genres: string[]
    actors: string[];

};

export type MovieList = Movie[];




export const movies: MovieList = [{
    id: 0,
    title: "The Shawshank Redemption",
    posterURL: "https://upload.wikimedia.org/wikipedia/en/8/81/ShawshankRedemptionMoviePoster.jpg",
    year: 1994,
    rating: 9.3,
    description: "Andy Dufresne, a successful banker, is arrested for the murders of his wife and her lover, and is sentenced to life imprisonment at the Shawshank prison. He becomes the most unconventional prisoner.",
    genres: ["Drama"],
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown", "Gil Bellows", "James Whitmore"]
},
{
    id: 1,
    title: "The Godfather",
    posterURL: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    year: 1972,
    rating: 9.2,
    description: "Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son, Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
    genres: ["Drama", "Crime"],
    actors: ["Marlon Brando", "Al Pacino", "James Caan", "Richard S. Castellano", "Robert Duvall", "Sterling Hayden", "John Marley", "Richard Conte"]
},
{
    id: 2,
    title: "The Godfather: Part II",
    posterURL: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg",
    year: 1974,
    rating: 9.0,
    description: "Michael, Vito Corleone's son, attempts to expand his family's crime empire. While he strikes a business deal with gangster Hyman Roth, he remains unaware of the dangers he has gotten himself into.",
    genres: ["Drama", "Crime"],
    actors: ["Al Pacino", "Robert Duvall", "Diane Keaton", "Robert De Niro", "John Cazale", "Talia Shire", "Lee Strasberg", "Michael V. Gazzo"]

},
{
    id: 3,
    title: "Omar",
    posterURL: "https://s3.amazonaws.com/static.rogerebert.com/uploads/movie/movie_poster/omar-2013/large_4DimIhSAnEbJxbzs6byZqLnU1mI.jpg",
    year: 2013,
    rating: 7.6,
    description: "Omar is beaten and humiliated by Israeli soldiers.",
    genres: ["Drama", "Thriller", "Romance"],
    actors: ["Adam Bakri", "Leem Lubany", "Eyad Hourani", "Samer Bisharat", "Waleed Zuaiter", "Suhail Haddad", "Claude Musar", "Mohammad Fouad"]
},
{
    id: 4,
    title: "Linsanity",
    posterURL: "https://m.media-amazon.com/images/M/MV5BMjAxNzU4ODM3Nl5BMl5BanBnXkFtZTgwNTIwMTEyMDE@._V1_.jpg",
    year: 2013,
    rating: 7.4,
    description: "This is a documentary film about the rise of Asian American basketball player Jeremy Lin.",
    genres: ["Documentary", "Biography", "Sports"],
    actors: ["Jeremy Lin", "Daniel Dae Kim", "Ming Yao", "Landry Fields", "Mike D'Antoni", "Steve Novak", "Tyson Chandler", "Carmelo Anthony"]
},
{
    id: 5,
    title: "Oppenheimer",
    posterURL: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
    year: 2023,
    rating: 9.4,
    description: 'The story of the development of the "Atomic Bomb" by the US government during WWII, with many of the participants swearing secrecy about their work at the time.',
    genres: ["Drama", "Biography"],
    actors: ["Sam Waterston", "John Cullum", "Richard Dysart", "Joanna Cassidy", "David Ogden Stiers", "Fritz Weaver", "Barnard Hughes", "Tom Bower"]
},
{
    id: 6,
    title: "Scully and Mooey",
    posterURL: "https://m.media-amazon.com/images/I/617U1Qz4GLL._AC_UF894,1000_QL80_.jpg",
    year: 2019,
    rating: 7.4,
    description: "Scully, a Liverpudlian teenager, dreams of playing for Liverpool FC. His imagination twists the world around him, including 'visions' of Kenny Dalglish. But in reality he must deal with family, friends and above all avoid the school Panto.",
    genres: ["Comedy"],
    actors: ["Scully", "Mooey"]
},
{
    id: 7,
    title: "The Hunger Games: The Ballad of Songbirds and Snakes",
    posterURL: "https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
    year: 2020,
    rating: 7.4,
    description: "The story of the Hunger Games prequel book, The Ballad of Songbirds and Snakes, will focus on the events of the 10th Hunger Games, 64 years before the events of the original Hunger Games trilogy.",
    genres: ["Action", "Adventure", "Sci-Fi"],
    actors: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth", "Woody Harrelson", "Elizabeth Banks", "Julianne Moore", "Philip Seymour Hoffman", "Jeffrey Wright"]
},
{
    id: 8,
    title: "Wish",
    posterURL: "https://lumiere-a.akamaihd.net/v1/images/image_2c6cb554.jpeg",
    year: 2019,
    rating: 4.4,
    description: "Young Asha makes a wish so powerful that it's answered by a cosmic force, a little ball of boundless energy called Star. With Star's help, Asha must save her kingdom from King Magnifico and prove that when the will of one courageous human connects with the magic of the stars, wondrous things can happen.",
    genres: ["Drama", "Fantasy"],
    actors: ["Will Smith", "Mena Massoud", "Naomi Scott", "Marwan Kenzari", "Navid Negahban", "Nasim Pedrad", "Billy Magnussen", "Jordan A. Nash"]
},
{
    id: 9,
    title: "Wonka",
    posterURL: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/xAKI0O5hUXxbmHRBNg72IzFQ06a.jpg",
    year: 2023,
    rating: 7.4,
    description: "Armed with nothing but a hatful of dreams, young chocolatier Willy Wonka manages to change the world, one delectable bite at a time.",
    genres: ["Comedy", "Family", "Fantasy"],
    actors: ["Timothée Chalamet", "Keegan-Michael Key", "Olivia Colman", "Rowan Atkinson", "Simon Farnaby", "Richard Ayoade", "Sally Hawkins", "Rami Malek"]
},
{
    id: 10,
    title: "Cannahuana: The Moweed",
    posterURL: "https://images.justwatch.com/poster/12099128/s276/cannahuana-the-moweed.webp",
    year: 2020,
    rating: 7.4,
    description: "A documentary about Cannahuana, the moweed.",
    genres: ["Documentary"],
    actors: []
},
{
    id: 11,
    title: "Rocky",
    posterURL: "https://upload.wikimedia.org/wikipedia/en/1/18/Rocky_poster.jpg",
    year: 1976,
    rating: 8.1,
    description: "Rocky Balboa, a small-time boxer, gets a supremely rare chance to fight heavy-weight champion Apollo Creed in a bout in which he strives to go the distance for his self-respect.",
    genres: ["Drama", "Sport"],
    actors: ["Sylvester Stallone", "Talia Shire", "Burt Young", "Carl Weathers", "Burgess Meredith", "Thayer David", "Joe Spinell", "Jimmy Gambina"]
}
]

export const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Biography",
    "Comedy",
    "Crime",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Film-Noir",
    "History",
    "Horror",
    "Music",
    "Musical",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Sport",
    "Thriller",
    "War",
    "Western",
];
export const ageRatings = ["U", "PG", "12A", "12", "15", "18"];