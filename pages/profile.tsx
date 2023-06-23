import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { getUserProfile, supabase } from "../supabase";
import { createServerSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { GetServerSidePropsContext } from "next";
import useAuth from "@/hooks/useAuth";
type UserProfile = {
  [x: string]: string;
};
export default function Profile() {
  const [userprofile, setUserProfile] = useState<any>();
  const user = useAuth();
  useEffect(() => {
    async function getProfile() {
      if (user || user?.id) {
        const userDetails: any =
          await getUserProfile(user);
     if(userDetails)   setUserProfile(userDetails);
      }
    }
    getProfile();
  }, [user]);
console.log(user,'user')
console.log('profile',userprofile)
  return (
    <>
      <Main>
        <div className="wrapper">
          <div className="profile-summary">
            <div className="profile-summary-primary">
              <h2 className="profile-title">{user?.user_metadata.full_name}</h2>
              <p className="profile-detail">{user?.user_metadata.email}</p>
            </div>
            <div className="profile-summary-avatar">
              {user?.user_metadata.avatar_url ? (
                <img
                  src={user?.user_metadata.avatar_url}
                  referrerPolicy="no-referrer"
                  className="avatar-img"
                  alt={`Avatar of ${user?.user_metadata.full_name}`}
                />
              ) : (
                <span className="avatar-initials">
                  {user?.user_metadata.full_name[0]}
                </span>
              )}
            </div>
          </div>
          <div className="profile-details     profile-details--top">
            <p className="profile-details-summary">PERSONAL DETAILS</p>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>First Name</p>
              </div>
              <div className="profile-detail-value">
                <p>{user?.user_metadata.full_name.split(" ")[0]}</p>
              </div>
            </div>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Last Name</p>
              </div>
              <div className="profile-detail-value">
                <p>
                  {user?.user_metadata.full_name.split(" ")[1]
                    ? user.user_metadata.full_name.split(" ")[1]
                    : "Nil"}{" "}
                </p>
              </div>
            </div>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Email</p>
              </div>
              <div className="profile-detail-value">
                <p>{user?.user_metadata.email}</p>
              </div>
            </div>
          </div>
          <div className="profile-details">
            <p className="profile-details-summary">PAYMENTS </p>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Subscription</p>
              </div>
              <div className="profile-detail-value">
                {userprofile ? userprofile[0]?.plan_name : "No Active Plan"}
              </div>
            </div>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Status</p>
              </div>
              <div className="profile-detail-value">
                {userprofile && userprofile[0]?.status === "active"
                  ? userprofile[0]?.status
                  : "Inactive"}
              </div>
            </div>

            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Payment Date</p>
              </div>
              <div className="profile-detail-value">
                {userprofile && userprofile[0]?.status === "active"
                  ? userprofile[0].created_date_at
                  : "Nil"}
              </div>
            </div>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Next Payment Date</p>
              </div>
              <div className="profile-detail-value">
                {userprofile && userprofile[0]?.status === "active"
                  ? userprofile[0].next_payment_date
                  : "Nil"}
              </div>
            </div>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Currency</p>
              </div>
              <div className="profile-detail-value">
                {userprofile ? userprofile[0]?.currency : "Nil"}
              </div>
            </div>
            <div className="profile-details-row">
              <div className="profile-detail">
                <p>Gmail Content</p>
              </div>
              <pre className="profile-detail-value">
                {userprofile ? userprofile[0]?.gmailContent : "Nil"}
              </pre>
            </div>
          </div>

          {/* <div className='profile-delete'>
						<button className='btn btn-delete' onClick={handleDelete}>
							Delete Account
						</button>
					</div> */}
        </div>
      </Main>
    </>
  );
}

const Main = styled.main`
  margin: 0;
  width: 100%;
  padding: 1em;
  background-color: #eee;
  /* padding: 1.8em; */
  .wrapper {
    max-width: 500px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  .avatar-initials {
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
    border: 4px solid #fff;
  }
  .profile-summary {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: 1/3;
  }
  .profile-title {
    font-size: 24px;
    letter-spacing: 0.1em;
    margin-bottom: 0.3em;
  }
  .pill {
    padding: 0.5em;
    background-color: var(--primary-color);
    color: white;
    font-size: 8px;
    border-radius: 25px;
  }
  .profile-details {
    margin-top: 2.2em;
    grid-column: 1/3;
  }
  .profile-summary-avatar {
    width: 50px;
    height: 50px;
    background-color: rgb(36, 75, 246);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .profile-details-row {
    display: flex;
    padding: 1.5em;
    background-color: white;
    border-bottom: 1px solid rgb(226 226 226);
  }
  .profile-details-row:first-of-type {
    border-radius: 0.5em 0.5em 0 0;
  }
  .profile-details-row:last-of-type {
    border-radius: 0 0 0.5em 0.5em;
  }
  .profile-details-row:only-of-type {
    border-radius: 0.5em 0.5em 0.5em 0.5em;
  }
  .profile-detail-value {
    margin-left: auto;
    font-weight: 500;
  }

  .profile-details-summary {
    font-size: 20px;
    letter-spacing: 2px;
    margin-bottom: 1em;
    color: #888;
    font-weight: 500;
  }
  /* *{
    border:1px solid red;
} */
  .profile-detail {
    color: #888;
  }
  .profile-delete {
    grid-column: 1/3;
    margin-top: 1.5em;
  }
  .btn {
    width: 100%;
  }
  .btn-delete {
    font-weight: 500;
    color: rgb(243, 94, 94);
    padding: 16px;
    border-radius: 0.5em 0.5em 0 0;
    border: none;
    font-size: 16px;
    cursor: pointer;
  }
  @media (min-width: 768px) {
    .profile-summary {
      grid-column: 1/3;
      flex-direction: column;
      justify-content: flex-start;
    }
    .profile-details {
      grid-column: 1/3;
    }
    .profile-summary-avatar {
      order: 0;
      width: 150px;
      height: 150px;
    }
    .profile-summary-primary {
      order: 1;
      margin-top: 1em;
      text-align: center;
    }
    .profile-title {
      font-size: 36px;
      margin: 0;
    }
    .profile-detail,
    .profile-detail-value {
      font-size: 18px;
    }
    .profile-delete {
      grid-column: 1/3;
    }
    .avatar-initials {
      font-size: 36px;
    }
  }
`;

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
    // Create authenticated Supabase Client
    const supabase = createServerSupabaseClient(ctx);
    // Check if we have a session
    const {
      data: { session },
    } = await supabase.auth.getSession();
  
    if (!session)
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
  
    return {
      props: { session },
    };
  };
