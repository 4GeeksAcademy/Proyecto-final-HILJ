import React, { useContext, useState } from "react";
import "../../styles/uploadFile.css";
import { Context } from "../store/appContext";
import { InputRutas } from "./inputRutas.jsx";

const UploadFile = () => {
  const { store, actions } = useContext(Context);
  const [file, setFile] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "dlfq7smx");
    formData.append("api_key", "853636263856715");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dlfq7smx/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (res.ok) {
      actions.addImg(data.url);
    }
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="col-5 upload-file my-5 mx-auto">
      {store.newItineraryData.images.img.length > 0 ? (
        <div id="uploadedFile" className="carousel slide mt-3">
          <div className="carousel-inner uploaded">
            <div className="carousel-item active">
              <img
                src={
                  store.newItineraryData.images.img.length > 0
                    ? store.newItineraryData.images.img[0]
                    : ""
                }
                className="d-block uploaded"
                alt="Imagen añadida"
              />
            </div>
            {store.newItineraryData.images.img.length > 1
              ? store.newItineraryData.images.img.slice(1).map((url, index) => (
                  <div key={index} className="carousel-item uploaded">
                    <img
                      src={url}
                      className="d-block uploaded"
                      alt="Imagen añadida"
                    />
                  </div>
                ))
              : ""}
            {store.newItineraryData.images.img.length > 1 ? (
              <>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#uploadedFile"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#uploadedFile"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="mt-3 mb-5 d-flex flex-column align-items-center">
        <div className="mb-4 w-100">
          <label htmlFor="file-upload" className="file-upload-label w-100">
            <div className="file-upload-area">
              <i className="bi bi-upload"></i>
              <p className="mt-2 text-center">
                Haz clic para añadir imágenes o arrastra y suelta aquí
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="d-none"
              multiple
              onChange={handleFile}
              accept=".jpg, .jpeg, .png, .heif, .webp"
            />
          </label>
        </div>
        <button
          className="btn-primary send w-100 rounded-pill px-3 py-2"
          onClick={handleSubmit}
        >
          <i className="me-3 fa-solid fa-upload"></i>Subir imágenes
        </button>
      </div>
      <InputRutas />
    </div>
  );
};

export default UploadFile;
