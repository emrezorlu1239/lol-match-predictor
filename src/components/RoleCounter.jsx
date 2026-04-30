const RoleCounter = ({ icon, label, value, onChange }) => {
  const handleDecrement = () => {
    if (value > 0) onChange(value - 1);
  };

  const handleIncrement = () => {
    if (value < 5) onChange(value + 1);
  };

  return (
    <div className="flex items-center justify-between py-2 border-b border-lol-gold/10 last:border-0">
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span className="font-cinzel text-sm text-lol-text">{label}</span>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={handleDecrement}
          disabled={value === 0}
          className="w-7 h-7 rounded-full border border-lol-gold text-lol-gold flex items-center justify-center hover:bg-lol-gold hover:text-lol-dark disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-lol-gold transition-colors"
        >
          −
        </button>
        <span className="font-cinzel text-xl text-lol-gold w-4 text-center">
          {value}
        </span>
        <button 
          onClick={handleIncrement}
          disabled={value === 5}
          className="w-7 h-7 rounded-full border border-lol-gold text-lol-gold flex items-center justify-center hover:bg-lol-gold hover:text-lol-dark disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-lol-gold transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default RoleCounter;
