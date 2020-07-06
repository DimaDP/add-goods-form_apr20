import React from 'react';
import PropTypes from 'prop-types';

export const Select = (props) => {
  const {
    value,
    onChange,
    name,
    options,
    className,
  } = props;

  const handleChange = (event) => {
    const option = options
      .find(currentOption => currentOption.value === +event.target.value);

    onChange(option.value, name);
  };

  return (
    <select
      name={name}
      value={value}
      onChange={handleChange}
      className={className}
    >
      {options.map(option => (
        <option
          key={option.value}
          value={option.value}
          disabled={!!option.disabled}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]).isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
      ]),
      label: PropTypes.string,
      disabled: PropTypes.bool,
    }),
  ).isRequired,
  className: PropTypes.string,
};

Select.defaultProps = {
  className: '',
};
