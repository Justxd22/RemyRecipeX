import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { closeResponseDialog } from "../state/dialogSlice";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Recipe } from "../lib/types";

const RecipeModal = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = React.useState(true);

  // Retrieve the recipe response from the Redux store
  const recipeResponse = useSelector(
    (state: RootState) => state.response.geminiResponse
  ) as string | null;

  // Parse recipeResponse if it is a JSON string and assign the type as Recipe
  let recipe: Recipe | null = null;
  if (recipeResponse) {
    try {
      recipe = JSON.parse(recipeResponse) as Recipe;
    } catch (e) {
      console.error("Error parsing JSON:", e);
    }
  }

  // Close dialog handler
  const handleClose = () => {
    setOpen(false);
    dispatch(closeResponseDialog());
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        className="bg-[rgb(176 127 90 / 80%)] md:rounded-md text-white"
      >
        <DialogTitle id="responsive-dialog-title" className="font-bold">
          {recipe ? recipe.name : "Recipe Details"}
        </DialogTitle>
        <DialogContent>
          {recipe ? (
            <React.Fragment>
              <DialogContentText>{recipe.description}</DialogContentText>
              <h2 className="font-semibold">Ingredients:</h2>
              <ul>
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index}>
                    {ingredient.quantity} {ingredient.unit} {ingredient.name}
                    {ingredient.notes && <span> ({ingredient.notes})</span>}
                  </li>
                ))}
              </ul>
              <h2 className="font-semibold">Instructions:</h2>
              <ol>
                {recipe.instructions.map((instruction, index) => (
                  <li key={index}>
                    {instruction.step}
                    {instruction.notes && <span> ({instruction.notes})</span>}
                  </li>
                ))}
              </ol>
            </React.Fragment>
          ) : (
            <DialogContentText>No recipe data available.</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default RecipeModal;
