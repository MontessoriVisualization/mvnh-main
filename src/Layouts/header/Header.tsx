import { Link } from "react-router-dom";
import Button from "../../Component/button";
import { auth } from "../../Component/firebase"; // Adjust the import path as needed
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut, deleteUser } from "firebase/auth";
import MainLogo from "./logo.png";
import DropDown from "./nav/dropdown";
import { useState } from "react";
import { ArrowDownToLine, LogOut, Trash2, User } from "lucide-react";

export default function Header() {
  const [user] = useAuthState(auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleDeleteAccount = async () => {
    if (user) {
      try {
        await deleteUser(user);
        console.log("User account deleted successfully");
      } catch (error) {
        console.error("Error deleting user account: ", error);
      }
    }
  };

  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };
  const style = "w-full h-9 text-md items-center border-0 justify-between";
  return (
    <>
      <header className="flex justify-between items-center h-24 px-5 my-0 select-none">
        <div className="flex items-center">
          <DropDown />
          <img className="h-10 flex-shrink-0" src={MainLogo} alt="Vite logo" />
        </div>
        {user ? (
          <div className="relative">
            <img
              className="h-10 w-10 rounded-full cursor-pointer"
              src={
                user.photoURL ||
                "https://cdn.noitatnemucod.net/avatar/100x100/mha/avatar-20.png"
              }
              alt="User profile"
              onClick={toggleProfileMenu}
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-20">
                <div className="px-4 py-2 text-gray-800">
                  <p className="font-bold text-lg text-orange-500">
                    {user.displayName || "User"}
                  </p>
                  <p className="text-sm ">{user.email}</p>
                </div>
                <Link to="/user/profile">
                  <Button variant={"defult"} className={style}>
                    {" "}
                    Profile <User />
                  </Button>
                </Link>
                <Link to="/downloads">
                  <Button variant={"defult"} className={style}>
                    {" "}
                    Downloads <ArrowDownToLine />
                  </Button>
                </Link>
                <Button
                  variant={"defult"}
                  className={style + " text-red-600 hover:bg-red-500"}
                  onClick={handleDeleteAccount}
                >
                  Delete Account
                  <Trash2 />
                </Button>
                <Button
                  variant={"defult"}
                  onClick={handleLogout}
                  className={style}
                >
                  Logout <LogOut />
                </Button>{" "}
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <Button variant={"defult"}>Login</Button>
          </Link>
        )}
      </header>
    </>
  );
}
