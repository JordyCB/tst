import StarRatings from "react-star-ratings";

const StarRating = ({ rating }: { rating: number }) => (
    <StarRatings
      rating={rating}
      starRatedColor="#ffc107"
      numberOfStars={5}
      name="rating"
      starDimension="16px"
      starSpacing="1px"
    />
  );
export default StarRating;
