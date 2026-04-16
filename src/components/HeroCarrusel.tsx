"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
    id: 1,
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?q=80&w=1600&auto=format&fit=crop",
    title: "COMBOS",
    subtitle: "Aprovecha todas nuestros combos",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1600&auto=format&fit=crop",
    title: "HAMBURGUESAS",
    subtitle: "El verdadero sabor casero",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1600&auto=format&fit=crop",
    title: "PIZZAS",
    subtitle: "Artesanales y crujientes",
  },
];

export default function HeroCarrusel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: 'clamp(300px, 50vh, 500px)', 
      overflow: 'hidden',
      backgroundColor: '#111',
      marginTop: '0px', 
    }}>
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: index === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out', 
            zIndex: index === current ? 1 : 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.7) 100%)',
            zIndex: 1,
          }} />

          {/* Contenedor de Texto Optimizado */}
          <div style={{
            position: 'relative',
            zIndex: 2, 
            color: 'white',
            textAlign: 'center',
            padding: '0 20px',
            width: '100%',
            maxWidth: '800px',
          }}>
            <h1 style={{
              fontSize: 'clamp(1.5rem, 8vw, 3.5rem)', 
              fontWeight: '900',
              letterSpacing: '-1px',
              margin: 0,
              textShadow: '2px 2px 15px rgba(0,0,0,0.9)',
              lineHeight: '1.1',
            }}>
              {slide.title}
            </h1>
            <p style={{
              fontSize: 'clamp(0.9rem, 4vw, 1.4rem)',
              fontWeight: '400',
              marginTop: '10px',
              textShadow: '1px 1px 5px rgba(0,0,0,0.8)',
              opacity: 0.95,
              padding: '0 10%', 
            }}>
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {/* Botones de Navegación */}
      <button 
        onClick={prevSlide} 
        style={arrowButtonStyle({ left: '10px' })}
      >
        <ChevronLeft size={20} />
      </button>
      <button 
        onClick={nextSlide} 
        style={arrowButtonStyle({ right: '10px' })}
      >
        <ChevronRight size={20} />
      </button>

      {/* Indicadores Subidos */}
      <div style={{
        position: 'absolute',
        bottom: '40px', 
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        zIndex: 10,
      }}>
        {slides.map((slide, index) => (
          <div
            key={`slide-${slide.id}`}
            style={{
              width: index === current ? 'block' : 'none',
              height: '8px',
              borderRadius: '10px',
              backgroundColor: index === current ? '#FF5722' : 'rgba(255,255,255,0.5)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

const arrowButtonStyle = (pos: { left?: string; right?: string }): React.CSSProperties => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)',
  color: 'white',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '50%',
  width: '38px',
  height: '38px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
  ...pos,
});