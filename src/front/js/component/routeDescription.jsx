import React from "react";
import "../../styles/ruteDescription.css";

const RouteDescription = ({ data }) => {
  return (
    <>
      <div className="description mx-5 my-5">
        <header className="d-flex my-4 justify-content-between">
          <h5>{data.title}</h5>
          <span>Valoración</span>
        </header>
        <div className="tags d-flex my-4">
          {/* <span>
            {description.tags.map((tag) => (
              <button className="tag mx-2 rounded-pill py-1 px-4">{tag}</button>
            ))}
          </span> */}
        </div>
        <section>
          <h5>{data.duration} días.</h5>
          <p>{data.description}</p>
        </section>
      </div>
    </>
  );
};

export default RouteDescription;
