import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function ListGroup() {

    const etkezesNapszaka = [
        "reggeli",
        "ebed",
        "vacsora"
    ];

    const [foodName, setFoodName] = useState("");
    const [ingredients, setIngredients] = useState([""]);
    const [mealType, setMealType] = useState("");

    const handleSubmit = async () => {
    if (!foodName || ingredients.some(ing => ing.trim() === "") || !mealType) {
      alert("Kérlek, tölts ki minden mezőt!");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, "meals"), {
        Name: foodName,
        Ingredients: ingredients.filter(ing => ing.trim() !== ""),
        type: mealType,
      });
      alert("Sikeres mentés! Dokumentum ID: " + docRef.id);
      setFoodName("");
      setIngredients([""]);
      setMealType("");
    } catch (e) {
      console.error("Hiba a mentéskor:", e);
      alert("Hiba történt a mentés során.");
    }
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = ingredients.filter((_, i) => i !== index);
      setIngredients(newIngredients);
    }
  };

  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  };


  return (
    <>
    <label htmlFor="foodName">Étel neve: </label>
    <input type="text" id="foodName" name="foodName" onChange={(e) => setFoodName(e.target.value)}></input><br></br>

    <label htmlFor="ingredients">Hozzávalók: </label>
    {ingredients.map((ingredient, index) => (
      <div key={index} style={{marginBottom: '10px'}}>
        <input 
          type="text" 
          value={ingredient}
          placeholder={`Hozzávaló ${index + 1}`}
          onChange={(e) => updateIngredient(index, e.target.value)}
          style={{marginRight: '10px'}}
        />
        <button 
          type="button" 
          onClick={() => removeIngredient(index)}
          style={{marginRight: '5px'}}
        >
          -
        </button>
        {index === ingredients.length - 1 && (
          <button type="button" onClick={addIngredient}>
            +
          </button>
        )}
      </div>
    ))}
    
    <label htmlFor="mealType">Étkezés típusa: </label>
    <select id="mealType" onChange={(e) => setMealType(e.target.value)}>
    <option value="">-- Válassz napszakot! --</option>
      {etkezesNapszaka.map((item) => (
        <option key={item}>{item}</option>
      ))}
    </select><br></br>


    <button type="button" onClick={handleSubmit}>Mentés az adatbázisba</button>
    
    </>);
}

export default ListGroup;
