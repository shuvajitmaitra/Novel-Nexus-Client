import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../Components/Container";
import SliderBanner from "../Components/SliderBanner";
import { Link } from "react-router-dom";

const Home = () => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/category")
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
      })
      .then((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="space-y-20 pt-12">
{/* ------------------------------------------------ */}
{/* Banner slider */}
{/* ------------------------------------------------ */}
      <Container>
        <SliderBanner></SliderBanner>
      </Container>
{/* ------------------------------------------------ */}
{/* book category */}
{/* ------------------------------------------------ */}
      <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div
            key={category._id}
            className="flex flex-col bg-gradient-to-r  from-blue-200 to-blue-300 text-gray-800 p-8 rounded shadow-lg hover:shadow-md transform hover:scale-105 transition-transform space-y-5"
          >
            <img
              src={category.image}
              className="h-40 object-cover bg-zinc-300 rounded"
            />
            <h2 className="text-3xl font-bold text-center text-accent">
              {category.category}
            </h2>
           <Link to={`categorized-book/${category.category}`}> <button className="py-2 rounded-full w-full bg-primary font-medium hover:bg-blue-600 text-white focus:outline-none transition-transform hover:scale-105">
              View
            </button></Link>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Home;
