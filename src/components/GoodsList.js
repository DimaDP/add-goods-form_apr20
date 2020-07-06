import React from 'react';
import PropTypes from 'prop-types';

export const GoodsList = ({ goods, colors }) => {
  const getColorById = colorId => colors.find(color => color.id === colorId);

  const goodsWithColors = goods.map(good => ({
    ...good,
    color: getColorById(good.colorId),
  }));

  return (
    <ol className="goods">
      {goodsWithColors.map(good => (
        <li
          key={good.id}
          style={{ color: good.color.name }}
        >
          {good.name}
        </li>
      ))}
    </ol>
  );
};

GoodsList.propTypes = {
  goods: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      color: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.number.isRequired,
      }).isRequired,
    }),
  ),
  colors: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
};

GoodsList.defaultProps = {
  goods: [],
  colors: [],
};
