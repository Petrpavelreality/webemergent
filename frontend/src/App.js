import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [soldCount, setSoldCount] = useState(0);
  const [yearsCount, setYearsCount] = useState(0);
  const [isVisible, setIsVisible] = useState({});

  const heroWords = ['důvěryhodný', 'zkušený', 'profesionální', 'spolehlivý'];
  const statsRef = useRef(null);

  // Typing animation for hero text
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTyping(false);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % heroWords.length);
        setIsTyping(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: true
          }));
        }
      });
    }, observerOptions);

    // Observe all animated elements
    const elements = document.querySelectorAll('[data-animate]');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Counter animation for stats
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target === statsRef.current) {
          // Animate sold count
          let start = 0;
          const duration = 2000;
          const startTime = performance.now();
          
          const animateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            setSoldCount(Math.floor(progress * 200));
            setYearsCount(Math.floor(progress * 8));
            
            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            }
          };
          
          requestAnimationFrame(animateCounter);
        }
      });
    }, { threshold: 0.5 });

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 overflow-x-hidden">
      {/* Floating Elements */}
      <div className="floating-elements">
        <div className="floating-circle floating-circle-1"></div>
        <div className="floating-circle floating-circle-2"></div>
        <div className="floating-circle floating-circle-3"></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg nav-scrolled' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold text-slate-800 logo-bounce">Realitní Expert</h2>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button onClick={() => scrollToSection('home')} className="nav-link">Domů</button>
                <button onClick={() => scrollToSection('about')} className="nav-link">O mně</button>
                <button onClick={() => scrollToSection('services')} className="nav-link">Služby</button>
                <button onClick={() => scrollToSection('references')} className="nav-link">Reference</button>
                <button onClick={() => scrollToSection('contact')} className="nav-link">Kontakt</button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`text-slate-700 hover:text-slate-900 focus:outline-none menu-button ${isMenuOpen ? 'active' : ''}`}
              >
                <svg className="h-6 w-6 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
          <div className="bg-white/95 backdrop-blur-lg border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('home')} className="mobile-nav-link">Domů</button>
              <button onClick={() => scrollToSection('about')} className="mobile-nav-link">O mně</button>
              <button onClick={() => scrollToSection('services')} className="mobile-nav-link">Služby</button>
              <button onClick={() => scrollToSection('references')} className="mobile-nav-link">Reference</button>
              <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Kontakt</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat parallax-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1664388899857-2af4be0e0d9a)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-transparent"></div>
        </div>
        
        {/* Animated particles */}
        <div className="particles">
          <div className="particle particle-1"></div>
          <div className="particle particle-2"></div>
          <div className="particle particle-3"></div>
          <div className="particle particle-4"></div>
          <div className="particle particle-5"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-morphism max-w-4xl mx-auto p-8 lg:p-12 hero-entrance">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Váš <span className={`text-gradient typing-text ${isTyping ? 'typing' : 'erasing'}`}>
                {heroWords[currentWordIndex]}
              </span><br />
              realitní partner<br />
              v Praze
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up">
              Specializuji se na prodej a nákup nemovitostí v Praze a Středočeském kraji. 
              S více než 8 lety zkušeností vám pomůžu najít váš vysněný domov.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center buttons-entrance">
              <button 
                onClick={() => scrollToSection('contact')}
                className="cta-button-primary pulse-animation"
              >
                Bezplatná konzultace
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="cta-button-secondary"
              >
                Moje služby
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="scroll-indicator">
            <div className="scroll-dot"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0" data-animate="slide-in-left" id="about-text">
              <h2 className={`section-title ${isVisible['about-text'] ? 'animate-slide-in-left' : ''}`}>O mně</h2>
              <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mb-8 ${isVisible['about-text'] ? 'animate-expand' : ''}`}></div>
              <p className={`text-lg text-gray-700 mb-6 leading-relaxed ${isVisible['about-text'] ? 'animate-fade-in-up delay-200' : ''}`}>
                Jsem zkušený realitní makléř s více než 8 lety praxe na pražském trhu s nemovitostmi. 
                Specializuji se na luxusní byty, rodinné domy a investiční příležitosti v Praze a okolí.
              </p>
              <p className={`text-lg text-gray-700 mb-8 leading-relaxed ${isVisible['about-text'] ? 'animate-fade-in-up delay-400' : ''}`}>
                Mou prioritou je poskytovat osobní přístup každému klientovi a zajistit, 
                aby proces koupě nebo prodeje nemovitosti byl co nejjednodušší a nejstresovější.
              </p>
              
              <div className="grid grid-cols-2 gap-6" ref={statsRef}>
                <div className={`stat-card counter-card ${isVisible['about-text'] ? 'animate-bounce-in delay-600' : ''}`}>
                  <div className="text-3xl font-bold text-blue-600 mb-2 counter-number">{soldCount}+</div>
                  <div className="text-gray-600">Úspěšných prodejů</div>
                </div>
                <div className={`stat-card counter-card ${isVisible['about-text'] ? 'animate-bounce-in delay-800' : ''}`}>
                  <div className="text-3xl font-bold text-blue-600 mb-2 counter-number">{yearsCount}+</div>
                  <div className="text-gray-600">Let zkušeností</div>
                </div>
              </div>
            </div>
            
            <div className="relative" data-animate="slide-in-right" id="about-image">
              <div className={`glass-morphism p-6 image-reveal ${isVisible['about-image'] ? 'animate-slide-in-right' : ''}`}>
                <img 
                  src="https://images.pexels.com/photos/8730042/pexels-photo-8730042.jpeg"
                  alt="Realitní makléř"
                  className="w-full h-96 object-cover rounded-lg hover-zoom"
                />
              </div>
              {/* Floating badge */}
              <div className={`absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-gold-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg floating-badge ${isVisible['about-image'] ? 'animate-bounce-in delay-1000' : ''}`}>
                ⭐ Top Makléř
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate="fade-in-up" id="services-header">
            <h2 className={`section-title ${isVisible['services-header'] ? 'animate-fade-in-up' : ''}`}>Moje služby</h2>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mx-auto mb-8 ${isVisible['services-header'] ? 'animate-expand delay-200' : ''}`}></div>
            <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${isVisible['services-header'] ? 'animate-fade-in-up delay-400' : ''}`}>
              Poskytuju kompletní realitní služby přizpůsobené vašim potřebám
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="service-card staggered-animation" data-animate="slide-in-up" id="service-1" style={{animationDelay: '0.1s'}}>
              <div className="service-icon floating-icon">🏠</div>
              <h3 className="text-xl font-semibold mb-4">Prodej nemovitostí</h3>
              <p className="text-gray-600 mb-6">
                Kompletní služby při prodeji vaší nemovitosti včetně ocenění, marketingu a vyřízení právních formalit.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="fade-in-item">• Tržní ocenění nemovitosti</li>
                <li className="fade-in-item">• Profesionální fotografie</li>
                <li className="fade-in-item">• Marketing a inzerce</li>
                <li className="fade-in-item">• Právní podpora</li>
              </ul>
            </div>

            <div className="service-card staggered-animation" data-animate="slide-in-up" id="service-2" style={{animationDelay: '0.2s'}}>
              <div className="service-icon floating-icon">🔍</div>
              <h3 className="text-xl font-semibold mb-4">Nákup nemovitostí</h3>
              <p className="text-gray-600 mb-6">
                Pomohu vám najít ideální nemovitost podle vašich představ a rozpočtu v Praze a okolí.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="fade-in-item">• Vyhledávání nemovitostí</li>
                <li className="fade-in-item">• Prohlídky s klientem</li>
                <li className="fade-in-item">• Vyjednávání ceny</li>
                <li className="fade-in-item">• Financování a hypotéky</li>
              </ul>
            </div>

            <div className="service-card staggered-animation" data-animate="slide-in-up" id="service-3" style={{animationDelay: '0.3s'}}>
              <div className="service-icon floating-icon">📊</div>
              <h3 className="text-xl font-semibold mb-4">Investiční poradenství</h3>
              <p className="text-gray-600 mb-6">
                Odborné poradenství pro investory hledající výnosné nemovitosti na pražském trhu.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li className="fade-in-item">• Analýza výnosnosti</li>
                <li className="fade-in-item">• Tržní trendy</li>
                <li className="fade-in-item">• Rizikové hodnocení</li>
                <li className="fade-in-item">• Portfolio strategie</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate="fade-in-up" id="portfolio-header">
            <h2 className={`section-title ${isVisible['portfolio-header'] ? 'animate-fade-in-up' : ''}`}>Realizované projekty</h2>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mx-auto mb-8 ${isVisible['portfolio-header'] ? 'animate-expand delay-200' : ''}`}></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="portfolio-card tilt-card" data-animate="zoom-in" id="portfolio-1">
              <div className="image-container">
                <img 
                  src="https://images.pexels.com/photos/20604661/pexels-photo-20604661.jpeg"
                  alt="Luxusní byt Praha"
                  className="w-full h-48 object-cover rounded-lg mb-4 hover-zoom"
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <span className="overlay-text">Detail projektu</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Luxusní byt - Praha 2</h3>
              <p className="text-gray-600 text-sm">4+1, 120 m², terasa, prodáno za 12.5 mil. Kč</p>
            </div>

            <div className="portfolio-card tilt-card" data-animate="zoom-in" id="portfolio-2">
              <div className="image-container">
                <img 
                  src="https://images.pexels.com/photos/8962806/pexels-photo-8962806.jpeg"
                  alt="Konzultace s klienty"
                  className="w-full h-48 object-cover rounded-lg mb-4 hover-zoom"
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <span className="overlay-text">Profesionální služby</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Profesionální přístup</h3>
              <p className="text-gray-600 text-sm">Každý klient dostává individuální péči a odborné poradenství</p>
            </div>

            <div className="portfolio-card tilt-card" data-animate="zoom-in" id="portfolio-3">
              <div className="image-container">
                <img 
                  src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg"
                  alt="Úspěšný prodej"
                  className="w-full h-48 object-cover rounded-lg mb-4 hover-zoom"
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <span className="overlay-text">Úspěšné transakce</span>
                  </div>
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">Spokojení klienti</h3>
              <p className="text-gray-600 text-sm">200+ úspěšně dokončených obchodů s nemovitostmi</p>
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="references" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16" data-animate="fade-in-up" id="references-header">
            <h2 className={`section-title ${isVisible['references-header'] ? 'animate-fade-in-up' : ''}`}>Co říkají klienti</h2>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mx-auto mb-8 ${isVisible['references-header'] ? 'animate-expand delay-200' : ''}`}></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial-card floating-card" data-animate="slide-in-up" id="testimonial-1" style={{animationDelay: '0.1s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 avatar-bounce">
                  <span className="text-blue-600 font-semibold">MN</span>
                </div>
                <div>
                  <h4 className="font-semibold">Martin Novák</h4>
                  <div className="text-yellow-400 stars-animation">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Vynikající přístup a profesionalita. Pomohl nám prodat byt v rekordním čase a za skvělou cenu. Určitě doporučujeme!"
              </p>
            </div>

            <div className="testimonial-card floating-card" data-animate="slide-in-up" id="testimonial-2" style={{animationDelay: '0.2s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 avatar-bounce">
                  <span className="text-blue-600 font-semibold">AK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Anna Kratochvílová</h4>
                  <div className="text-yellow-400 stars-animation">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Díky jeho odbornosti jsme našli náš vysněný domov. Byl trpělivý a vždy k dispozici pro naše otázky."
              </p>
            </div>

            <div className="testimonial-card floating-card" data-animate="slide-in-up" id="testimonial-3" style={{animationDelay: '0.3s'}}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 avatar-bounce">
                  <span className="text-blue-600 font-semibold">PH</span>
                </div>
                <div>
                  <h4 className="font-semibold">Petr Havel</h4>
                  <div className="text-yellow-400 stars-animation">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Skvělé investiční poradenství. Díky jeho radám jsem koupil nemovitost, která mi přináší výborný výnos."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-slate-800 text-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="contact-bg-animation"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16" data-animate="fade-in-up" id="contact-header">
            <h2 className={`text-4xl sm:text-5xl font-bold mb-4 ${isVisible['contact-header'] ? 'animate-fade-in-up' : ''}`}>Kontaktujte mě</h2>
            <div className={`w-24 h-1 bg-gradient-to-r from-blue-400 to-gold-400 mx-auto mb-8 ${isVisible['contact-header'] ? 'animate-expand delay-200' : ''}`}></div>
            <p className={`text-xl text-gray-300 max-w-3xl mx-auto ${isVisible['contact-header'] ? 'animate-fade-in-up delay-400' : ''}`}>
              Máte zájem o prodej, nákup nebo investici do nemovitosti? Ozvěte se mi pro bezplatnou konzultaci.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div data-animate="slide-in-left" id="contact-info">
              <h3 className={`text-2xl font-semibold mb-8 ${isVisible['contact-info'] ? 'animate-slide-in-left' : ''}`}>Spojte se se mnou</h3>
              
              <div className="space-y-6">
                <div className={`flex items-center contact-item ${isVisible['contact-info'] ? 'animate-slide-in-left delay-200' : ''}`}>
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4 className="font-semibold">Telefon</h4>
                    <p className="text-gray-300">+420 777 123 456</p>
                  </div>
                </div>

                <div className={`flex items-center contact-item ${isVisible['contact-info'] ? 'animate-slide-in-left delay-400' : ''}`}>
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">info@realitni-expert.cz</p>
                  </div>
                </div>

                <div className={`flex items-center contact-item ${isVisible['contact-info'] ? 'animate-slide-in-left delay-600' : ''}`}>
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4 className="font-semibold">Kancelář</h4>
                    <p className="text-gray-300">Wenceslas Square 1, Praha 1</p>
                  </div>
                </div>

                <div className={`flex items-center contact-item ${isVisible['contact-info'] ? 'animate-slide-in-left delay-800' : ''}`}>
                  <div className="contact-icon">⏰</div>
                  <div>
                    <h4 className="font-semibold">Pracovní doba</h4>
                    <p className="text-gray-300">Po-Pá: 9:00-18:00<br />So: 10:00-16:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`glass-morphism-dark p-8 form-container ${isVisible['contact-info'] ? 'animate-slide-in-right' : ''}`} data-animate="slide-in-right" id="contact-form">
              <h3 className="text-2xl font-semibold mb-6">Rychlý kontakt</h3>
              <form className="space-y-6">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Vaše jméno"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300 animated-input"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="email"
                    placeholder="Váš email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300 animated-input"
                  />
                </div>
                <div className="input-group">
                  <input
                    type="tel"
                    placeholder="Váš telefon"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300 animated-input"
                  />
                </div>
                <div className="input-group">
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white animated-input">
                    <option value="">Typ služby</option>
                    <option value="prodej">Prodej nemovitosti</option>
                    <option value="nakup">Nákup nemovitosti</option>
                    <option value="investice">Investiční poradenství</option>
                    <option value="oceneni">Ocenění nemovitosti</option>
                  </select>
                </div>
                <div className="input-group">
                  <textarea
                    rows="4"
                    placeholder="Vaše zpráva..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300 resize-none animated-input"
                  ></textarea>
                </div>
                <button type="submit" className="cta-button-primary w-full submit-button">
                  <span>Odeslat zprávu</span>
                  <div className="button-loading">
                    <div class="loading-dots">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div data-animate="fade-in-up" id="footer-1">
              <h3 className={`text-2xl font-bold mb-4 ${isVisible['footer-1'] ? 'animate-fade-in-up' : ''}`}>Realitní Expert</h3>
              <p className={`text-gray-400 mb-4 ${isVisible['footer-1'] ? 'animate-fade-in-up delay-200' : ''}`}>
                Váš důvěryhodný partner pro nemovitosti v Praze a Středočeském kraji.
              </p>
              <div className={`flex space-x-4 ${isVisible['footer-1'] ? 'animate-fade-in-up delay-400' : ''}`}>
                <a href="#" className="text-gray-400 hover:text-white transition-colors social-hover">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors social-hover">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors social-hover">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div data-animate="fade-in-up" id="footer-2">
              <h4 className={`text-lg font-semibold mb-4 ${isVisible['footer-2'] ? 'animate-fade-in-up' : ''}`}>Rychlé odkazy</h4>
              <ul className={`space-y-2 text-gray-400 ${isVisible['footer-2'] ? 'animate-fade-in-up delay-200' : ''}`}>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors footer-link">O mně</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors footer-link">Služby</button></li>
                <li><button onClick={() => scrollToSection('references')} className="hover:text-white transition-colors footer-link">Reference</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors footer-link">Kontakt</button></li>
              </ul>
            </div>
            
            <div data-animate="fade-in-up" id="footer-3">
              <h4 className={`text-lg font-semibold mb-4 ${isVisible['footer-3'] ? 'animate-fade-in-up' : ''}`}>Oblasti působnosti</h4>
              <ul className={`space-y-2 text-gray-400 ${isVisible['footer-3'] ? 'animate-fade-in-up delay-200' : ''}`}>
                <li className="location-item">Praha 1 - Staré Město</li>
                <li className="location-item">Praha 2 - Nové Město</li>
                <li className="location-item">Praha 3 - Vinohrady</li>
                <li className="location-item">Praha 4 - Nusle</li>
                <li className="location-item">Středočeský kraj</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p className="fade-in-final">&copy; 2025 Realitní Expert. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;