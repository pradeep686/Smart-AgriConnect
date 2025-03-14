import { Link } from "react-router-dom";

const Navbar = () => {
  const menuItems = [
    { name: "Home", path: "/homepage" },
    { name: "Subsidies", path: "/subsidies" },
    { name: "CropInsight", path: "/crop-insight" },
    { name: "CropProtect", path: "/crop-protect" },
    { name: "Weather", path: "/weather" },
    { name: "TradeHub", path: "/trade-hub" },
    { name: "Discussion", path: "/discussion" },
    { name: "Feedback", path: "/feedback" },
  ];

  return (
    <div className="w-52 h-screen bg-gradient-to-b from-green-700 to-green-900 text-white fixed top-0 left-0 flex flex-col justify-start items-center p-6 shadow-lg">
      {/* Logo or Title */}
      <h2 className="text-3xl font-extrabold mb-8 text-center">
  <span className="bg-gradient-to-r from-cyan-400 to-cyan-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:-rotate-1">
    Smart<br/>
  </span>
  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-transparent bg-clip-text transition-transform duration-300 hover:scale-110 hover:rotate-1">
     AgriConnect
  </span>
</h2>


      {/* Navigation List */}
      <ul className="w-full">
        {menuItems.map((item, index) => (
          <li key={index} className="mb-4 text-center">
            <Link
              to={item.path}
              className="block py-3 text-4xl text-lg font-high transition duration-300 ease-in-out transform hover:scale-110 hover:text-yellow-300"
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Navbar;
