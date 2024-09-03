import React from "react";
import Comments from "./comments.jsx";
import { COMMENTS_DATA } from "./data/commentsData"
import "../../styles/comments.css";

const CommentsSection = () => {
  return (
    <>
      <section className="comments">
        <div className="header d-flex  my-5">
          <h4>Comentarios de usuarios</h4>
          <button type="button" className="btn btn-outline-primary">
            Comentar Ruta
          </button>
        </div>
        <div className="comments">
          {COMMENTS_DATA.map((comment) => (
            <Comments
              profileImg={comment.profileImg}
              username={comment.username}
              tittle={comment.tittle}
              date={comment.date}
              body={comment.body}
              key={comment.id}
            />
          ))}
        </div>

        <span className="allcomments mx-5"> Leer todos los comentarios </span>
      </section>
    </>
  );
};

export default CommentsSection;
