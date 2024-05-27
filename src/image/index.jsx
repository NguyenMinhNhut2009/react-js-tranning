import { imageListData } from "./data.jsx";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightLong } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function ImageList() {
  const [imageIndex, setImageIndex] = useState(0);

  function handleNextButton() {
    if (imageIndex < imageListData.length - 1) {
      setImageIndex(imageIndex + 1);
    } else {
      setImageIndex(0);
    }
  }

  function handlePrevButton() {
    if (imageIndex > 0) {
      setImageIndex(imageIndex - 1);
    } else {
      setImageIndex(imageListData.length - 1);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        padding: "50px",
        width: window.innerWidth - 100,
        alignItems: "center",
        flexDirection: "column",
        height: window.innerHeight,
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <div
        style={{
          display: "flex",
          height: "600px",
          alignItems: "center",
          padding: "20px 20px 20px 20px",
          placeItems: "center",
        }}
      >
        <button
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundColor: "#90c0da",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handlePrevButton}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            style={{
              justifyContent: "center",
              width: "40px",
              height: "40px",
              color: "#4898c0",
              borderRadius: "50%",
            }}
          />
        </button>
        <img
          src={imageListData[imageIndex].url}
          style={{
            width: "800px",
            height: "700px",
            borderRadius: "0px 0px 16px 16px",
            margin: "40px",
          }}
        />
        <button
          style={{
            borderRadius: "50%",
            width: "50px",
            height: "50px",
            backgroundColor: "#90c0da",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleNextButton}
        >
          <FontAwesomeIcon
            icon={faArrowRightLong}
            style={{
              color: "#4898c0",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
            }}
          />
        </button>
      </div>
      <div
        style={{
          display: "flex",
          width: window.innerWidth - 100,
          overflowX: "auto",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: window.innerHeight,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      ></div>
    </div>
  );
}

export default ImageList;
