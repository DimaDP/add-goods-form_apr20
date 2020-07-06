import React from 'react';
import { goods as goodsFromServer } from './api/goods';
import { colors } from './api/colors';
import { GoodsList } from './components/GoodsList';
import { Select } from './components/Select';

const colorsOptions = colors.map(({ name, id }) => ({
  value: id,
  label: name,
}));

colorsOptions
  .unshift({
    value: 0,
    label: 'Select color...',
    disabled: true,
  });

export class App extends React.Component {
  state = {
    goods: goodsFromServer,
    colorId: 0,
    name: '',
  };

  handleChange = (value, name) => {
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { name, colorId } = this.state;

    this.setState((prevState) => {
      const lastId = prevState.goods.reduce((biggestId, good) => (
        good.id > biggestId ? good.id : biggestId
      ), -Infinity);

      const newGood = {
        id: lastId + 1,
        name,
        colorId,
      };

      return {
        goods: [
          ...prevState.goods,
          newGood,
        ],
        name: '',
        colorId: 0,
      };
    });
  };

  render() {
    const { goods, name, colorId } = this.state;

    return (
      <div className="page">
        <GoodsList goods={goods} colors={colors} />

        <form name="addGood" className="form" onSubmit={this.handleSubmit}>
          <label className="form__control">
            Name
            <input
              name="name"
              type="text"
              className="form__input"
              value={name}
              onChange={
                ({ target }) => this.handleChange(target.value, target.name)
              }
            />
          </label>

          <label className="form__control">
            Color
            <Select
              name="colorId"
              className="form__input"
              value={colorId}
              onChange={this.handleChange}
              options={colorsOptions}
            />
          </label>

          <button type="button">
            Submit
          </button>
        </form>
      </div>
    );
  }
}
