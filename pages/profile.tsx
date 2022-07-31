import { useAuth } from 'lib';
import type { NextPage } from 'next';

import Layout from 'components/Layout';

import style from 'styles/Profile.module.css';

const Profile: NextPage = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <div className={style.profile}>
        <div className={style.profile_card}>
          <div className={style.profile_heading}>Profile</div>
          <div className={style.profile_info}>
            <div className={style.profile_name}>
              <p className={style.profile_info_bold}>Full Name </p>{' '}
              <p>
                {user?.firstName} {user?.lastName}
              </p>
            </div>

            <div className={style.profile_email}>
              <p className={style.profile_info_bold}>Email </p>{' '}
              <p> {user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
