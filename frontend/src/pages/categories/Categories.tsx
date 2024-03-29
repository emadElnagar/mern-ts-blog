import { Fragment } from "react";
import RowForm from "../../components/RowForm";
import { Helmet } from "react-helmet";

const Categories = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Magala-new-category</title>
      </Helmet>
      <div className="container">
        <RowForm />
      </div>
    </Fragment>
  )
}

export default Categories;
