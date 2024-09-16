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
import { Recipe } from "../lib/types";

const RecipeModal = () => {
  const dispatch = useDispatch();

  // Retrieve the recipe response from the Redux store
  const recipeResponse = useSelector(
    (state: RootState) => state.response.geminiResponse
  ) as string | null;
console.log('data came from redux', recipeResponse)
  const openDialog = useSelector(
    (state: RootState) => state.dialog.responseDialog
  ) as boolean;
  // Parse recipeResponse if it is a JSON string and assign the type as Recipe
  let recipe: Recipe | null = null;
  if (recipeResponse) {
    try {
      recipe = JSON.parse(recipeResponse) as Recipe;
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  }
console.log('recipe from the modal', recipe)
  // Close dialog handler
  const handleClose = () => {
    dispatch(closeResponseDialog());
  };

  return (
    <Dialog open={openDialog}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{recipe ? recipe.name : "Recipe Details"}</DialogTitle>
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

        <DialogFooter>
          <Button onClick={handleClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeModal;
