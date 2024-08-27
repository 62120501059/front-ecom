import React from "react";
import Resize from "react-image-file-resizer";
import axios from "axios";
import { Avatar, Badge } from "antd";

const Addslide = ({ values, setValues, loading, setLoading }) => {
  const handleChangeFile = (e) => {
    const files = e.target.files;
    if (files) {
      setLoading(true);

      let allfileUpload = values.images;
      for (let i = 0; i < files.length; i++) {
        Resize.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                process.env.REACT_APP_API + "/images",
                {
                  image: uri,
                },
                {
                  // headers: {
                  //     authtoken: user.token,
                  // },
                }
              )
              .then((res) => {
                setLoading(false);
                allfileUpload.push(res.data);
                console.log("allfieUpload in then", allfileUpload);
                setValues({ ...values, images: allfileUpload });
              })
              .catch((err) => {
                setLoading(false);
                console.log(err);
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemove = (public_id) => {
    setLoading(true);
    console.log(public_id);
    // const img = values.images
    const { images } = values;
    axios
      .post(
        process.env.REACT_APP_API + "/removeimages",
        { public_id },
        {
          // headers: {
          //     authtoken: user.token
          // }
        }
      )
      .then((res) => {
        setLoading(false);
        let filterImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filterImages });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <br />

      <div className="mt-2 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
        <div className="space-y-1 text-center">
          {values.images &&
            values.images.map((c) => (
              <span className="avatar-item">
                <Badge
                  onClick={() => handleRemove(c.public_id)}
                  style={{ cursor: "pointer" }}
                  count="X"
                >
                  <span className="mx-2">{c.url}</span>
                </Badge>
              </span>
            ))}
          <div></div>
          <label
            htmlFor="file-upload"
            className="  elative cursor-pointer  bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2"
          >
            <span>Upload a file</span>

            <input
              id="file-upload"
              name="file-upload"
              type="file"
              className="sr-only"
              onChange={handleChangeFile}
            />
          </label>
        </div>
      </div>
      <br />
    </>
  );
};

export default Addslide;
