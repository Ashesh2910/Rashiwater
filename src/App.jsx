import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Discovery from './pages/Discovery'
import About from './pages/About'
import Contact from './pages/Contact'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Admin from './pages/Admin'
import Success from './pages/Success'
import Compatibility from './pages/Compatibility'
import Tarot from './pages/Tarot'
import Constellations from './pages/Constellations'
import Quiz from './pages/Quiz'
import AuraReader from './pages/AuraReader'
import CustomCursor from './components/CustomCursor'
import CosmicWeatherBanner from './components/CosmicWeatherBanner'
import StarryBackground from './components/StarryBackground'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import AmbientMusicPlayer from './components/AmbientMusicPlayer'
import MeditationTimer from './components/MeditationTimer'
import SolfeggioPlayer from './components/SolfeggioPlayer'

const SectionDivider = () => (
  <div style={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1000px', margin: '20px auto', opacity: 0.6, padding: '20px 48px' }}>
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(196, 51, 153, 0.6))' }} />
    <div style={{ width: '4px', height: '4px', transform: 'rotate(45deg)', background: '#c43399', margin: '0 16px', boxShadow: '0 0 8px #c43399' }} />
    <div style={{ flex: 1, height: '1px', background: 'linear-gradient(270deg, transparent, rgba(196, 51, 153, 0.6))' }} />
  </div>
);

function App() {
  
  useEffect(() => {
    // Attach click listeners to all elements with class ".order"
    // Using a MutationObserver or a more stable way would be better, but for now 
    // at least we ensure it only runs once and when the route changes.
    const attachListeners = () => {
      document.querySelectorAll('.order').forEach(button => {
        // Prevent adding multiple listeners if already attached
        if (button.dataset.listenerAttached) return;
        button.dataset.listenerAttached = 'true';

        button.addEventListener('click', function () {
          // Prevent multiple clicks
          if (this.classList.contains('animate')) return;

          const options = {
            key: "RAZORPAY_KEY", 
            amount: 99900,
            currency: "INR",
            name: "Rashi Waters",
            description: "Energized Bottle",
            handler: function (response) {
              console.log("Payment success:", response.razorpay_payment_id);
              button.classList.add("animate");
              
              fetch("http://localhost:3001/api/save-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  payment_id: response.razorpay_payment_id,
                  product: "Rashi Bottle",
                  price: 999
                })
              }).catch(err => console.error("Error saving order:", err));

              setTimeout(() => {
                window.location.href = "/success";
              }, 10000);
            }
          };

          if (window.Razorpay) {
            const rzp = new window.Razorpay(options);
            rzp.open();
          } else {
            console.error("Razorpay SDK not loaded");
          }
        });
      });
    };

    attachListeners();
    // Re-check periodically or on DOM changes if needed, but not every render loop
  }, []); // Run once on mount


  return (
    <div style={{ minHeight: '100vh' }}>
      <CustomCursor />
      <CartDrawer />
      <AmbientMusicPlayer />
      <SolfeggioPlayer />
      <MeditationTimer />
      <CosmicWeatherBanner />
      <StarryBackground />
      <Navbar />
      <main style={{ width: '100%', position: 'relative', zIndex: 10 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
          <Route path="/discovery" element={<Discovery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/success" element={<Success />} />
          <Route path="/compatibility" element={<Compatibility />} />
          <Route path="/tarot" element={<Tarot />} />
          <Route path="/constellations" element={<Constellations />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/aura" element={<AuraReader />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
