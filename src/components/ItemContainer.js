import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";

import Breadcrumb from "./Breadcrumb";
import freeshipping from "./../freeshipping.svg";

import styles from "./ItemContainer.module.css";

const ItemContainer = () => {
  const [response, setResponse] = useState([]);
  const [category, setCategory] = useState([]);

  const location = useLocation();

  const history = useHistory();

  const itemsData = location.search;

  useEffect(() => {
    const searchForItems = async (keyword) => {
      const apiResponse = await axios.get(
        `https://api.mercadolibre.com/sites/MLA/search?q=:query/items?${keyword}`,
        {
          author: {
            name: "Tomas",
            lastname: "Elgueta",
          },
        }
      );
      const {
        data: {
          available_filters: [categories],
        },
      } = apiResponse;
      const principalCategory = categories.values.reduce((prev, current) =>
        prev.results > current.results ? prev : current
      );
      const response = apiResponse.data.results.slice(0, 4);

      setCategory(principalCategory);
      setResponse(response);
    };
    searchForItems(itemsData);
  }, [itemsData]);

  return (
    <>
      {!!category && <Breadcrumb category={category} isItemDetail={false} />}

      <div className={styles.container}>
        {response.map(
          ({
            id,
            thumbnail,
            price,
            title,
            address: { state_name },
            shipping: { free_shipping },
          }) => (
            <div
              className={styles.itemContainer}
              onClick={() =>
                history.replace(`/ItemDetail/items/${id}`, {
                  itemId: id,
                  category: category,
                })
              }
            >
              <div className={styles.col}>
                <img src={thumbnail} alt="logo" className={styles.img} />
              </div>
              <div className={styles.col}>
                <div className={styles.priceContainer}>
                  <text className={styles.price}>$ {price}</text>
                  {free_shipping && (
                    <img
                      src={freeshipping}
                      alt="freeshipping"
                      className={styles.freeShipping}
                    />
                  )}
                </div>
                <div className={styles.titleDiv}>
                  <text className={styles.title}>{title}</text>
                </div>
              </div>
              <div className={styles.col}>
                <text className={styles.state}>{state_name}</text>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ItemContainer;
