import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../../component/card/Card';
import { SpinnerImg } from '../../component/loader/Loader';
import useRedirectLoggedOutUser from '../../customHook/useRedirectLoggedOutUser';
import { SET_NAME, SET_USER } from '../../redux/features/auth/authSlice';
import { getUser } from '../../services/authService';
import './Profile.scss';

const Profile = () => {
  useRedirectLoggedOutUser('/login');

  const dispatch = useDispatch();

  const [profile, setProfile] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getUserData() {
      const data = await getUser();
      console.log(data);

      setProfile(data);
      setIsLoading(false);

      await dispatch(SET_USER(data));
      await dispatch(SET_NAME(data.name));
    }

    getUserData();
  }, [dispatch]);
  return (
    <div className="profile --my2">
      {IsLoading && <SpinnerImg />}
      <>
        {!IsLoading && profile === null ? (
          <p>Something went wrong. Please reload page</p>
        ) : (
          <Card cardClass={'card --flex-dir-column'}>
            <span className="profile-photo">
              <img src={profile?.photo} alt="profilepic" />
            </span>
            <span className="profile-data">
              <p>
                <b>Name: </b> {profile?.name}
              </p>
              <p>
                <b>Email: </b> {profile?.email}
              </p>
              <p>
                <b>Phone: </b> {profile?.phone}
              </p>
              <p>
                <b>Bio: </b> {profile?.bio}
              </p>
              <div>
                <Link to="/edit-profile">
                  <button className="--btn --btn-primary">Edit Profile</button>
                </Link>
              </div>
            </span>
          </Card>
        )}
      </>
    </div>
  );
};

export default Profile;
