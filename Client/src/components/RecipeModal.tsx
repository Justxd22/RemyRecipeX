import { FC } from 'react';
import { FaTimes } from 'react-icons/fa';
import '../assets/stylesheets/Recipe.css'; // Ensure you still use the same styles

interface Ingredient {
  name?: string;
  quantity?: string;
  unit?: string;
  notes?: string;
}

interface Instruction {
  step?: string;
  notes?: string;
}

export interface Recipe {
  name?: string;
  description?: string;
  ingredients: Ingredient[];
  instructions: Instruction[];
}

interface RecipeModalProps {
  recipe: Recipe | null; // Recipe data
  onClose: () => void; // Close function
}

const RecipeModal: FC<RecipeModalProps> = ({ recipe, onClose }) => {
  if (!recipe) return null; // Return null if no recipe data

  return (
    <div className="recipe-modal-overlay">
      <div className="recipe-modal-content">
        <button type="button" className="close-recipe-modal" onClick={onClose}>
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