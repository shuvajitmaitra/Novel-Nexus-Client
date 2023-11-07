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
        setCategories(res.data);
      })
      .then((error) => {
        {
          error && console.log(error);
        }
      });
  }, []);
  return (
    <div className="space-y-20 py-12 ">
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
            className=" flex-col text-gray-800 p-8 rounded shadow-lg hover:shadow-md transform hover:scale-105 transition-transform space-y-5

            flex
                  hover:from-transparent hover:to-transparent  hover:border-2 hover:text-accent-content hover:border-accent-content  font-medium bg-gradient-to-r hover:bg-transparent from-blue-300 to-purple-400 rounded-tr-2xl rounded-bl-2xl
            "
          >
            <img
              src={category.image}
              className="h-40 object-cover bg-zinc-300 rounded"
            />
            <h2 className="text-3xl font-bold text-center text-error">
              {category.category}
            </h2>

            <Link to={`categorized-book/${category.category}`}>
              {" "}
              <button
                className=" btn w-full font-bold hover:from-transparent hover:to-transparent  hover:border-2 hover:text-accent-content hover:border-accent-content bg-gradient-to-r hover:bg-transparent to-blue-300 from-purple-400 rounded-tr-lg rounded-bl-lg transition-transform hover:scale-105"
              >
                View Category
              </button>
            </Link>
          </div>
        ))}
      </Container>
    </div>
  );
};

export default Home;
