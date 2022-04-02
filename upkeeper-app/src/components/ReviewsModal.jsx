import { Fragment } from "react";
import CleanersList from "./CleanersList";
import Review from "./Review";

const ReviewsModal = props => {
  const sampleDataReviews = [
    {
      id: 1,
      date: "Jan 23, 2022",
      reviewerName: "James Dean",
      rating: 5,
      reviewMessage: `David is spectacular and very efficient at her job. We always use his
    service to clean our apartment when we don't have time to do it
    ourselves. He responds quickly and is always on time!`,
    },
    ,
    {
      id: 2,
      date: "Feb 2, 2022",
      reviewerName: "Margot Lin",
      rating: 5,
      reviewMessage: `David is on time! Highly communicative and willing to come to our aid on last minute notice. We highly recommend him for cleaning your property.`,
    },
    {
      id: 3,
      date: "June 22, 2021",
      reviewerName: "Jerry Macguire",
      rating: 4,
      reviewMessage: `Great job! David comes cleans our apartment every week and we will continue to use his services.`,
    },
    {
      id: 4,
      date: "April 1, 2021",
      reviewerName: "Karen",
      rating: 1,
      reviewMessage: `Very unprofessional! We don't usually come by when the place when the cleaners are around, but I forgot something at the house and needed to quickly pick it up. David was in the nude, drinking beers while he was cleaning. I don't even want to know what he has touched or where he sat. Will definitely never use again.`,
    },
  ];
  return (
    <section className="modal">
      <header class="modal-header">
        <div onClick={props.onClose} className="modal-exit">
          <i class="fa-solid fa-xmark"></i>
        </div>
        <h3>
          <strong>Reviews</strong>
        </h3>
      </header>
      <main class="modal-content">
        {sampleDataReviews.map(review => (
          <Review key={review.id} {...review} />
        ))}
      </main>
    </section>
  );
};

export default ReviewsModal;
