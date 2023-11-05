import axios from "axios";
import { useEffect, useState } from "react";
import Container from "../Components/Container";

const Home = () => {
    const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/category")
    .then(res=>{
        console.log(res.data);
        setCategories(res.data)

    })
    .then(error =>{
        console.log(error);
    })
    
  }, [])
    return (
        <div>
            <h3>this is Home</h3>
           
<Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {
        categories.map(category =>
         <div key={category._id} className="p-4 border rounded bg-primary bg-opacity-20 space-y-4 text-center">
            <img src={category.image} className="h-40 object-cover bg-zinc-300 rounded" />
            <h2 className="text-3xl font-bold text-accent">{category.category}</h2>
            <button className="py-2 rounded-full w-full btn-primary font-medium">View</button>
        </div>
        )
    }
</Container>
        </div>
    );
};

export default Home;