import React from "react";
import AccordionContainer from "./accordionContent.jsx"
import { DATA_LIST } from "./data/data"

const Accordion = () => {
  return (
    <div className="accordion-container mx-5 my-5">
      {DATA_LIST.map((data) => (
        <AccordionContainer title={data.title} key={data.id}>
          <ul>
            {data.content.map((location, index) => (
              <li key={index}>{location}</li>
            ))}
          </ul>
        </AccordionContainer>
      ))}
    </div>
  );
};

export default Accordion;