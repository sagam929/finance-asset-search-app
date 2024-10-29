import React, { useState, useEffect } from 'react';

const dummyData = [
  { ticker: 'AAPL', price: 150, category: 'Tech' },
  { ticker: 'GOOGL', price: 2800, category: 'Tech' },
  { ticker: 'AMZN', price: 3300, category: 'Retail' },
  { ticker: 'TSLA', price: 700, category: 'Auto' },
  { ticker: 'MSFT', price: 300, category: 'Tech' },
];

const AssetList = () => {
  const [assets, setAssets] = useState(dummyData);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Simulate live price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => ({
          ...asset,
          price: Math.round(asset.price * (0.95 + Math.random() * 0.1)),
        }))
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleSort = () => {
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const isWithinPriceRange = (price) => {
    switch (priceFilter) {
      case '0-500':
        return price <= 500;
      case '500-1000':
        return price > 500 && price <= 1000;
      case '1000-3000':
        return price > 1000 && price <= 3000;
      case '3000+':
        return price > 3000;
      default:
        return true;
    }
  };

  const filteredData = assets
    .filter(
      (asset) =>
        asset.ticker.toLowerCase().includes(search.toLowerCase()) &&
        (!categoryFilter || asset.category === categoryFilter) &&
        isWithinPriceRange(asset.price)
    )
    .sort((a, b) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div
      className={`p-6 min-h-screen transition-colors duration-300 ${
        isDarkTheme ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'
      }`}
    >
      <h1 className="text-4xl font-bold mb-6 text-center">
        Asset List
      </h1>

      <button
        onClick={toggleTheme}
        className={`mb-4 px-4 py-2 rounded-lg shadow ${
          isDarkTheme
            ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
            : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
      >
        Toggle {isDarkTheme ? 'Light' : 'Dark'} Theme
      </button>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-center items-center">
        <input
          type="text"
          placeholder="Search by ticker"
          className={`p-3 rounded-md focus:outline-none focus:ring ${
            isDarkTheme
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'border-blue-300'
          }`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className={`p-3 rounded-md focus:outline-none focus:ring ${
            isDarkTheme
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'border-blue-300'
          }`}
          onChange={(e) => setCategoryFilter(e.target.value)}
          value={categoryFilter}
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Retail">Retail</option>
          <option value="Auto">Auto</option>
        </select>

        <select
          className={`p-3 rounded-md focus:outline-none focus:ring ${
            isDarkTheme
              ? 'bg-gray-800 border-gray-700 text-white'
              : 'border-blue-300'
          }`}
          onChange={(e) => setPriceFilter(e.target.value)}
          value={priceFilter}
        >
          <option value="">All Prices</option>
          <option value="0-500">$0 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000-3000">$1000 - $3000</option>
          <option value="3000+">$3000+</option>
        </select>

        <button
          onClick={handleSort}
          className={`p-3 rounded-md shadow-md ${
            isDarkTheme
              ? 'bg-gray-700 hover:bg-gray-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          Sort by Price ({sortOrder || 'none'})
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse rounded-lg shadow-md overflow-hidden">
          <thead className={`${isDarkTheme ? 'bg-gray-700' : 'bg-blue-600'} text-white`}>
            <tr>
              <th className="p-3 text-left">Ticker</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Category</th>
            </tr>
          </thead>

          <tbody>
            {filteredData.map((asset, index) => (
              <tr
                key={asset.ticker}
                className={`${
                  index % 2 === 0
                    ? isDarkTheme
                      ? 'bg-gray-800'
                      : 'bg-blue-50'
                    : isDarkTheme
                    ? 'bg-gray-900'
                    : 'bg-white'
                } hover:bg-blue-100`}
              >
                <td className="p-3 border-b">{asset.ticker}</td>
                <td className="p-3 border-b">${asset.price}</td>
                <td className="p-3 border-b">{asset.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
