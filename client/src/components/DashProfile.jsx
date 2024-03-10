import { TextInput, Button, Alert } from "flowbite-react";
import { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
  ref,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [uploadingProgrss, setUploadingProgress] = useState(null);
  const [uploadError, setUploadError] = useState(null);
  const filePickerRef = useRef();

  const handleImageChange = (e) => {
    const image = e.target.files[0];
    if (image) {
      setImageFile(image);
      setImageFileUrl(URL.createObjectURL(image));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = async () => {
    // rules_version = '2';
    // Craft rules based on data in your Firestore database
    // allow write: if firestore.get(
    //    /databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    // service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2 * 1024 * 1024 &&
    //       request.resource.contentType.matches("image/.*")
    //     }
    //   }
    // }
    // [Firebase storage rules] ^

    setUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadingProgress(progress.toFixed(0));
      },
      (error) => {
        setUploadError("Opps.. Could not upload the image. (Max: 2MB)");
        setUploadingProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center my-7 font-semibold text-3xl">Profile</h1>
      <form className="flex flex-col gap-4 ">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer"
          onClick={() => filePickerRef.current.click()}
        >
          {uploadingProgrss && (
            <CircularProgressbar
              value={uploadingProgrss || 0}
              text={`${uploadingProgrss}%`}
              strokeWidth={3}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: "0",
                  left: "0",
                },
                path: {
                  stroke: `rgba(0,255,127, ${uploadingProgrss / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="profile picture"
            className={`w-full h-full rounded-full object-cover ${
              uploadingProgrss && uploadingProgrss < 100 && "opacity-70"
            }`}
          />
        </div>
        {uploadError && <Alert color="failure">{uploadError}</Alert>}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="text"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button type="submit" outline gradientDuoTone="greenToBlue">
          Update
        </Button>
      </form>
      <div className="text-red-500 flex justify-between mt-4">
        <span className="cursor-pointer">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
