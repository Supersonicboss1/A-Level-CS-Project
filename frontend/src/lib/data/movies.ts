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
    description: "a world where people cannot afford umbrellas",
    genres: ["Drama"],
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler", "Clancy Brown", "Gil Bellows", "James Whitmore"]
},
{
    id: 1,
    title: "The Godfather",
    posterURL: "https://upload.wikimedia.org/wikipedia/en/1/1c/Godfather_ver1.jpg",
    year: 1972,
    rating: 9.2,
    description: "some film people like",
    genres: ["Drama", "Crime"],
    actors: ["Marlon Brando", "Al Pacino", "James Caan", "Richard S. Castellano", "Robert Duvall", "Sterling Hayden", "John Marley", "Richard Conte"]
},
{
    id: 2,
    title: "The Godfather: Part II",
    posterURL: "https://upload.wikimedia.org/wikipedia/en/0/03/Godfather_part_ii.jpg",
    year: 1974,
    rating: 9.0,
    description: "the second father",
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
    description: "the first asian man that can play sports",
    genres: ["Documentary", "Biography", "Sports"],
    actors: ["Jeremy Lin", "Daniel Dae Kim", "Ming Yao", "Landry Fields", "Mike D'Antoni", "Steve Novak", "Tyson Chandler", "Carmelo Anthony"]
},
{
    id: 5,
    title: "Oppenheimer",
    posterURL: "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_.jpg",
    year: 1980,
    rating: 7.4,
    description: '"i am becom" - oppenheimer, 2023',
    genres: ["Drama", "Biography"],
    actors: ["Sam Waterston", "John Cullum", "Richard Dysart", "Joanna Cassidy", "David Ogden Stiers", "Fritz Weaver", "Barnard Hughes", "Tom Bower"]
},
{
    id: 6,
    title: "Scully and Mooey",
    posterURL: "https://m.media-amazon.com/images/I/617U1Qz4GLL._AC_UF894,1000_QL80_.jpg",
    year: 2019,
    rating: 7.4,
    description: "ITS MOOEY GUYS LOOK ITS MOOEY",
    genres: ["Comedy"],
    actors: ["Scully", "Mooey"]
},
{
    id: 7,
    title: "The Hunger Games: The Ballad of Songbirds and Snakes",
    posterURL: "https://m.media-amazon.com/images/M/MV5BOTZmMmY2MzctMjU2Yy00YjJlLTk1NjAtY2U4MmMxOWZkZWY4XkEyXkFqcGdeQXVyMjM4NTM5NDY@._V1_.jpg",
    year: 2020,
    rating: 7.4,
    description: "they're even hungrier now",
    genres: ["Action", "Adventure", "Sci-Fi"],
    actors: ["Jennifer Lawrence", "Josh Hutcherson", "Liam Hemsworth", "Woody Harrelson", "Elizabeth Banks", "Julianne Moore", "Philip Seymour Hoffman", "Jeffrey Wright"]
},
{
    id: 8,
    title: "Wish",
    posterURL: "https://lumiere-a.akamaihd.net/v1/images/image_2c6cb554.jpeg",
    year: 2019,
    rating: 7.4,
    description: "generic disney movie #300,001",
    genres: ["Drama", "Fantasy"],
    actors: ["Will Smith", "Mena Massoud", "Naomi Scott", "Marwan Kenzari", "Navid Negahban", "Nasim Pedrad", "Billy Magnussen", "Jordan A. Nash"]
},
{
    id: 9,
    title: "Wonka",
    posterURL: "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/xAKI0O5hUXxbmHRBNg72IzFQ06a.jpg",
    year: 2023,
    rating: 7.4,
    description: "Mr Cadburys kidnaps kids for fun",
    genres: ["Comedy", "Family", "Fantasy"],
    actors: ["Timothée Chalamet", "Keegan-Michael Key", "Olivia Colman", "Rowan Atkinson", "Simon Farnaby", "Richard Ayoade", "Sally Hawkins", "Rami Malek"]
},
{
    id: 10,
    title: "Cannahuana: The Moweed",
    posterURL: "https://images.justwatch.com/poster/12099128/s276/cannahuana-the-moweed.webp",
    year: 2020,
    rating: 7.4,
    description: "some plant or something",
    genres: ["Documentary"],
    actors: []
}
]