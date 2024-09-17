import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { closeResponseDialog } from "../state/dialogSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MovieData, Recipe } from "../lib/types";
import "../assets/stylesheets/updatedHome.css";
const RecipeModal = () => {
  const dispatch = useDispatch();
  const recipeResponse = useSelector(
    (state: RootState) => state.response.geminiResponse
  ) as string | null;
  const movie = useSelector(
    (state: RootState) => state.response.movieResponse
  ) as MovieData | null;
  const openDialog = useSelector(
    (state: RootState) => state.dialog.responseDialog
  ) as boolean;

  let recipe: Recipe | null = null;
  if (recipeResponse) {
    try {
      recipe = JSON.parse(recipeResponse) as Recipe;
    } catch (e) {
      console.error("Error parsing recipe JSON:", e);
    }
  }

  const handleClose = () => {
    dispatch(closeResponseDialog());
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="sm:max-w-[90%] md:max-w-[50%] overflow-y-scroll text-white response_modal">
        <DialogHeader>
          <DialogTitle className="font-extrabold text-2xl">
            {recipe ? recipe.name : "Recipe Details"}
          </DialogTitle>
          {recipe && (
            <DialogDescription>{recipe.description}</DialogDescription>
          )}
        </DialogHeader>

        {recipe ? (
          <div className="grid gap-4 py-4">
            <h2 className="font-semibold">Ingredients:</h2>
            <ul className="list-disc pl-5">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                  {ingredient.notes && <span> ({ingredient.notes})</span>}
                </li>
              ))}
            </ul>

            <h2 className="font-semibold">Instructions:</h2>
            <ol className="list-decimal pl-5">
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>
                  {instruction.step}
                  {instruction.notes && <span> ({instruction.notes})</span>}
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p>No recipe data available.</p>
        )}

        <h2 className="font-semibold text-white">
          Here are some Nearby stores:
        </h2>
        <iframe
          src="https://maps.google.com/maps?q=super%20market&output=embed"
          width={300}
          height={150}
          allowFullScreen
          className="w-full h-96"
        ></iframe>

        <h2 className="font-semibold text-white mt-4">
          Here&apos;s a movie to enjoy while chill and eat:
        </h2>
        {movie ? (
          <div className="flex flex-col gap-4 text-white">
            <div className="w-full flex justify-start gap-2 flex-col-reverse md:flex-row">
              <div className="w-full flex flex-col">
                <h1 className="font-bold text-green-500">{movie.name}</h1>
                <p className="w-full md:w-[80%] text-justify">{movie.desc}</p>
                <p>
                  Lang: <span className="text-green-500">{movie.lang}</span>
                </p>
              </div>
              <img
                src={movie.image}
                alt={movie.name}
                className="w-[80%] md:w-[200px] h-[300px] rounded-sm"
              />
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        <DialogFooter>
          <Button
            onClick={handleClose}
            className="w-[80%] bg-white text-black hover:bg-custom-bg hover:text-white mx-auto py-6"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;
