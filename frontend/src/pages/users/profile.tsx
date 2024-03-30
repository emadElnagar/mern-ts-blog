import { Fragment } from "react"
import { Helmet } from "react-helmet"

const UserProfile = () => {
  return (
    <Fragment>
      <Helmet>
        <title>Magala-login</title>
      </Helmet>
      <div className="container">
        <h1>user profile</h1>
      </div>
    </Fragment>
  )
}

export default UserProfile;
