import { Fragment } from "react";
import RowForm from "../../../components/RowForm";
import { Helmet } from "react-helmet";

const CategoryNew = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Magala-admin</title>
      </Helmet>
      <div className="container">
        <RowForm />
      </div>
    </Fragment>
  )
}

export default CategoryNew;
