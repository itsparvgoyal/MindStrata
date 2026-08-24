import { useEffect, useState } from "react";
import Info from "../components/Dashboard/Info.jsx";
import api from "../services/service.js";
import Loader from "../components/common/Loader.jsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const userData = useSelector((state) => state.rootReducer.auth.user);

  useEffect(() => {
    if (!user && !userData) fetchProfile();
    setLoading(false);
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get("/profile/getUserDetails");
      const user = response.data.user;
      const { firstName, lastName, email } = user;
      const { about, contactNumber, gender, dateOfBirth, image } = user.additionalDetails;
      setUser({
        firstName,
        lastName,
        email,
        image,
        about,
        contactNumber,
        gender,
        dateOfBirth
      })

    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (!user && userData) {
    const { firstName, lastName, email } = userData;
    const { about, contactNumber, gender, dateOfBirth, image } = userData.additionalDetails;
    setUser({
      firstName,
      lastName,
      email,
      image,
      about,
      contactNumber,
      gender,
      dateOfBirth
    })
  }


  if (loading) {
    return (
      <div className="text-white text-center mt-20">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-2xl  mx-auto px-0 sm:px-6 py-6 sm:py-10">

      <div
        className="
      bg-white/5
      backdrop-blur-lg
      border border-white/10
      rounded-3xl
      overflow-hidden
      shadow-2xl
    "
      >

        <div className="p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">

          <div className="flex items-center gap-4 sm:gap-5">

            <img
              src={user?.image}
              alt=""
              className="
            h-24
            w-24
            rounded-full
            object-cover
            ring-4
            ring-cyan-500/20
          "
            />

            <div>
              <h1 className="text-3xl font-bold text-white">
                {user?.firstName} {user?.lastName}
              </h1>

              <p className="text-slate-400 mt-1">
                {user?.email}
              </p>
            </div>

          </div>

          <Link
            className="
          px-5
          py-3
          rounded-xl
          bg-cyan-500
          hover:bg-cyan-400
          transition-all
          text-black
          font-semibold
        "
            to="/dashboard/settings"
          >
            Edit Profile
          </Link>

        </div>


        <div className="h-px bg-white/10" />


        <div className="p-5 sm:p-8">

          <h3 className="text-xl font-semibold text-white mb-3">
            About Me
          </h3>

          <p className="text-slate-300 leading-7 text-sm sm:text-base">
            {user?.about ||
              "No bio added yet"}
          </p>

        </div>

        <div className="h-px bg-white/10" />

        <div className="p-5 sm:p-8">

          <h3 className="text-xl font-semibold text-white mb-8">
            Personal Information
          </h3>

          <div className="grid md:grid-cols-2 gap-x-20 gap-y-8">

            <Info
              label="First Name"
              value={user?.firstName}
            />

            <Info
              label="Last Name"
              value={user?.lastName}
            />

            <Info
              label="Email"
              value={user?.email}
            />

            <Info
              label="Phone"
              value={
                user?.contactNumber ||
                "Not Added"
              }
            />

            <Info
              label="Gender"
              value={
                user?.gender ||
                "Not Added"
              }
            />

            <Info
              label="Date Of Birth"
              value={
                user?.dateOfBirth?.split("T")[0] ||
                "Not Added"
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;