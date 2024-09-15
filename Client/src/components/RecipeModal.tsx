import { FaTimes } from "react-icons/fa";
import "../assets/stylesheets/Recipe.css"; // Ensure you still use the same styles
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { closeResponseDialog } from "../state/dialogSlice";
import { Recipe } from "../lib/types";

const RecipeModal = () => {
  const dispatch = useDispatch();
  
  // Assuming recipeResponse is a JSON string
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

  // Log recipe data for debugging
  console.log("gemini response from the modal", recipe);

  // Return null if no recipe data is available
  if (!recipe) return null;

  return (
    <div className="recipe-modal-overlay">
      <div className="recipe-modal-content">
        <button
          type="button"
          className="close-recipe-modal"
          onClick={() => dispatch(closeResponseDialog())}
        >
          <FaTimes className="icon" />
        </button>
        <h1>{recipe.name}</h1>
        <p>{recipe.description}</p>
        <h2>Ingredients:</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>
              {ingredient.quantity} {ingredient.unit} {ingredient.name}
              {ingredient.notes && <span> ({ingredient.notes})</span>}
            </li>
          ))}
        </ul>
        <h2>Instructions:</h2>
        <ol>
          {recipe.instructions.map((instruction, index) => (
            <li key={index}>
              {instruction.step}
              {instruction.notes && <span> ({instruction.notes})</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeModal;
