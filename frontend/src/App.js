import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h2 className="text-2xl font-bold text-slate-800">Realitní Expert</h2>
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
                className="text-slate-700 hover:text-slate-900 focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-lg border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <button onClick={() => scrollToSection('home')} className="mobile-nav-link">Domů</button>
              <button onClick={() => scrollToSection('about')} className="mobile-nav-link">O mně</button>
              <button onClick={() => scrollToSection('services')} className="mobile-nav-link">Služby</button>
              <button onClick={() => scrollToSection('references')} className="mobile-nav-link">Reference</button>
              <button onClick={() => scrollToSection('contact')} className="mobile-nav-link">Kontakt</button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1664388899857-2af4be0e0d9a)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-800/70 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="glass-morphism max-w-4xl mx-auto p-8 lg:p-12">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Váš důvěryhodný<br />
              <span className="text-gradient">realitní partner</span><br />
              v Praze
            </h1>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto leading-relaxed">
              Specializuji se na prodej a nákup nemovitostí v Praze a Středočeském kraji. 
              S více než 8 lety zkušeností vám pomůžu najít váš vysněný domov.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => scrollToSection('contact')}
                className="cta-button-primary"
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
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <div className="mb-12 lg:mb-0">
              <h2 className="section-title">O mně</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mb-8"></div>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Jsem zkušený realitní makléř s více než 8 lety praxe na pražském trhu s nemovitostmi. 
                Specializuji se na luxusní byty, rodinné domy a investiční příležitosti v Praze a okolí.
              </p>
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                Mou prioritou je poskytovat osobní přístup každému klientovi a zajistit, 
                aby proces koupě nebo prodeje nemovitosti byl co nejjednodušší a nejstresovější.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="stat-card">
                  <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                  <div className="text-gray-600">Úspěšných prodejů</div>
                </div>
                <div className="stat-card">
                  <div className="text-3xl font-bold text-blue-600 mb-2">8+</div>
                  <div className="text-gray-600">Let zkušeností</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="glass-morphism p-6">
                <img 
                  src="https://images.pexels.com/photos/8730042/pexels-photo-8730042.jpeg"
                  alt="Realitní makléř"
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Moje služby</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Poskytuju kompletní realitní služby přizpůsobené vašim potřebám
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3 className="text-xl font-semibold mb-4">Prodej nemovitostí</h3>
              <p className="text-gray-600 mb-6">
                Kompletní služby při prodeji vaší nemovitosti včetně ocenění, marketingu a vyřízení právních formalit.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Tržní ocenění nemovitosti</li>
                <li>• Profesionální fotografie</li>
                <li>• Marketing a inzerce</li>
                <li>• Právní podpora</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">🔍</div>
              <h3 className="text-xl font-semibold mb-4">Nákup nemovitostí</h3>
              <p className="text-gray-600 mb-6">
                Pomohu vám najít ideální nemovitost podle vašich představ a rozpočtu v Praze a okolí.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Vyhledávání nemovitostí</li>
                <li>• Prohlídky s klientem</li>
                <li>• Vyjednávání ceny</li>
                <li>• Financování a hypotéky</li>
              </ul>
            </div>

            <div className="service-card">
              <div className="service-icon">📊</div>
              <h3 className="text-xl font-semibold mb-4">Investiční poradenství</h3>
              <p className="text-gray-600 mb-6">
                Odborné poradenství pro investory hledající výnosné nemovitosti na pražském trhu.
              </p>
              <ul className="text-sm text-gray-500 space-y-2">
                <li>• Analýza výnosnosti</li>
                <li>• Tržní trendy</li>
                <li>• Rizikové hodnocení</li>
                <li>• Portfolio strategie</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Realizované projekty</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="portfolio-card">
              <img 
                src="https://images.pexels.com/photos/20604661/pexels-photo-20604661.jpeg"
                alt="Luxusní byt Praha"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Luxusní byt - Praha 2</h3>
              <p className="text-gray-600 text-sm">4+1, 120 m², terasa, prodáno za 12.5 mil. Kč</p>
            </div>

            <div className="portfolio-card">
              <img 
                src="https://images.pexels.com/photos/8962806/pexels-photo-8962806.jpeg"
                alt="Konzultace s klienty"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Profesionální přístup</h3>
              <p className="text-gray-600 text-sm">Každý klient dostává individuální péči a odborné poradenství</p>
            </div>

            <div className="portfolio-card">
              <img 
                src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg"
                alt="Úspěšný prodej"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold mb-2">Spokojení klienti</h3>
              <p className="text-gray-600 text-sm">200+ úspěšně dokončených obchodů s nemovitostmi</p>
            </div>
          </div>
        </div>
      </section>

      {/* References Section */}
      <section id="references" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">Co říkají klienti</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-gold-500 mx-auto mb-8"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">MN</span>
                </div>
                <div>
                  <h4 className="font-semibold">Martin Novák</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Vynikající přístup a profesionalita. Pomohl nám prodat byt v rekordním čase a za skvělou cenu. Určitě doporučujeme!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">AK</span>
                </div>
                <div>
                  <h4 className="font-semibold">Anna Kratochvílová</h4>
                  <div className="text-yellow-400">★★★★★</div>
                </div>
              </div>
              <p className="text-gray-600 italic">
                "Díky jeho odbornosti jsme našli náš vysněný domov. Byl trpělivý a vždy k dispozici pro naše otázky."
              </p>
            </div>

            <div className="testimonial-card">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <span className="text-blue-600 font-semibold">PH</span>
                </div>
                <div>
                  <h4 className="font-semibold">Petr Havel</h4>
                  <div className="text-yellow-400">★★★★★</div>
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
      <section id="contact" className="py-20 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">Kontaktujte mě</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-gold-400 mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Máte zájem o prodej, nákup nebo investici do nemovitosti? Ozvěte se mi pro bezplatnou konzultaci.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-8">Spojte se se mnou</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="contact-icon">📞</div>
                  <div>
                    <h4 className="font-semibold">Telefon</h4>
                    <p className="text-gray-300">+420 777 123 456</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <p className="text-gray-300">info@realitni-expert.cz</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="contact-icon">📍</div>
                  <div>
                    <h4 className="font-semibold">Kancelář</h4>
                    <p className="text-gray-300">Wenceslas Square 1, Praha 1</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="contact-icon">⏰</div>
                  <div>
                    <h4 className="font-semibold">Pracovní doba</h4>
                    <p className="text-gray-300">Po-Pá: 9:00-18:00<br />So: 10:00-16:00</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-morphism-dark p-8">
              <h3 className="text-2xl font-semibold mb-6">Rychlý kontakt</h3>
              <form className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Vaše jméno"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Váš email"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Váš telefon"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300"
                  />
                </div>
                <div>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-white">
                    <option value="">Typ služby</option>
                    <option value="prodej">Prodej nemovitosti</option>
                    <option value="nakup">Nákup nemovitosti</option>
                    <option value="investice">Investiční poradenství</option>
                    <option value="oceneni">Ocenění nemovitosti</option>
                  </select>
                </div>
                <div>
                  <textarea
                    rows="4"
                    placeholder="Vaše zpráva..."
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300 resize-none"
                  ></textarea>
                </div>
                <button type="submit" className="cta-button-primary w-full">
                  Odeslat zprávu
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
            <div>
              <h3 className="text-2xl font-bold mb-4">Realitní Expert</h3>
              <p className="text-gray-400 mb-4">
                Váš důvěryhodný partner pro nemovitosti v Praze a Středočeském kraji.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Rychlé odkazy</h4>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white transition-colors">O mně</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white transition-colors">Služby</button></li>
                <li><button onClick={() => scrollToSection('references')} className="hover:text-white transition-colors">Reference</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white transition-colors">Kontakt</button></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Oblasti působnosti</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Praha 1 - Staré Město</li>
                <li>Praha 2 - Nové Město</li>
                <li>Praha 3 - Vinohrady</li>
                <li>Praha 4 - Nusle</li>
                <li>Středočeský kraj</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Realitní Expert. Všechna práva vyhrazena.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;