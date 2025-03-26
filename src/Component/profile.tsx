import React, { useState, useEffect } from "react";
import Button from "./button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { auth } from "./firebase";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
const profilePictures = [
  "https://th.bing.com/th?id=OIF.OAkCWEVqGCKctDtW%2bi9eyw&w=100&h=100&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://th.bing.com/th?id=OIF.%2bDHAuMf1eSumEEqThfl%2bMA&w=99&h=100&c=7&r=0&o=5&dpr=2&pid=1.7",
  "https://cdn.noitatnemucod.net/avatar/100x100/demon_splayer/File19.jpg",
  "https://cdn.noitatnemucod.net/avatar/100x100/spy_family/03.png",
  "https://cdn.noitatnemucod.net/avatar/100x100/jujutsu_kaisen/File10.png",
];

const ProfileEdit: React.FC = () => {
  const navigate = useNavigate();
  const [user, loading, authError] = useAuthState(auth);
  const [name, setName] = useState("");
  const [joined, setJoined] = useState("");
  const [editingAvatar, setEditingAvatar] = useState(false);
  const [selectedPicture, setSelectedPicture] = useState("/avatar.png");

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setJoined(user.metadata.creationTime || "");
      setSelectedPicture(user.photoURL || profilePictures[0]);
    }
  }, [user]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = async () => {
    if (user) {
      try {
        await updateProfile(user, {
          displayName: name,
          photoURL: selectedPicture,
        });
        navigate("/");

        setEditingAvatar(false);
      } catch (error) {
        console.error("Failed to update profile", error);
      }
    }
  };

  const handleResetPassword = async () => {
    if (user && user.email) {
      try {
        await sendPasswordResetEmail(auth, user.email);
        alert("Password reset email sent. Please check your inbox.");
      } catch (error) {
        console.error("Failed to send password reset email", error);
      }
    } else {
      alert("No email found for the account.");
    }
  };

  const handlePictureChange = (direction: "left" | "right") => {
    const currentIndex = profilePictures.indexOf(selectedPicture);
    const newIndex =
      direction === "left"
        ? (currentIndex - 1 + profilePictures.length) % profilePictures.length
        : (currentIndex + 1) % profilePictures.length;
    setSelectedPicture(profilePictures[newIndex]);
  };

  if (loading) return <p>Loading...</p>;
  if (authError) return <p>Error: {authError.message}</p>;

  return (
    <div className="min-h-screen flex flex-col items-center z-1 bg-white text-gray-900 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Edit Profile</h1>
      <Card className="w-full max-w-md shadow-lg rounded-lg border border-gray-200">
        <CardContent className="p-6 flex flex-col gap-4">
          <div className="relative flex justify-center">
            <Avatar className="w-20 h-20">
              <AvatarImage src={selectedPicture} alt="Profile" />
              <AvatarFallback>
                {user?.displayName ? user.displayName.charAt(0) : "U"}
              </AvatarFallback>
            </Avatar>
            {editingAvatar ? (
              <div className="absolute inset-0 flex items-center justify-center gap-24 px-2">
                <button
                  className="text-2xl font-medium bg-gray-400/70 rounded-full p-1"
                  onClick={() => handlePictureChange("left")}
                >
                  {"<"}
                </button>
                <button
                  className="text-2xl font-medium bg-gray-400/70 rounded-full p-1"
                  onClick={() => handlePictureChange("right")}
                >
                  {">"}
                </button>
              </div>
            ) : (
              <button
                className="absolute bottom-0 right-2 p-1 bg-orange-500 rounded-full shadow-md"
                onClick={() => setEditingAvatar(true)}
              >
                <Pencil size={16} className="text-white" />
              </button>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium">Email Address</label>
            <Input
              type="email"
              value={user?.email || ""}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Your Name</label>
            <Input type="text" value={name} onChange={handleNameChange} />
          </div>
          <div>
            <label className="block text-sm font-medium">Joined</label>
            <Input
              type="text"
              value={joined}
              disabled
              className="bg-gray-100"
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              onClick={handleResetPassword}
              className="text-sm text-orange-500 underline"
            >
              Change password
            </button>
          </div>
          <Button
            className="bg-orange-500 hover:bg-orange-600 text-white w-full"
            onClick={handleSave}
          >
            Save
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEdit;
