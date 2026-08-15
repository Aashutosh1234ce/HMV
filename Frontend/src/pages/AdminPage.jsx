import { useState, useEffect } from "react";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState("");
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceInputs, setPriceInputs] = useState({});

  const roomTypes = [
    { key: "Dormitory", label: "Dormitory Room" },
    { key: "Twin Bed", label: "Twin Bed Room" },
    { key: "Couple Bed", label: "Couple Bed Room" },
    { key: "King Bed", label: "King Bed Room" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "admin123") {
      setLoggedIn(true);
    } else {
      alert("Incorrect password!");
    }
  };

  const fetchRooms = () => {
    fetch("http://127.0.0.1:5000/rooms", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
        setLoading(false);
        
        // Initialize price inputs with current prices
        const currentPrices = {};
        roomTypes.forEach(type => {
          const room = data.find(r => r.room_number.includes(type.key));
          if (room) currentPrices[type.key] = room.price;
        });
        setPriceInputs(currentPrices);
      })
      .catch((err) => {
        console.error("Error fetching rooms:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (loggedIn) {
      fetchRooms();
    }
  }, [loggedIn]);

  const handleCancel = async (roomName) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/rooms/cancel/${encodeURIComponent(roomName)}`, {
        method: "POST",
      });
      if (response.ok) {
        fetchRooms(); 
      }
    } catch (error) {
      alert("Failed to connect to server.");
    }
  };

  const handlePriceChange = (type, value) => {
    setPriceInputs(prev => ({ ...prev, [type]: value }));
  };

  const handleSavePrice = async (type) => {
    const newPrice = priceInputs[type];
    try {
      const response = await fetch(`http://127.0.0.1:5000/rooms/update-price/${encodeURIComponent(type)}`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ price: parseFloat(newPrice) })
      });
      if (response.ok) {
        alert(`Price for ${type} rooms updated to NPR ${newPrice}`);
        fetchRooms();
      } else {
        alert("Failed to update price.");
      }
    } catch (error) {
      alert("Failed to connect to server.");
    }
  };

  if (!loggedIn) {
    return (
      <section className="flex min-h-[80vh] items-center justify-center bg-stone px-6 py-28">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-paper p-8 shadow-soft">
          <h2 className="font-display text-3xl text-ink">Admin Login</h2>
          <p className="mt-2 text-[14px] text-ash">Enter your password to manage bookings and prices.</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="mt-6 w-full border border-ink/20 bg-transparent px-4 py-3 text-ink outline-none focus:border-ink"
            required
          />
          <button type="submit" className="mt-4 w-full bg-ink px-8 py-4 text-[11px] uppercase tracking-[0.24em] text-paper transition-colors hover:bg-ink/80">
            Log In →
          </button>
        </form>
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] bg-stone px-6 py-28 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[11px] uppercase tracking-[0.3em] text-ash">Dashboard</span>
            <h1 className="mt-2 font-display text-4xl text-ink">Hotel Management</h1>
          </div>
          <button onClick={() => setLoggedIn(false)} className="text-[11px] uppercase tracking-[0.2em] text-ash underline-offset-4 hover:underline">
            Log Out →
          </button>
        </div>

        {/* 1. PRICING MANAGEMENT */}
        <div className="mt-12">
          <h2 className="font-display text-2xl text-ink">Pricing Management</h2>
          <p className="text-[14px] text-ash mt-1">Change the price for an entire room type. This updates instantly on the website.</p>
          
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roomTypes.map(type => {
              const roomsOfType = rooms.filter(r => r.room_number.includes(type.key));
              const availableCount = roomsOfType.filter(r => !r.is_booked).length;
              
              return (
                <div key={type.key} className="border border-ink/10 bg-paper p-5 shadow-soft">
                  <h3 className="font-display text-lg text-ink">{type.label}</h3>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-ash mt-1">{availableCount} of {roomsOfType.length} available</p>
                  
                  <label className="block mt-4">
                    <span className="text-[10px] uppercase tracking-[0.18em] text-ash">Price (NPR)</span>
                    <input 
                      type="number" 
                      value={priceInputs[type.key] || 0} 
                      onChange={(e) => handlePriceChange(type.key, e.target.value)} 
                      className="mt-1.5 w-full border border-ink/15 bg-stone px-3 py-2 text-ink outline-none focus:border-[#a8843f]"
                    />
                  </label>
                  <button 
                    onClick={() => handleSavePrice(type.key)}
                    className="mt-3 w-full bg-ink px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-paper transition-colors hover:bg-[#a8843f]"
                  >
                    Update Price
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. CURRENT BOOKINGS */}
        <div className="mt-16">
          <h2 className="font-display text-2xl text-ink">Current Bookings</h2>
          <div className="mt-6 overflow-x-auto border border-ink/10 bg-paper shadow-soft">
            <table className="w-full text-left">
              <thead className="border-b border-ink/10 bg-stone/50">
                <tr>
                  <th className="px-4 py-4 text-[11px] uppercase tracking-[0.16em] text-ash">Room Booked</th>
                  <th className="px-4 py-4 text-[11px] uppercase tracking-[0.16em] text-ash">Guest Name</th>
                  <th className="px-4 py-4 text-[11px] uppercase tracking-[0.16em] text-ash">Dates</th>
                  <th className="px-4 py-4 text-[11px] uppercase tracking-[0.16em] text-ash">Contact</th>
                  <th className="px-4 py-4 text-right text-[11px] uppercase tracking-[0.16em] text-ash">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="px-4 py-8 text-ash">Loading...</td></tr>
                ) : (
                  rooms.filter(r => r.is_booked).length === 0 ? (
                    <tr><td colSpan="5" className="px-4 py-8 text-ash text-center">No current bookings.</td></tr>
                  ) : (
                    rooms.filter(r => r.is_booked).map((room) => (
                      <tr key={room.id} className="border-b border-ink/5 align-top last:border-0">
                        <td className="px-4 py-5 font-display text-lg text-ink">{room.room_number}</td>
                        <td className="px-4 py-5 text-[14px] text-ink/80">{room.guest_name}</td>
                        <td className="px-4 py-5 text-[13px] text-ash">{room.check_in} to {room.check_out}</td>
                        <td className="px-4 py-5 text-[13px] text-ash">
                          <p>{room.guest_email}</p>
                          {room.guest_phone && <p>{room.guest_phone}</p>}
                        </td>
                        <td className="px-4 py-5 text-right">
                          <button 
                            onClick={() => handleCancel(room.room_number)}
                            className="text-[11px] uppercase tracking-[0.2em] text-red-500 underline-offset-4 transition-colors hover:text-red-700 hover:underline"
                          >
                            Cancel Booking
                          </button>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}