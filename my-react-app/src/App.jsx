import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const Section = ({ id, title, children }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section
      id={id}
      ref={ref}
      className={`max-w-5xl mx-auto px-4 py-16 ${
        inView ? "animate-fade-in" : ""
      }`}
    >
      <h2 className="text-4xl font-bold text-[#d4a574] mb-8">{title}</h2>
      <div className="text-lg leading-relaxed text-[#e8d9c5]">{children}</div>
    </section>
  );
};

const artworks = [
  {
    title: "Character Design - Fantasy",
    description: "ファンタジー世界の背景キャラクターデザイン",
    link: "",
    image: "https://via.placeholder.com/400x300?text=Artwork+1",
    category: "Character",
  },
  {
    title: "Illustration - Nature",
    description: "自然をテーマにした風景イラスト",
    link: "",
    image: "https://via.placeholder.com/400x300?text=Artwork+2",
    category: "Landscape",
  },
  {
    title: "Comic - Adventure",
    description: "冒険をテーマにした漫画パネル",
    link: "",
    image: "https://via.placeholder.com/400x300?text=Artwork+3",
    category: "Comic",
  },
  {
    title: "Digital Painting",
    description: "デジタルペイントの作品集",
    link: "",
    image: "https://via.placeholder.com/400x300?text=Artwork+4",
    category: "Digital",
  },
];

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const sections = ["About Me", "Gallery", "Services", "Contact"];

  return (
    <div className="min-h-screen relative text-[#e8d9c5]" style={{ backgroundColor: "#0f0d0a" }}>
      {/* 背景ぼかし */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#1a1410]/95 shadow-lg z-50 px-4 py-4 flex justify-between items-center border-b border-[#d4a574]/20">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-2xl font-bold tracking-wider text-[#d4a574]"
        >
          ✨ Illustrator
        </button>
        <div className="hidden sm:flex gap-8">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(/\s/g, "")}`}
              className="hover:text-[#d4a574] transition-colors text-[#e8d9c5]"
            >
              {s}
            </a>
          ))}
        </div>
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-2xl">
            ☰
          </button>
        </div>
      </nav>

      {/* モバイルメニュー */}
      <div
        className={`fixed top-16 left-0 w-full bg-[#1a1410]/95 text-[#e8d9c5] sm:hidden z-50 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center py-6 gap-4 text-lg border-b border-[#d4a574]/20">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(/\s/g, "")}`}
              onClick={() => setMenuOpen(false)}
              className="hover:text-[#d4a574] transition-colors"
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="pt-28 pb-10">
        <Section id="aboutme" title="About Me">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-6">
            <div className="md:col-span-2">
              <p className="text-[#e8d9c5] mb-4 leading-relaxed">
                デジタルとアナログの両方の手法を用いて、キャラクターデザイン、風景イラスト、漫画制作を行っています。
              </p>
              <p className="text-[#e8d9c5] mb-4 leading-relaxed">
                ファンタジー、SFなどの様々なジャンルに対応でき、クライアントのビジョンを形にすることが得意です。
              </p>
            </div>
            <div className="bg-[#2a2420] p-6 rounded-lg border border-[#d4a574]/20">
              <h3 className="text-[#d4a574] font-bold mb-3">基本情報</h3>
              <p className="text-sm text-[#d7c5a5] mb-2">📧 Contact: info@example.com</p>
              <p className="text-sm text-[#d7c5a5] mb-2">💼 Freelance Illustrator</p>
              <p className="text-sm text-[#d7c5a5]">📍 Based in Japan</p>
            </div>
          </div>
        </Section>

        <Section id="gallery" title="Gallery">
          <div className="mb-6 flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === "All"
                  ? "bg-[#d4a574] text-[#0f0d0a]"
                  : "bg-[#2a2420] text-[#e8d9c5] hover:bg-[#3a342d]"
              }`}
            >
              All
            </button>
            {["Character", "Landscape", "Comic", "Digital"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedCategory === cat
                    ? "bg-[#d4a574] text-[#0f0d0a]"
                    : "bg-[#2a2420] text-[#e8d9c5] hover:bg-[#3a342d]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {artworks.map((artwork, i) => (
              <div
                key={i}
                className="bg-[#2a2420] rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transform hover:scale-105 transition-all duration-300 border border-[#d4a574]/10"
              >
                <div className="relative overflow-hidden h-48 bg-[#1a1410]">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <span className="inline-block bg-[#d4a574]/20 text-[#d4a574] text-xs px-3 py-1 rounded-full mb-2">
                    {artwork.category}
                  </span>
                  <h3 className="text-lg font-bold text-[#d4a574] mb-2">
                    {artwork.title}
                  </h3>
                  <p className="text-sm text-[#d7c5a5]">{artwork.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="services" title="Services">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#2a2420] p-6 rounded-lg border border-[#d4a574]/20">
              <h3 className="text-[#d4a574] text-xl font-bold mb-3">📚 Character Design</h3>
              <p className="text-[#d7c5a5] text-sm mb-2">キャラクターの概念設計から完成まで、幅広い対応が可能です。</p>
            </div>
            <div className="bg-[#2a2420] p-6 rounded-lg border border-[#d4a574]/20">
              <h3 className="text-[#d4a574] text-xl font-bold mb-3">🎨 Custom Illustration</h3>
              <p className="text-[#d7c5a5] text-sm mb-2">ご要望に応じたオーダーメイドイラストを制作いたします。</p>
            </div>
            <div className="bg-[#2a2420] p-6 rounded-lg border border-[#d4a574]/20">
              <h3 className="text-[#d4a574] text-xl font-bold mb-3">📖 Manga / Comic</h3>
              <p className="text-[#d7c5a5] text-sm mb-2">漫画やコミックのペーム作成から仕上げまで対応します。</p>
            </div>
            <div className="bg-[#2a2420] p-6 rounded-lg border border-[#d4a574]/20">
              <h3 className="text-[#d4a574] text-xl font-bold mb-3">🖥️ Digital Art</h3>
              <p className="text-[#d7c5a5] text-sm mb-2">デジタルペイントから3D背景までトータルサポート。</p>
            </div>
          </div>
        </Section>

        <Section id="contact" title="Contact">
          <div className="bg-[#2a2420] p-8 rounded-lg border border-[#d4a574]/20 max-w-2xl">
            <p className="text-[#d7c5a5] mb-6">
              制作依頼、ご質問などお気軽にお問い合わせください。
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-[#d4a574] font-bold block mb-2">Email</label>
                <a href="mailto:info@example.com" className="text-[#d4a574] underline hover:text-[#e8d9c5]">
                  info@example.com
                </a>
              </div>
              <div>
                <label className="text-[#d4a574] font-bold block mb-2">SNS</label>
                <div className="flex gap-4">
                  <a href="#" className="text-[#d4a574] hover:text-[#e8d9c5] transition-colors">
                    Twitter
                  </a>
                  <a href="#" className="text-[#d4a574] hover:text-[#e8d9c5] transition-colors">
                    Instagram
                  </a>
                  <a href="#" className="text-[#d4a574] hover:text-[#e8d9c5] transition-colors">
                    Pixiv
                  </a>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer className="bg-[#1a1410] text-[#d7c5a5] py-10 mt-20 text-center text-sm border-t border-[#d4a574]/20">
        <p className="text-lg font-bold text-[#d4a574] mb-2">✨ Illustrator Portfolio</p>
        <p className="mb-3">イラストレーター ポートフォリオサイト</p>
        <p className="mb-3">&copy; 2025 All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
