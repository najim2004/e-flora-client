import React from "react";

interface ListItemProps {
  children: React.ReactNode;
}

const ListItem: React.FC<ListItemProps> = ({ children }) => {
  return (
    <li className="flex items-start">
      <span className="text-green-500 mr-2">•</span>
      <span>{children}</span>
    </li>
  );
};

export default ListItem;
