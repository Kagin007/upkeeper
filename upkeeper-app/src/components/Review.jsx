import { Fragment } from "react";
import Star from "./Star";

const Review = props => {
  return (
    <Fragment>
      {" "}
      <h6 className="cleaner__card--review-user">
        {[...Array(props.rating)].map((e, i) => (
          <Star key={i} size="12px" />
        ))}
      </h6>
      <p className="cleaner__card--review-date">{props.date}</p>
      <p className="cleaner__card--review">{props.reviewMessage}</p>
    </Fragment>
  );
};

export default Review;
