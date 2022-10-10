import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import "./ComponentsBox.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faPlus,
  faEraser,
} from "@fortawesome/free-solid-svg-icons";

const ComponentsBox = (props) => {
  const { setComponents } = props;

  // HINT: each "item" in our list names a name,
  // a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    // { itemName: "Multimetro", quantity: 1, isSelected: false },
    // { itemName: "Lagartos", quantity: 24, isSelected: false },
    // { itemName: "Arduino", quantity: 1, isSelected: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(6);

  useEffect(() => {
    const calculateTotal = () => {
      const totalItemCount = items.reduce((total, item) => {
        return total + parseInt(item.quantity);
      }, 0);
      setTotalItemCount(totalItemCount);
    };
    calculateTotal();
    setComponents(items);
  }, [items, setComponents]);

  const handleAddButtonClick = () => {
    if (inputValue.trim() === "") {
      setInputValue("");
      setQuantity("");
      return;
    }

    const newItems = [...items];
    const filteredArray = newItems.filter((e) => e.itemName === inputValue);
    if (filteredArray.length !== 0 && newItems.length !== 0) return;

    const newItem = {
      itemName: inputValue,
      quantity: quantity === "" ? 1 : quantity,
      isSelected: false,
    };
    setItems([...items, newItem]);
    setInputValue("");
    setQuantity("");
  };

  const handleQuantityIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
  };

  const handleQuantityDecrease = (index) => {
    const newItems = [...items];
    let value = newItems[index].quantity;
    value === 1 ? (newItems[index].quantity = 1) : newItems[index].quantity--;
    setItems(newItems);
  };

  const handleEraseItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  return (
    <Container>
      <Grid item xs={12} md={12}>
        <h4>Ingrese los componentes que desea solicitar</h4>
      </Grid>
      <Grid>
        <div className="box-background">
          <div className="main-container">
            <div className="add-item-box col-sm-12">
              <input
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
                onKeyPress={(event) =>
                  event.key === "Enter" && handleAddButtonClick()
                }
                className="add-item-input"
                placeholder="Agregue un componente..."
              />
              <input
                type="number"
                min="1"
                // showSpinButton={false}
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                onKeyPress={(event) =>
                  event.key === "Enter" && handleAddButtonClick()
                }
                className="add-item-quantity"
                placeholder={"Cantidad: 1"}
              />
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faPlus}
                onClick={() => handleAddButtonClick()}
              />
            </div>

            <div className="item-list">
              {items.map((item, index) => (
                <div className="item-container">
                  <div
                    className="item-name"
                    onClick={() => handleEraseItem(index)}
                  >
                    <>
                      <FontAwesomeIcon icon={faEraser} />
                      <span> {item.itemName}</span>
                    </>
                  </div>
                  <div className="quantity">
                    <button>
                      <FontAwesomeIcon
                        icon={faChevronLeft}
                        onClick={() => handleQuantityDecrease(index)}
                      />
                    </button>
                    {/* <input
                  align="center"
                  size="2"
                  className="quantity-input"
                  value={quantity}
                  onChange={(event) =>
                    handleInputQuantity(event.target.value, index)
                  }
                /> */}
                    <span> {item.quantity} </span>
                    <button>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        onClick={() => handleQuantityIncrease(index)}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="total">Total: {totalItemCount}</div>
          </div>
        </div>
      </Grid>
    </Container>
  );
};

export default ComponentsBox;
