import { Book } from "../service/book";
import { Genre } from "../service/genre";
import { BookData } from "./BookData";

// for GET requests
export function mapBookDataToBook(BookData: { [key: string]: BookData }): Book {
    const [id, bookData] = Object.entries(BookData)[0];

    return {
        id,
        author: bookData.author,
        title: bookData.title,
        publisher: bookData.publisher,
        year: bookData.year,
        description: bookData.description,
        genre: mapGenre(bookData.genre)
    };
}

// for POST requests
export function mapBookToBookData(book: Book): BookData {
    return {
        author: book.author,
        title: book.title,
        publisher: book.publisher,
        year: book.year,
        description: book.description,
        genre: mapGenreToString(book.genre)
    };
}

function mapGenre(genre: string): Genre {
    switch (genre.toLowerCase()) { // TODO: possible bug: `TypeError: undefined is not an object (evaluating 'genre.toLowerCase')`
        case 'dráma': return Genre.Drama;
        case 'életrajz, emlékirat': return Genre.NonFiction;
        case 'elbeszélés': return Genre.Narrative;
        case 'fantázia': return Genre.Fantasy;
        case 'gyermek mese': return Genre.ChildrenStory;
        case 'horror': return Genre.Horror;
        case 'humor': return Genre.Comedy;
        case 'krimi': return Genre.DetectiveNovel;
        case 'sci-fi': return Genre.Scifi;
        case 'short story': return Genre.ShortStory;
        case 'verses kötet': return Genre.Verse;
        case 'vallás, mitológia': return Genre.Religion;
        default: throw new Error(`Unknown genre: ${genre}`);
    }
}

function mapGenreToString(genre: Genre): string {
    switch (genre) {
        case Genre.Comedy: return 'humor';
        case Genre.ChildrenStory: return 'gyermek mese';
        case Genre.DetectiveNovel: return 'krimi';
        case Genre.Drama: return 'dráma';
        case Genre.Fantasy: return 'fantázia';
        case Genre.Horror: return 'horror';
        case Genre.Narrative: return 'elbeszélés';
        case Genre.NonFiction: return 'életrajz, elbeszélés';
        case Genre.Religion: return 'vallás, mitológia';
        case Genre.Scifi: return 'sci-fi';
        case Genre.ShortStory: return 'novella';
        case Genre.Verse: return 'verses kötet';
        default: throw new Error(`Unknown genre: ${genre}`)
    }
}


