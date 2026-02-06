import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { ChagneImage, GetSingleUser } from "../../features/UserFeatures";
import LoadingScreen from "../../components/LoadingScreen";
import { FaCamera } from "react-icons/fa";
import { AiOutlineCheck } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { BASE_URL } from "../../Api";
import type { AppDispatch } from "../../store";

const UserProfile = () => {
  const url = BASE_URL;
  const { id } = useParams();
  const { user, profile, isloading } = useSelector((state: any) => state.user);
  const [image, setImage] = useState<File | undefined>();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (!id) return;
    dispatch(GetSingleUser(id));
  }, [dispatch, id]);
  // handle upload image
  const handleImage = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };
    setImage(target.files[0]);
  };
  // handle submit
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!id) return;
    if (typeof image === "undefined") return;
    const formData = new FormData();
    formData.append("profile", image);
    dispatch(
      ChagneImage({
        id: user._id,
        formData,
      }),
    );
    setImage(undefined);
    dispatch(GetSingleUser(id));
  };
  return (
    <Fragment>
      <Helmet>
        <title>Magala-profile</title>
      </Helmet>
      {isloading === true ? (
        <LoadingScreen />
      ) : (
        profile && (
          <div className="container">
            <div className="img-container">
              <div className="image">
                <img
                  src={`${
                    image
                      ? URL.createObjectURL(image)
                      : profile.image
                        ? `${url}/${profile.image}`
                        : "/images/user-avatar.png"
                  }`}
                  alt="user avatar"
                />
                {user && user._id === profile._id && (
                  <form onSubmit={handleSubmit}>
                    {image ? (
                      <div className="buttons">
                        <button type="submit">
                          <AiOutlineCheck />
                        </button>
                        <button onClick={() => setImage(undefined)}>
                          <AiOutlineClose />
                        </button>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          id="img"
                          accept="*/images"
                          onChange={handleImage}
                        />
                        <label htmlFor="img">
                          <FaCamera className="icon" />
                        </label>
                      </>
                    )}
                  </form>
                )}
              </div>
              <h1 className="heading text-center">
                {profile.firstName} {profile.lastName}
              </h1>
            </div>
          </div>
        )
      )}
    </Fragment>
  );
};

export default UserProfile;
