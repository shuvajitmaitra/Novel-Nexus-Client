import { FcLibrary } from "react-icons/fc";
import { AiOutlineHome, AiOutlineShoppingCart} from "react-icons/ai"
import Container from "../Components/Container";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="  bg-neutral text-neutral-content">
            <Container className='footer p-10' >
  <aside>
  <div className=" px-2 mx-2 flex items-center gap-2 text-lg md:text-2xl font-medium text-primary text-opacity-50">
              <FcLibrary className=" text-xl lg:text-3xl" />
              Novel Nexus
            </div>
            <p>This is a library management website.</p>
  </aside> 
  <nav>
    <header className="footer-title">Go To</header> 
    <div className="grid grid-flow-col gap-4 text-3xl">
      <Link to="/"><AiOutlineHome  /></Link>
      <Link to="/borrowed-book"><AiOutlineShoppingCart/></Link>
      
    </div>
  </nav>
</Container>
        </footer>
    );
};

export default Footer;