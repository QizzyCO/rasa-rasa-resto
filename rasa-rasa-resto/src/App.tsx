import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu as MenuIcon, 
  X, 
  Star, 
  Clock, 
  Users, 
  CreditCard, 
  MapPin, 
  Phone, 
  ChevronRight,
  Instagram,
  Facebook,
  Twitter,
  ArrowUp,
  MessageCircle
} from 'lucide-react';

// --- Types ---
interface MenuItem {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  initial: string;
}

// --- Data ---
const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    name: "Nasi Goreng Spesial",
    price: "IDR 35k",
    description: "Wok-fried rice with chicken, prawn, and signature spices.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDSnTrtOUW17pDbtC1mMRijWLId3WFvxrQv1ZS0cwpM9Cgz7Si_3NeS4mePFVBuFou9tAdVjUZ76PAqeQHf42pAL-pQaocb6XjSoAQGnNSIU7t9MwDAWur37F1excoXgMEQsEAHtbJ-olvIOFk_ngryhH_jE4tVDMkIIEANWKF-xXJ342tGhYahKV4YJ6pfWvl5JB9uQ28ynugbvjI0lVtcB6XZRyv0zbV3vnm3wW5HWc-Dbs9ZtpnDjhogvMuGXi-sxvfq8E7b0JyH",
    category: "main"
  },
  {
    id: 2,
    name: "Palm Sugar Latte",
    price: "IDR 25k",
    description: "House blend espresso with organic palm sugar and creamy milk.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdAwOhFLigIgX1k9ZcfBkZauZdpmDb_tc_zcPhXoV9TLIdWDlT6uB_3KQuqKQggoJhY9_UE4bmtbYtqyHoxaUVbJeZiSTQlHSWmWgMQdMNn-yjJU5Xo4CYBKAQSsywx5vzVNqXmKDl099gr_TJZbXMRAESuko2bIJ-aTL34JMDX35tbKldrcu3oI6mTrVBHRbdNm4z75M7yvyC2Z9-Zo9t36Nur3wnK-ACESPZKVI2QfJkWCFpBuKWXx7hQe9UXVadhEDeor3UbDcD",
    category: "drinks"
  },
  {
    id: 3,
    name: "Classic Beef Burger",
    price: "IDR 48k",
    description: "Juicy beef patty, cheddar, and caramelized onions on brioche.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCpWYBD4dbZzyPgePBaZWHKcWC4HwGF-_O855FUtPOaWpIL1E4tjYUYf-p44smJdl6CE1PCbO5qx4HRiipsVWIomG_jHYfOjsQ92zd3hRquJLU_Oak1_nMb-vg15l5lammYL7KGWaMIWOUpgn_5h4rMKuJQuNQ5uCMoKz4-IyK6zrEWzOr2jmM1DYOAfqENkSWSBD5kMLYk4Y6H8DqL8fjsODs4S-vGoJh7MmuOlE2pF5QGsYWITJEsf4dKOwe8-hGFYSPbsByuEfxv",
    category: "fast"
  },
  {
    id: 4,
    name: "Chicken Strips & Fries",
    price: "IDR 28k",
    description: "Handmade chicken strips served with smile fries.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAfQBVLJ4Pae2yZbS_VXRrdCjganZLR5NY0Gt2v4TB6tGpj2-GBt1f3G7ezGz4Z5e7jPJ4kp6O9m_qgex3t86N8AEfxSYyYrz9qFu3rjHoJu7FYl3S2OvghGBjUwgimJYKr8RrRuwiNis5c6Rl3MdWJLbiSV8Xy7MD6_toyFryp_P4eDsVOHkqf_EsVAU91epDwgVSSlXQphxaKD85lLViRJJwjwYGf8gRdYBXKBCm8VIFlAAYUui3O40u3au8yNKmmfhEwCmR2BTPi",
    category: "kids"
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Mengapa Memilih Makanan Halal Itu Penting untuk Kesehatan",
    excerpt: "Temukan manfaat pengolahan makanan halal dan mengapa kami mengutamakan kualitas di setiap gigitan.",
    category: "Lifestyle",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAGh9wU7B076dzDe5o248PuH87mKn59fZ5mJYADwid94RFUrAxic7ZrOr2_WhiEqVFxkrT-EdyVOQEos4hflg9fVZ7rrNZVHvReidYMOxhcM6kFu_rGNebKJBnpy-tMIY_ky_YhIiBvfe7nSOTrR6lxB_PU0gkzf7r2KGWGLAZGv_iI9pPKxG_LGgmV4pADEcVDlJH7fIwP0DdpV1fs1Q_ILUXzk2v9A4RqJkNoisK8S9yrZVFZtMg-PT64wu2jRzfUqUiMZiGOL7ht"
  },
  {
    id: 2,
    title: "Tempat Makan Siang Terbaik di Karanganyar",
    excerpt: "Cari tahu mengapa Rasa Rasa adalah rekomendasi utama untuk makan siang bisnis atau istirahat cepat Anda.",
    category: "Places",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuByjoorVfdhNVoY6UEX6LjlTRfhy2jPwEtehCE4YuesHsxwQ32WxFT-JusGxEYMjk6NavH7cTeUb-OuVfO6V2RzjGkVIGFpcczAE40VPilyma4yVVck4fqehmqLSHzMU01Vrtor4axCXNJPooHdOQWg5fSd_VYnWz-YyKV1lEJB2SRpF8Js2fvXEBsACQwLVU2KkOY4Rbji82rHoAvHFmxoOuQaCb9muas_yIyTPPQzupEilOvpy-fpUhxWdh4kClCdxTaOodDZYerX"
  },
  {
    id: 3,
    title: "Kegembiraan Makan Malam Keluarga di Akhir Pekan",
    excerpt: "Ciptakan kenangan saat makan. Jelajahi fasilitas ramah keluarga dan menu spesial kami.",
    category: "Culture",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuArEgI5ZeMJE39NSQbOPuo7I4okRtymJZ39Ehb-GfqY6ZPSjraDnxARWv8YqT994SPtyzyrSvHC-cNoFHjLqX28VJs8AdlXqQBkc1u_rDEOw9v-3i_vLnqEAR5wqNyncl5PmewGmT1KaFWeXYxbllxmEuwpo_zE2_0-k9G_TDOE0fCKxLifVqN_oZv5TTNo7TG8EsFuJ1dsAvj31bZL9nbhTY0TmjPC6npBTwAeKBRsIxUvaMJnEU8okTdtJTDWRgTaDi061ZMfiEBY"
  }
];

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Andi Pratama",
    role: "Local Guide",
    content: "Kualitas makanannya luar biasa, terutama Nasi Gorengnya. Suasananya sangat ramah keluarga dan nyaman untuk mengobrol lama.",
    initial: "A"
  },
  {
    id: 2,
    name: "Siska Wijaya",
    role: "Coffee Enthusiast",
    content: "Tempat yang bagus untuk bekerja sambil minum kopi. Palm sugar latte-nya wajib dicoba. Wifi cepat dan staf yang ramah.",
    initial: "S"
  },
  {
    id: 3,
    name: "Maya Sari",
    role: "Family Guest",
    content: "Suka area taman bermain untuk anak-anak. Ibu-ibu bisa menikmati teh sementara anak-anak bermain dengan aman. Sangat direkomendasikan!",
    initial: "M"
  }
];

const GALLERY_IMAGES = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBhEwt_gV4jMcy33P6QyOfNJFby6ZMmNbUY5VOKbqyiwYSweKalnccspf9sSBWZrrjWjZ3e8zMbFeQd9YkqZ7qvchky3fvEn6ame-1tbXSRZOZs0AcDsvmL0YGhXorx4BFWn9dQaH35jbCgKlKMRsDLEkPj8zWx9icEz9Xwq3w-PgOO25Chy4lPlJR9L2i-K-bngMDor_eUCaJgly0WHOsutn_ReXTmT_kE2MDOa6NMDPbTKo3IjDDASxTPnxiFgZ7kXB_5I3Ng4Bo_",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAALm4ERbwEQOk_p0nrkawsE3o01AWZbaukvh122r-_7T4e8RZOP7hxsMctfe5YFTrrIQLDIpFqpTH7D7BYezAGfx9XdZGik-mQGeWJVPRWpdKgIIYLiJUp7fgf8JqJY4TEMYMCT23PT7X1OslNvx3cpb1E7kg6HwyjDz6YlzYSIIbp0sqviWYOC8AeRkIGRYzJpqPqsEVA4MatxZHpr5NaHh0BKGHfsgZRG22qjB47yA6uUNS57OZVFx-gLT23Pqt6gEvfEQm4LI9r",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCuYP2XTPiVB95NMFqh2qIbpGRxv3_MS0SJGXeYz5bGzysOLxOA9-YCNQO0WLKGuCDMnbzipjhz7Yk6NoQnSDGwRnL3-7geYcgA_TrjXWYptCeJlO9TQ_QxgIa6h7q1J75QIaXk0h0uekdaiAZEXSMBMrPsLLVkNoDFUnR_2n3jCCRsuoCq84zfhaRS7O_6pKpVgpkERGnEGZaOiPx1eDFGsYZbHx5OLaOpTAx0H6OPwp-ifqsRr_64OqlHVjXPDJZ0SS-L5Z8SQhdW",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuC2jb_0utUuWbb9n8onDtHjKJR2sM-fj_apH5Gj2TSdaNaWYR17htCqY8gwb0rA5N1YLHCXZlONw1ND_SQNlgWMh0CQVVB_MO_CTsdNEWVbEE8fOtqOBD70qaR8M3HenqHzdr4dUJSxArlwaqbqydJYiBpwpQyKB5Z4Y1x_uxJCczDGMuPb-sw5cVIHW6bAg2tY-2ZqArNlLK0IKrHILTQJpn3PI7pTKhd5_NS8b44Lm8nZ2M9ieW_NJXitpW0aJyV465JD4Q6k3w8B",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBVIDANIzcZ8cv7BBT2N2ss4HSl-V8LyI638Me_RGyOkBH9CfQH4roFUQzfu5e6M6iydgnl_STv6LD_TaGkCk6MGRR1nUq9MvZ1Z-LbuW96-8cxRpSVXtnF0Td1-o2OKR_9aYIkCISdvVM_2heuDNYi12adVcjTyfjAe-auGDHaNxJvgzjzXuW6RucZUze6L41YBmVFG0C5KHU14DHf-E-cyU2oKp5fWdeNN07pzRw7rqDo2Tg-nwZIoJeOxkD9n8SJ686mNRBxhGq4"
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Beranda', href: '#home' },
    { name: 'Tentang', href: '#about' },
    { name: 'Menu', href: '#menu' },
    { name: 'Galeri', href: '#gallery' },
    { name: 'Artikel', href: '#articles' },
    { name: 'Ulasan', href: '#testimonials' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-dark/95 py-2 shadow-lg' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white drop-shadow-md flex items-center gap-2">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/20">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Bor-M0-f-R9xvRUjCENbRF5KXsPkQ9UUZw&s" 
              alt="Logo" 
              className="w-full h-full object-cover rounded-full scale-110" 
            />
          </div>
          <span className="hidden sm:inline">Rasa Rasa</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex space-x-8 items-center text-sm font-medium uppercase tracking-wider text-white">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="hover:text-primary transition-colors">
              {link.name}
            </a>
          ))}
          <a 
            href="https://api.whatsapp.com/send?phone=6281328904277" 
            target="_blank" 
            className="bg-primary hover:bg-orange-700 text-white px-6 py-2 rounded-md transition-all"
          >
            Pesan Sekarang
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={32} /> : <MenuIcon size={32} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden absolute top-0 left-0 w-full h-screen bg-dark/95 flex flex-col items-center justify-center space-y-8 text-2xl text-white"
          >
            <button className="absolute top-6 right-6 text-white" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={40} />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="https://api.whatsapp.com/send?phone=6281328904277" 
              target="_blank" 
              className="bg-primary text-white px-8 py-3 rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Pesan Sekarang
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-PXm2oylT0tw1A4c3mglfMletjvnpwaR8bw&s')" }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-4 max-w-4xl"
      >
        <h4 className="text-primary font-semibold tracking-widest uppercase mb-4">Selamat Datang di Rasa Rasa</h4>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
          Cita Rasa Otentik, <br /> Pengalaman Bersantap yang Nyaman
        </h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#menu" className="bg-primary text-white px-10 py-4 rounded-md font-semibold hover:scale-105 transition-transform text-lg">
            Lihat Menu
          </a>
          <a href="#contact" className="glass-effect text-white border border-white/30 px-10 py-4 rounded-md font-semibold hover:bg-white/10 transition-all text-lg">
            Pesan Sekarang
          </a>
        </div>
      </motion.div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white animate-bounce">
        <ArrowUp className="rotate-180" size={24} />
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBaqR9LA3gE9FXg6wAn2_0Q2T3t_NsfTQd_81nt0vHVfamTZHBsdYbkFGY_LZS_oioAk0w-IZyI28cSoMGNWpO5C2J3ZrgBmbSvUR6KR3NgNUYtiRBPF5G4wtWA5gE7m1S9JHQuNQZhLepnrs1FxN5PStZRnJb_Z1iMjpj_c4zwW3cEW_0esBjaUMl8xb5exWLPC8Tgqo3_HKufYONH-rSr4P1m0kWOEXIZ0yvBi2qx8LyosLYlPwHGwXwu4VMru8um4xuGoLOViUrl" 
                alt="Restaurant Interior" 
                className="rounded-lg shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-8 -right-8 glass-effect bg-primary/90 p-8 rounded-lg hidden md:block">
                <p className="text-4xl font-bold text-white">4.3</p>
                <p className="text-white/80 text-sm uppercase tracking-widest">Rating Google</p>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl font-bold mb-6 text-dark">Perjalanan Kuliner di Jantung Colomadu</h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Rasa Rasa Resto lebih dari sekadar tempat makan; ini adalah tempat perlindungan bagi pecinta makanan yang mencari rasa otentik dan suasana yang nyaman. Kami bangga menggunakan bahan-bahan segar yang bersumber secara lokal untuk menciptakan hidangan yang beresonansi dengan tradisi.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: <Clock />, title: "Layanan Cepat", desc: "Disajikan segar dengan cepat" },
                { icon: <Users />, title: "Ramah Keluarga", desc: "Cocok untuk berkumpul" },
                { icon: <CreditCard />, title: "Pembayaran Non-Tunai", desc: "Semua kartu diterima" },
                { icon: <Star />, title: "Kualitas Premium", desc: "Bahan pilihan terbaik" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary flex items-center justify-center rounded-full text-primary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h5 className="font-bold">{item.title}</h5>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'main', name: 'Hidangan Utama' },
    { id: 'fast', name: 'Makanan Cepat Saji' },
    { id: 'drinks', name: 'Kopi & Teh' },
    { id: 'kids', name: 'Menu Anak' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section id="menu" className="py-24 bg-[#f4f1ed]">
      <div className="container mx-auto px-4 text-center mb-16">
        <h4 className="text-primary font-bold tracking-widest uppercase mb-2">Menu Unggulan Kami</h4>
        <h2 className="text-4xl font-bold text-dark">Jelajahi Menu Kami</h2>
        <div className="w-20 h-1 bg-primary mx-auto mt-4"></div>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-2 rounded-full border-2 border-primary font-medium transition-all ${
                activeCategory === cat.id 
                  ? 'bg-primary text-white' 
                  : 'text-primary hover:bg-primary hover:text-white'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg overflow-hidden shadow-lg group hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="h-56 overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-xl font-bold">{item.name}</h4>
                    <span className="text-primary font-bold">{item.price}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{item.description}</p>
                  <button className="w-full py-2 bg-secondary text-dark font-medium rounded-md hover:bg-primary hover:text-white transition-colors">
                    Tambah ke Pesanan
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 mb-12 text-center">
        <h2 className="text-4xl font-bold text-dark">Pengalaman Visual</h2>
        <p className="text-gray-500 mt-4">Intip suasana nyaman dan kreasi lezat kami</p>
      </div>
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {GALLERY_IMAGES.map((img, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`relative overflow-hidden group rounded-lg ${idx === 1 ? 'md:row-span-2 h-full' : 'h-64 md:h-80'} ${idx === 4 ? 'md:col-span-2' : ''}`}
          >
            <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute inset-0 bg-dark/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <p className="text-white font-medium">Rasa Rasa Resto</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const Blog = () => {
  return (
    <section id="articles" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h4 className="text-primary font-bold uppercase tracking-widest mb-2">Blog Kami</h4>
            <h2 className="text-4xl font-bold">Cerita Terbaru</h2>
          </div>
          <a href="#" className="text-primary font-bold hover:underline flex items-center gap-2">
            Lihat Semua Artikel <ChevronRight size={20} />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-shadow">
              <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
              <div className="p-6">
                <span className="text-xs font-bold text-primary uppercase">{post.category}</span>
                <h3 className="text-xl font-bold mt-2 mb-3">{post.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{post.excerpt}</p>
                <a href="#" className="text-dark font-semibold text-sm hover:text-primary transition-colors">Baca Selengkapnya</a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 bg-dark text-white overflow-hidden">
      <div className="container mx-auto px-4 text-center mb-16">
        <div className="flex justify-center mb-4">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill={i < 4 ? "currentColor" : "none"} />
            ))}
          </div>
        </div>
        <h2 className="text-4xl font-bold mb-4">Apa Kata Tamu Kami</h2>
        <p className="text-white/60">Berdasarkan 44 ulasan Google dengan rating 4.3/5</p>
      </div>
      <div className="relative">
        <div className="marquee-track gap-8">
          {/* First set of items */}
          {TESTIMONIALS.map((t) => (
            <div key={`first-${t.id}`} className="min-w-[300px] md:min-w-[400px] bg-white/5 border border-white/10 p-8 rounded-lg">
              <p className="text-lg italic mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-white">
                  {t.initial}
                </div>
                <div>
                  <h5 className="font-bold uppercase tracking-wide">{t.name}</h5>
                  <p className="text-xs text-primary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {TESTIMONIALS.map((t) => (
            <div key={`second-${t.id}`} className="min-w-[300px] md:min-w-[400px] bg-white/5 border border-white/10 p-8 rounded-lg">
              <p className="text-lg italic mb-6">"{t.content}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold text-white">
                  {t.initial}
                </div>
                <div>
                  <h5 className="font-bold uppercase tracking-wide">{t.name}</h5>
                  <p className="text-xs text-primary">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Gradient overlays for smooth edges */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent z-10 pointer-events-none"></div>
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent z-10 pointer-events-none"></div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold mb-8">Hubungi Kami</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1" />
                <div>
                  <h5 className="font-bold">Alamat</h5>
                  <p className="text-gray-500">Jl. Adi Sumarmo No.329, Colomadu, Karanganyar</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1" />
                <div>
                  <h5 className="font-bold">Telepon</h5>
                  <p className="text-gray-500">0812-2722-1212</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1" />
                <div>
                  <h5 className="font-bold">Jam Operasional</h5>
                  <p className="text-gray-500">Mon - Sun: 10:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
            <div className="h-64 rounded-lg overflow-hidden shadow-md border border-gray-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3955.334645224385!2d110.7719463!3d-7.5385633!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a169999999999%3A0x608e09e1e3e7f9e8!2sJl.%20Adi%20Sumarmo%20No.329%2C%20Colomadu%2C%20Karanganyar!5e0!3m2!1sen!2sid!4v1620000000000!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-secondary/20 p-8 rounded-lg"
          >
            <h3 className="text-2xl font-bold mb-6">Reservasi Online</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" placeholder="Nama Anda" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Nomor Telepon</label>
                  <input type="tel" className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" placeholder="0812..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jumlah Tamu</label>
                <select className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary">
                  <option>2 Orang</option>
                  <option>4 Orang</option>
                  <option>6+ Orang</option>
                  <option>Grup Besar / Acara</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Tanggal</label>
                  <input type="date" className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Waktu</label>
                  <input type="time" className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Catatan Khusus</label>
                <textarea className="w-full rounded-md border-gray-300 focus:ring-primary focus:border-primary" placeholder="Batasan diet atau permintaan khusus" rows={3}></textarea>
              </div>
              <button className="w-full py-4 bg-primary text-white font-bold rounded-md hover:bg-orange-700 transition-colors shadow-lg">
                Konfirmasi Reservasi
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <a href="#" className="text-2xl font-bold tracking-tighter mb-6 block flex items-center gap-2">
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center overflow-hidden border border-white/10">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Bor-M0-f-R9xvRUjCENbRF5KXsPkQ9UUZw&s" 
                alt="Logo" 
                className="w-full h-full object-cover rounded-full scale-110" 
              />
            </div>
            <span>Rasa Rasa</span>
          </a>
          <p className="text-white/60 mb-6 text-sm">
            Menyediakan pengalaman bersantap yang luar biasa sejak 2018. Kami percaya pada makanan yang menyatukan orang-orang.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter size={20} />
            </a>
          </div>
        </div>
        <div>
          <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Navigasi</h5>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><a href="#home" className="hover:text-primary transition-colors">Beranda</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">Tentang Kami</a></li>
            <li><a href="#menu" className="hover:text-primary transition-colors">Menu Kami</a></li>
            <li><a href="#gallery" className="hover:text-primary transition-colors">Galeri</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Layanan</h5>
          <ul className="space-y-4 text-white/60 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
            <li><a href="#contact" className="hover:text-primary transition-colors">Reservasi</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Bantuan</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-6 uppercase tracking-widest text-sm">Buletin</h5>
          <p className="text-white/60 text-xs mb-4">Berlangganan untuk mendapatkan pembaruan dan penawaran spesial.</p>
          <div className="flex">
            <input type="email" className="bg-white/5 border-white/20 rounded-l-md text-sm w-full focus:ring-primary focus:border-primary" placeholder="Email" />
            <button className="bg-primary px-4 rounded-r-md hover:bg-orange-700 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-xs">
        <p>© 2023 Rasa Rasa Resto. Seluruh Hak Cipta Dilindungi.</p>
      </div>
    </footer>
  );
};

const FloatingButtons = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-4">
      <a 
        href="https://api.whatsapp.com/send?phone=6281328904277" 
        target="_blank" 
        className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
        title="Order via WhatsApp"
      >
        <MessageCircle size={32} />
      </a>
      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="w-14 h-14 bg-white text-dark rounded-full flex items-center justify-center shadow-2xl hover:bg-primary hover:text-white transition-all transform hover:scale-110"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Gallery />
      <Blog />
      <Testimonials />
      <Contact />
      <Footer />
      <FloatingButtons />
    </div>
  );
}
