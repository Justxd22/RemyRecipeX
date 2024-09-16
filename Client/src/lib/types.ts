 // Define the structure of the response
type Ingredient = {
  name: string;
  quantity: string;
  unit?: string;
  notes?: string;
};

type Instruction = {
  step: string;
  notes: string;
};

export type Recipe = {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
};

// Update your Redux state to store the Recipe object
export type ResponseState = {
  geminiResponse: Recipe | null; // Can be null initially
  error: string;
  movieResponse: MovieData | null;
};


export type MovieData = {
  image: string;
  name: string;
  desc: string;
  lang: string;
};