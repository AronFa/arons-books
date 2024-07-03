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
        case 'horror': return Genre.Horror;
        case 'sci-fi': return Genre.Scifi;
        case 'drama': return Genre.Drama;
        case 'detective novel': return Genre.DetectiveNovel;
        case 'children story': return Genre.ChildrenStory;
        case 'comedy': return Genre.Comedy;
        case 'non-fiction': return Genre.NonFiction;
        case 'narrative': return Genre.Narrative;
        case 'religion': return Genre.Religion;
        case 'short story': return Genre.ShortStory;
        case 'fantasy': return Genre.Fantasy;
        case 'verse': return Genre.Verse;
        default: throw new Error(`Unknown genre: ${genre}`);
    }
}

function mapGenreToString(genre: Genre): string {
    switch (genre) {
        case Genre.Horror: return 'horror';
        case Genre.Scifi: return 'sci-fi';
        case Genre.Drama: return 'drama';
        case Genre.DetectiveNovel: return 'detective novel';
        case Genre.ChildrenStory: return 'childer story';
        case Genre.Comedy: return 'comedy';
        case Genre.NonFiction: return 'non-fiction';
        case Genre.Narrative: return 'narretive';
        case Genre.Religion: return 'religion';
        case Genre.ShortStory: return 'short-story';
        case Genre.Fantasy: return 'fantasy';
        case Genre.Verse: return 'verse';
        default: throw new Error(`Unknown genre: ${genre}`)
    }
}
