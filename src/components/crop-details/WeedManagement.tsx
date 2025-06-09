import React from "react";
import ListItem from "./ListItem";

const WeedManagement: React.FC = () => {
  return (
    <div>
      <h3 className="font-medium text-green-800 mb-3">
        Weed Management
      </h3>
      <ul className="space-y-2 text-green-700">
        <ListItem>
          Manual weeding at 20 and 40 days after transplanting
        </ListItem>
        <ListItem>
          Pre-emergence herbicides: Apply Pretilachlor or Butachlor within 3 days
          of transplanting
        </ListItem>
        <ListItem>
          Post-emergence herbicides: Apply Bispyribac-sodium at 15-20 days after
          transplanting
        </ListItem>
        <ListItem>
          Maintain proper water level to suppress weed growth
        </ListItem>
      </ul>
    </div>
  );
};

export default WeedManagement;
