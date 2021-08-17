import styles from "./Breadcrumb.module.css";

const Breadcrumb = ({ category = {}, isItemDetail = false }) => {
  const wholePath = isItemDetail ? category.path_from_root : category.name;
  const allDetails = !isItemDetail
    ? wholePath
    : `${wholePath[0].name} / ${wholePath[1].name}`;
  return <div className={styles.breadcrumb}>{allDetails} </div>;
};
export default Breadcrumb;
