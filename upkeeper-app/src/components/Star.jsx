const Star = props => {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rating: 5 out of 5 stars"
      className="cleaner__card--star"
      role="img"
      version="1.1"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m10.102 5.665 3.937.274c.603.042.85.797.388 1.188l-3.013 2.557.918 3.814a.674.674 0 0 1-1.01.732L8 12.167 4.678 14.23a.674.674 0 0 1-1.01-.732l.92-3.814-3.012-2.552a.675.675 0 0 1 .38-1.191l3.937-.276 1.484-3.582a.673.673 0 0 1 1.244 0l1.48 3.582Z"
        fill="#495371"
      ></path>
    </svg>
  );
};

export default Star;
