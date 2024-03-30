import { Fragment, useEffect } from "react"
import { Helmet } from "react-helmet"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { GetSingleUser } from "../../features/UserFeatures";
import LoadingScreen from "../../components/LoadingScreen";

const UserProfile = () => {
  const { id } = useParams();
  const { user, profile, isloading } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetSingleUser(id));
  }, [dispatch, id]);
  return (
    <Fragment>
      <Helmet>
        <title>Magala-profile</title>
      </Helmet>
      {
        isloading === true ? <LoadingScreen /> :
        <div className="container">
          <div className="img-container">
            <div className="image">
              <img
                src={`${profile.image ? `${profile.image}` : `${process.env.PUBLIC_URL + '/images/user-avatar.png'}`}`} 
                alt="user avatar"
              />
            </div>
            <h1 className="heading text-center">{profile.firstName} {profile.lastName}</h1>
          </div>
        </div>
      }
      
    </Fragment>
  )
}

export default UserProfile;
