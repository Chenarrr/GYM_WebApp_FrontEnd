import React from "react";
import SectionWrapper from "./SectionWrapper";

export default function Workout({Workout}) { 


  return (

     <SectionWrapper 
          header={"genarate your workout"}
          title={["The", "Danger", "Zone"]}
        > 

          {Workout.map((exercise, i) => {

                return( 
                 
                  
                );



          )}



        </SectionWrapper>
  );
}