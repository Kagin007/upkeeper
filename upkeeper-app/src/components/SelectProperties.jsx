import classnames from "classnames";
const SelectProperties = props => {
  const { dark, properties } = props;
  const classes = classnames("primary-input", { "primary-select-dark": dark });
  return (
    <select name="property" className={classes}>
      {properties &&
        properties.map((property, i) => (
          <option value={property.id} key={i}>
            {property.address}
          </option>
        ))}
    </select>
  );
};
export default SelectProperties;
