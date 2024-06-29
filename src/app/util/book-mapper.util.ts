import { Book } from "../service/book";
import { Genre } from "../service/genre";

interface BookData {
    author: string;
    title: string;
    publisher: string;
    year: number;
    description: string;
    genre: string;
}

export function mapGenre(genre: string): Genre {
    switch (genre.toLowerCase()) { // TODO: TypeError: undefined is not an object (evaluating 'genre.toLowerCase')
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

// Map the new book data structure to the Book interface
export function mapBookData(BookData: { [key: string]: BookData }): Book {
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