const Button = props => {
  return (
    <button onClick={props.onClick} className="primary-btn">
      {props.children}
    </button>
  );
};
export default Button;
