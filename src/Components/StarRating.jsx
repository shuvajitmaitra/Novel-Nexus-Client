import {BsStar, BsStarFill, BsStarHalf} from "react-icons/bs"
import PropsTypes from "prop-types"
const StarRating = ({rating}) => {
    const ratingFunc = Array.from({length: 5}, (val, index)=>{
        let number = index+0.5;
        return <span key={index}>
            {
                rating>= index + 1 ? < BsStarFill className="text-orange-400"/> :
                rating >= number ? <BsStarHalf className="text-orange-400"/>:
                <BsStar className="text-orange-400"></BsStar>

            }
        </span>
    })

    return (
        <span className="flex">
            {ratingFunc}
        </span>
    );
};

StarRating.propTypes = {
    rating: PropsTypes.number.isRequired
}

export default StarRating;