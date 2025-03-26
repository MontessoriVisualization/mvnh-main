import React from "react";
import { Link } from "react-router-dom";

interface LinkItem {
  label: string;
  route: string;
}

interface FooterProps {
  Links: LinkItem[];
  NebClass11: LinkItem[];
  NebClass12: LinkItem[];
  PastYear11: LinkItem[];
  PastYear12: LinkItem[];
}

const Footer: React.FC<FooterProps> = ({
  Links,
  NebClass11,
  NebClass12,
  PastYear11,
  PastYear12,
}) => {
  return (
    <div className="flex gap-20 text-[#b5d2eb] font-semibold">
      <div className="flex gap-5 after:h-64 after:w-0.5 after:bg-gray-400">
        <ul className="gap-2 flex flex-col">
          {Links.map((item, index) => (
            <li key={index}>
              <Link to={item.route} className="text-sm">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row gap-9">
        <ul className="gap-2 flex flex-col">
          <h1 className="font-bold text-lg text-white">Class 11</h1>
          {NebClass11.map((item, index) => (
            <li key={index}>
              <Link to={item.route} className="text-sm">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="gap-2 flex flex-col">
          <h1 className="font-bold text-lg text-white">Class 12</h1>
          {NebClass12.map((item, index) => (
            <li key={index}>
              <Link to={item.route} className="text-sm">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div>
          <h1 className="font-bold text-lg text-white">Past Year Question</h1>
          <div className="flex gap-3">
            <ul className="gap-2 flex flex-col">
              {PastYear11.map((item, index) => (
                <li key={index}>
                  <Link to={item.route} className="text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="gap-2 flex flex-col">
              {PastYear12.map((item, index) => (
                <li key={index}>
                  <Link to={item.route} className="text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
