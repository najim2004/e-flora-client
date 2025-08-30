import React from "react";
import { Icons } from "../../icons";

interface SideNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: "overview", label: "Overview", icon: Icons.bookOpen },
    { id: "growth-and-harvest", label: "Growth and Harvest", icon: Icons.sprout },
    { id: "care-requirements", label: "Care Requirements", icon: Icons.heart },
    {
      id: "pest-and-disease-management",
      label: "Pest and Disease Management",
      icon: Icons.shield,
    },
    { id: "companion-planting", label: "Companion Planting", icon: Icons.users },
    {
      id: "nutritional-and-culinary",
      label: "Nutritional and Culinary",
      icon: Icons.leaf,
    },
    { id: "economic-aspects", label: "Economic Aspects", icon: Icons.dollarSign },
    {
      id: "sustainability-tips",
      label: "Sustainability Tips",
      icon: Icons.lightbulb,
    },
    { id: "aesthetic-value", label: "Aesthetic Value", icon: Icons.flower },
    {
      id: "regional-suitability",
      label: "Regional Suitability",
      icon: Icons.mapPin,
    },
    { id: "fun-facts", label: "Fun Facts", icon: Icons.smile },
  ];

  return (
    <nav className="sticky top-24 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4 text-gray-700">On this page</h3>
      <ul className="space-y-2">
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? "bg-green-100 text-green-700"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setActiveSection(item.id);
                document
                  .getElementById(item.id)
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;