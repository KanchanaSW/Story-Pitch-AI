export interface StorySchema {
  title: string;
  genre: string;
  tagline: string;
  synopsis: string;
  characters: { name: string; role: string }[];
  twist: string;
}
