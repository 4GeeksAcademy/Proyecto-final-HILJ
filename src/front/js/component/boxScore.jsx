import React from 'react';
import "/workspaces/Proyecto-final-HILJ/src/front/styles/boxScore.css";

const BoxScore = ({ team1, team2, score1, score2 }) => {
  return (
    <div className="box-score">
      <div className="team">
        <span className="team-name">{team1}</span>
        <span className="team-score">{score1}</span>
      </div>
      <div className="team">
        <span className="team-name">{team2}</span>
        <span className="team-score">{score2}</span>
      </div>
    </div>
  );
};

export default BoxScore;
