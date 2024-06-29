export enum Genre {
  Horror = "horror",
  Scifi = "sci-fi",
  Drama = "drama",
  DetectiveNovel = "detective novel",
  ChildrenStory = "children story",
  Comedy = "comedy",
  NonFiction = "non-fiction",
  Narrative = "narrative",
  Religion = "religion",
  ShortStory = "short story",
  Fantasy = "fantasy",
  Verse = "verse"
}

export function mapGenre(genre: string): Genre {

  switch (genre.toLowerCase()) {
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
