import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

import Breadcrumb from "./Breadcrumb";

import styles from "./ItemDetail.module.css";

const ItemDetail = () => {
  const [itemDetail, setItemDetail] = useState({});
  const [categoryDetail, setCategoryDetail] = useState();

  const location = useLocation();
  const {
    state: {
      itemId,
      category: { id: categoryId },
    },
  } = location;
  const searchForItem = async (id) => {
    const apiResponse = await axios.get(
      `https://api.mercadolibre.com/items/${id}`,
      {
        author: {
          name: "Tomas",
          lastname: "Elgueta",
        },
      }
    );
    setItemDetail(apiResponse.data);
  };
  const searchForCategory = async (id) => {
    const apiResponse = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?category=${id}`,
      {
        author: {
          name: "Tomas",
          lastname: "Elgueta",
        },
      }
    );

    const {
      data: {
        filters: [categories],
      },
    } = apiResponse;

    setCategoryDetail(categories.values[0]);
  };

  const { thumbnail, title, price, sold_quantity } = itemDetail;
  useEffect(() => {
    (async () => {
      await searchForItem(itemId);
      await searchForCategory(categoryId);
    })();
  }, [itemId, categoryId]);
  return (
    <>
      {!!categoryDetail && (
        <Breadcrumb category={categoryDetail} isItemDetail={true} />
      )}
      <div className={styles.container}>
        <div className={styles.itemContainer}>
          <div className={styles.col}>
            <img src={thumbnail} alt="logo" className={styles.img} />
            <div className={styles.description}>
              <text className={styles.descriptionTitle}>
                Descripción del Producto
              </text>
              <p className={styles.title}>
                Fusce tempor a ex id venenatis. Integer tincidunt quis tellus
                non efficitur. Aliquam vestibulum luctus velit quis malesuada.
                Nulla pulvinar metus vulputate, blandit ligula eu, porta felis.
                Nulla est nisi, luctus id eros quis, venenatis mattis risus.
              </p>
            </div>
          </div>
          <div className={styles.col2}>
            <text className={styles.condition}>
              Nuevo
              {" * "}
              {sold_quantity} vendidos
            </text>
            <text className={styles.state}>{title}</text>
            <text className={styles.price}>$ {price}</text>
            <button type="submit" className={styles.searchButton}>
              Comprar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemDetail;
