import React, { useState, useEffect } from "react";import { motion } from "framer-motion";
import axios from "axios"; // Make sure you import axios
import { Link } from "react-router-dom";
import Modal from "./modal"; // We'll create a Modal component

const BuyerPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sellerInfo, setSellerInfo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  

  const handleContactSeller = async (sellerId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not logged in.");
        return;
      }
  
      const response = await axios.get(`http://localhost:9010/userAddress/getByUserId/${sellerId}`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
  
      if (response.data.success) {
        setSellerInfo(response.data.data);
        setIsModalOpen(true);
      } else {
        alert("Failed to retrieve seller information.");
      }
    } catch (error) {
      console.error("Error fetching seller info:", error);
      alert("Something went wrong.");
    }
  };
  
  
  

  // Dummy Products (you can replace this)
  const products = [
    {
      name: "Brown Natural Sugar",
      description: "Sourced from organically grown sugarcane, our Brown Natural Sugar retains its molasses content, offering a rich, caramel flavor and a soft, moist texture. Ideal for baking, cooking, and sweetening beverages, it provides a healthier alternative to refined white sugar with essential minerals intact.",
      src: "https://th.bing.com/th/id/OIP.e4xn8A0gce89dFsSp5boxwHaHa?rs=1&pid=ImgDetMain",
      price: "₹80/kg",
      quantity: "500 kg",
      unit: "kg",
      location: "Kolhapur, Maharashtra",
      harvestDate: "2025-03-01",
      category: "Organic Product",
      variety: "Natural Brown",
    },
    {
      name: "Basmati Rice",
      description: "Our premium Basmati Rice is renowned for its extra-long grains, delicate texture, and distinct aroma. Cultivated in the fertile lands of Punjab, this variety is aged to perfection, ensuring fluffy, non-sticky cooked grains ideal for biryanis, pilafs, and gourmet dishes.",
      src: "https://philnews.ph/wp-content/uploads/2018/01/rice-1.jpg",
      price: "₹120/kg",
      quantity: "1000 kg",
      unit: "kg",
      location: "Punjab, India",
      harvestDate: "2025-02-15",
      category: "Grains",
      variety: "Basmati 370",
    },
    {
      name: "Wheat",
      description: "High-quality Sharbati Wheat sourced from Haryana's rich soils, known for its superior protein content, elasticity, and soft texture. Perfect for making fluffy rotis, chapatis, and bakery items. Naturally sun-dried and cleaned to maintain purity and nutritional value.",
      src: "https://thumbs.dreamstime.com/b/piles-wheat-grains-mill-storage-grain-elevator-main-commodity-group-food-markets-piles-wheat-grains-mill-241570578.jpg",
      price: "₹30/kg",
      quantity: "1500 kg",
      unit: "kg",
      location: "Haryana, India",
      harvestDate: "2025-03-10",
      category: "Grains",
      variety: "Sharbati Wheat",
    },
    {
      name: "Neem Sticks",
      description: "Our organically harvested Neem Sticks are prized for their medicinal properties, traditionally used for oral hygiene and pest control. Rich in antibacterial compounds, they support natural dental care and organic farming practices, promoting sustainable living.",
      src: "https://thumbs.dreamstime.com/z/ayurvedic-natural-organic-neem-datun-toothbrush-nim-tree-twigs-chew-sticks-brushing-teeth-selling-road-side-ayurvedic-276647892.jpg",
      price: "₹10/stick",
      quantity: "2000 sticks",
      unit: "bundle",
      location: "Rajasthan, India",
      harvestDate: "2025-01-20",
      category: "Organic Product",
      variety: "Azadirachta indica",
    },
    {
      name: "Dry Fruit - Almond",
      description: "Handpicked California Almonds, packed with essential vitamins, healthy fats, and antioxidants. Perfect for snacking, baking, or adding to breakfast dishes. Our almonds are naturally dried and processed without chemicals to preserve their crunchy texture and natural sweetness.",
      src: "https://5.imimg.com/data5/SELLER/Default/2022/8/VH/OH/CB/138060853/almond-500x500.jpg",
      price: "₹850/kg",
      quantity: "300 kg",
      unit: "kg",
      location: "Kashmir, India",
      harvestDate: "2024-11-15",
      category: "Dry Fruits",
      variety: "California Almond",
    },
    {
        name: "Tractor", // Product name
        description: "The Mahindra 575 DI tractor is a heavy-duty farming machine engineered for Indian agricultural conditions. Equipped with a powerful 4-cylinder engine, it delivers robust performance, high fuel efficiency, and superior handling for plowing, harvesting, and hauling operations.", // Detailed description
        src: "https://khetigaadi.com/resize/large/images/new-tractor/20220129120221.png", // Direct image URL (cleaned for better reliability)
        price: "₹6,50,000", // Price
        quantity: "10 units", // Quantity available
        unit: "unit", // Unit type (optional redundancy with `quantity`)
        location: "Nashik, Maharashtra", // Seller or product location
        harvestDate: "2025-04-01", // Date product is ready or listed
        category: "Machinery", // Product category
        variety: "Mahindra 575 DI", // Specific model or variety
      },
      
    {
        name: "Erode Turmeric",
        description: "Erode turmeric is famous for its bright golden-yellow color and high curcumin content, making it ideal for cooking, medicinal use, and cosmetic applications.",
        src: "https://th.bing.com/th/id/OIP.oUqium0b4-DnY5sTE6m_kwHaEn?rs=1&pid=ImgDetMain",
        price: "₹160/kg",
        quantity: "700 kg",
        unit: "kg",
        location: "Erode, Tamil Nadu",
        harvestDate: "2025-01-25",
        category: "Spices",
        variety: "High Curcumin Turmeric",
      },
      {
        name: "Ponni Rice",
        description: "Ponni rice is a soft-textured, medium-grain rice widely used in Tamil households for its aroma, easy digestibility, and suitability for everyday meals.",
        src: "https://5.imimg.com/data5/SELLER/Default/2023/1/TQ/XO/ID/92452567/ponni-rice-1000x1000.jpg",
        price: "₹60/kg",
        quantity: "2000 kg",
        unit: "kg",
        location: "Thanjavur, Tamil Nadu",
        harvestDate: "2025-03-18",
        category: "Grains",
        variety: "Boiled Ponni",
      },
      {
        name: "Kullakar Rice",
        description: "Kullakar rice is a traditional red rice variety known for its rich fiber, iron content, and use in preparing idli, dosa, and porridge among health-conscious consumers.",
        src: "https://kinalglobalcare.com/wp-content/uploads/Red-Millet2.jpg",
        price: "₹90/kg",
        quantity: "800 kg",
        unit: "kg",
        location: "Thiruvarur, Tamil Nadu",
        harvestDate: "2025-02-22",
        category: "Traditional Grains",
        variety: "Red Rice",
      },
      {
        name: "Groundnuts",
        description: "Cultivated in the dry zones of Virudhunagar and Thiruvannamalai, these groundnuts are known for their nutty flavor and are widely used in snacks, oil, and sweets.",
        src: "https://c8.alamy.com/comp/F3G0BH/groundnut-harvesting-near-vadalur-tamil-nadu-india-F3G0BH.jpg",
        price: "₹55/kg",
        quantity: "1200 kg",
        unit: "kg",
        location: "Virudhunagar, Tamil Nadu",
        harvestDate: "2025-03-05",
        category: "Oilseeds",
        variety: "Bold Kernel",
      },
      {
        name: "Cold-Pressed Gingelly Oil",
        description: "Extracted from premium sesame seeds, this gingelly oil is made using traditional cold-press methods to retain aroma, flavor, and health benefits, commonly used in Tamil cuisine.",
        src: "https://th.bing.com/th/id/OIP.GUFrhJkvZxLF6lzy2bALcwHaHa?rs=1&pid=ImgDetMain",
        price: "₹280/liter",
        quantity: "500 liters",
        unit: "liters",
        location: "Thiruvannamalai, Tamil Nadu",
        harvestDate: "2025-01-12",
        category: "Edible Oils",
        variety: "Black Sesame Oil",
      },
      {
        name: "Seeraga Samba Rice",
        description: "Known for its tiny grain size and rich aroma, Seeraga Samba is the traditional rice used in biryani, offering a delicate texture and unmatched flavor.",
        src: "https://5.imimg.com/data5/OE/IQ/GN/SELLER-2302674/organic-seeraga-samba-rice-1000x1000.jpg",
        price: "₹95/kg",
        quantity: "900 kg",
        unit: "kg",
        location: "Pudukottai, Tamil Nadu",
        harvestDate: "2025-02-10",
        category: "Premium Rice",
        variety: "Seeraga Samba",
      },
      {
        name: "Coconut (Pollachi)",
        description: "Pollachi coconuts are large, juicy, and known for their high oil content and thick kernels, ideal for cooking, oil extraction, and religious use.",
        src: "https://5.imimg.com/data5/OV/ZD/QB/ANDROID-15705086/product-jpeg-1000x1000.jpg",
        price: "₹20/piece",
        quantity: "1500 pieces",
        unit: "unit",
        location: "Pollachi, Tamil Nadu",
        harvestDate: "2025-03-01",
        category: "Fruits",
        variety: "Pollachi Coconut",
      },
      {
        name: "Castor Seeds",
        description: "Castor seeds from Tamil Nadu are valued for their oil, widely used in pharmaceuticals, lubricants, and bio-fertilizers due to their high ricinoleic acid content.",
        src: "https://5.imimg.com/data5/ANDROID/Default/2021/3/RW/LY/XM/122555642/product-jpeg-500x500.jpg",
        price: "₹75/kg",
        quantity: "600 kg",
        unit: "kg",
        location: "Salem, Tamil Nadu",
        harvestDate: "2025-03-20",
        category: "Oilseeds",
        variety: "Hybrid Castor",
      },
      {
        name: "Mustard Seeds",
        description: "Mustard seeds (Kadugu) from Tamil Nadu have a pungent aroma and strong flavor, perfect for pickles, tadkas, and traditional South Indian dishes.",
        src: "https://vaagdhara.org/wp-content/uploads/2023/12/Traditional-methods-of-Preservation-of-Kharif-seeds-3.jpg",
        price: "₹70/kg",
        quantity: "800 kg",
        unit: "kg",
        location: "Tiruchirapalli, Tamil Nadu",
        harvestDate: "2025-02-27",
         category: "Spices",
        variety: "Black Mustard",
      },
      {
        name: "Neem Seeds",
        description: "Neem seeds are widely used in organic farming for bio-pesticides and neem oil, known for their strong antifungal and antibacterial properties.",
        src: "https://th.bing.com/th/id/OIP.n45bA9yu43pRz_LFN46aSgAAAA?rs=1&pid=ImgDetMain",
        price: "₹45/kg",
        quantity: "1000 kg",
        unit: "kg",
        location: "Dindigul, Tamil Nadu",
        harvestDate: "2025-03-03",
        category: "Bio Inputs",
        variety: "Neem (Azadirachta Indica)",
      },
      {
        name: "Turmeric Powder",
        description: "Finely ground from Erode turmeric fingers, this powder offers rich color, aroma, and medicinal benefits for cooking and health remedies.",
        src: "https://5.imimg.com/data5/SELLER/Default/2024/6/428434837/EF/UO/VI/29213653/yellow-organic-turmeric-powder-1000x1000.jpg",
        price: "₹180/kg",
        quantity: "600 kg",
        unit: "kg",
        location: "Erode, Tamil Nadu",
        harvestDate: "2025-02-18",
        category: "Spices",
        variety: "Organic Turmeric Powder",
      },
      {
        name: "Amla (Nellikai)",
        description: "Amla from Salem is rich in Vitamin C and antioxidants, used in juices, pickles, Ayurvedic tonics, and immunity boosters.",
        src: "https://th.bing.com/th/id/R.69d69575bdc80714412d4f36a55ac50c?rik=TbWK7jfk2UNxVg&riu=http%3a%2f%2fwww.prlog.org%2f10747117-amla.jpg&ehk=9BCErd4AxUbLVaGBRUNqawbM2r8PvcaZ0D%2fTr0%2f%2fYEA%3d&risl=&pid=ImgRaw&r=0&sres=1&sresct=1",
        price: "₹40/kg",
        quantity: "900 kg",
        unit: "kg",
        location: "Salem, Tamil Nadu",
        harvestDate: "2025-01-30",
        category: "Fruits",
        variety: "Indian Gooseberry",
      },
      {
        name: "Soapnut (Boondi Kottai)",
        description: "Naturally grown soapnuts used as eco-friendly detergent and shampoo alternatives, ideal for chemical-free cleaning solutions.",
        src: "https://5.imimg.com/data5/SELLER/Default/2021/7/HE/TW/UV/5357063/boonthikottai-sm-1000x1000.jpg",
        price: "₹60/kg",
        quantity: "1000 kg",
        unit: "kg",
        location: "Tirunelveli, Tamil Nadu",
        harvestDate: "2025-03-09",
        category: "Natural Products",
        variety: "Soapnut Shells",
      },
      {
        name: "Banana (Nendran)",
        description: "Nendran banana from Tamil Nadu is a starchy variety used for chips, cooking, and baby food with long shelf life and high nutrition.",
        src: "https://th-i.thgim.com/public/incoming/hx9kis/article67786601.ece/alternates/LANDSCAPE_1200/NENDRAN%20BANANA%202.jpg",
        price: "₹35/kg",
        quantity: "1200 kg",
        unit: "kg",
        location: "Tiruchendur, Tamil Nadu",
        harvestDate: "2025-04-10",
        category: "Fruits",
        variety: "Nendran",
      },
      {
        name: "Moringa (Drumstick)",
        description: "Fresh moringa sticks loaded with nutrients and antioxidants, widely used in sambhar and health-based cuisines.",
        src: "https://5.imimg.com/data5/ANDROID/Default/2021/6/BE/GN/GS/65132747/product-jpeg-500x500.jpg",
        price: "₹25/kg",
        quantity: "1500 kg",
        unit: "kg",
        location: "Karur, Tamil Nadu",
        harvestDate: "2025-04-15",
        category: "Vegetables",
        variety: "PKM-1",
      }
  ];

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  

      const [isLoading, setIsLoading] = useState(true);
    
    useEffect(() => {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 700);
    
      return () => clearTimeout(timer);
    }, []);
    
    if (isLoading) {
      return (
        <div className="ml-64 pt-79 flex-1 flex justify-center items-center">
       <div className="relative w-12 h-12">
      <div className="absolute inset-0 rounded-full border-4 border-t-green-500 border-b-green-500 border-l-transparent border-r-transparent animate-spin"></div>
      <div className="absolute inset-1 rounded-full border-4 border-t-transparent border-b-transparent border-l-green-300 border-r-green-300 animate-[spin_2s_linear_infinite]"></div>
    </div>
    </div>    
      );
    }

    
  return (
    <div className="ml-64 p-8 flex-1 bg-gray-100 min-h-screen">
            <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-red-500 flex items-center gap-2">
                🛒 Agri Products
                </h2>
                <motion.p
                  className="mt-2 text-1xl font-bold text--600"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 10, opacity: 1 }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 5 }}
                >
                  Buy Fresh from Farmers — No Middlemen, No Compromise.
                </motion.p>
              </div>
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search Product..."
            className="w-80 bg-white/30 backdrop-blur-lg text-gray-800 placeholder-gray-600 border border-gray-300 rounded-full py-3 px-5 focus:outline-none focus:ring-2 focus:ring-gray-500 shadow-lg transition-all duration-300"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="ml-2 !bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>
      </div><br />

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-2xl shadow-xl p-6 transform transition duration-300 hover:scale-105 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
<div className="h-48 w-full rounded-xl overflow-hidden">
  <img
    src={product.src} // make sure it is product.src, not product.image
    alt={product.name}
    className="h-full w-full object-cover"
  />
</div>


            <h3 className="text-xl font-bold text-orange-600 mt-4">{product.name}</h3>
            <p className="text-gray-600 mt-2 text-sm">{product.description}</p>

            <div className="mt-4 space-y-2 text-sm text-black-700">
              <p><span className="font-semibold text-black-800">Price:</span> {product.price}</p>
              <p><span className="font-semibold text-black-800">Available:</span> {product.quantity}</p>
              <p><span className="font-semibold text-black-800">Unit:</span> {product.unit}</p>
              <p><span className="font-semibold text-black-800">Location:</span> {product.location}</p>
              <p><span className="font-semibold text-black-800">Harvest Date:</span> {product.harvestDate}</p>
              <p><span className="font-semibold text-black-800">Category:</span> {product.category}</p>
              <p><span className="font-semibold text-black-800">Variety:</span> {product.variety}</p>
            </div>

       <button

  className="mt-4 w-full !bg-green-600 !text-white py-2 rounded-full font-bold hover:bg-red-600 transition"
>
 <Link to='/seller-address'>Contact Seller</Link> 
</button>

          </motion.div>
        ))}
      </div>

      {/* Modal for showing Seller Info */}
      {isModalOpen && sellerInfo && (
  <Modal onClose={() => setIsModalOpen(false)}>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        💬 Seller Information
      </h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {sellerInfo.fullName}</p>
        <p><strong>Phone:</strong> {sellerInfo.phoneNumber}</p>
        <p><strong>Email:</strong> {sellerInfo.email}</p>
        <p>
          <strong>Location:</strong> {`${sellerInfo.village}, ${sellerInfo.taluk}, ${sellerInfo.district}, ${sellerInfo.state} - ${sellerInfo.pinCode}`}
        </p>
      </div>
    </div>
  </Modal>
)}

    </div>
  );
};

export default BuyerPage;
