import React, { useEffect, useState } from "react";
import loadingImg from "../../assets/Images/Bean Eater-1s-109px.gif";
import Card from "../UI/Card";
import classes from "./MealsLIst.module.css";
import MealItem from "./meal-item/MealItem";

const MealsList = () => {
  const [mealsData, setMealsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState();

  useEffect(() => {
    // fetching meals from database
    const fetchMeals = async () => {
      const response = await fetch(
        "https://food-project-54437-default-rtdb.firebaseio.com/meals.json",
        {}
      );

      const responseData = await response.json();

      const fetchedMeals = [];

      for (const key in responseData) {
        fetchedMeals.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }

      setMealsData(fetchedMeals);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    };

    fetchMeals().catch(() => {
      setIsLoading(false);
      setHasError("Something went wrong!");
    });
  }, []);

  const availableMeals = mealsData.map((meal) => {
    return (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    );
  });

  let content;

  if (isLoading && !hasError) {
    content = (
      <div style={{ textAlign: "center" }}>
        <img src={loadingImg} alt="loading snap" />
      </div>
    );
  }

  if (!isLoading && hasError) {
    content = (
      <p style={{ color: "red", fontWeight: "bold", textAlign: "center" }}>
        {hasError}
      </p>
    );
  }

  if (!isLoading && !hasError) {
    content = <ul>{availableMeals}</ul>;
  }

  return (
    <section className={classes["meals"]}>
      <Card>{content}</Card>
    </section>
  );
};

export default MealsList;
