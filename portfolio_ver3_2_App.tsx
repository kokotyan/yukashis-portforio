import React, { useState } from "react";
import { useInView } from "react-intersection-observer";

const Section = ({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section
      id={id}
      ref={ref}
      className={`max-w-5xl mx-auto px-4 py-16 ${
        inView ? "animate-fade-in" : ""
      }`}
    >
      <h2 className="text-3xl font-bold text-[#c9a063] mb-4">{title}</h2>
      <div className="text-lg leading-relaxed">{children}</div>
    </section>
  );
};

const productions = [
  {
    title: "React-portfolio",
    description: "このサイトを作る前に作ったポートフォリオです。",
    link: "https://kokotyan.github.io/react-portfolio/",
    image:
      "https://pbs.twimg.com/profile_images/1558726525431980032/Dnjm2rlt_400x400.jpg",
  },
  {
    title: "note",
    description: "コーヒーを飲んだ時とお出かけした時に更新しています。",
    link: "https://note.com/murakumo_yu",
    image:
      "https://assets.st-note.com/production/uploads/images/177879204/profile_eb3851ee02be0b68e428a5797e22e3c6.jpeg?fit=bounds&format=jpeg&quality=85&width=330",
  },
  {
    title: "GitHub",
    description: "制作物・コードはこちらから。",
    link: "https://github.com/kokotyan",
    image: "",
  },
  {
    title: "Coming soon...",
    description: "現在 Notion ライクなアプリを開発中。",
    link: "",
    image: "",
  },
];

const App: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const sections = ["About Me", "Skills", "Productions"];

  return (
    <div className="min-h-screen relative text-[#d7c5a5]">
      {/* 背景ぼかし */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#2b241d]/90 shadow-lg z-50 px-4 py-3 flex justify-between items-center">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-xl font-bold tracking-wide text-[#c9a063]"
        >
          喫茶 kokos
        </button>
        <div className="hidden sm:flex gap-6">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(" ", "")}`}
              className="hover:underline"
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
        className={`fixed top-14 left-0 w-full bg-[#2b241d]/95 text-[#d7c5a5] sm:hidden z-50 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center py-6 gap-4 text-lg">
          {sections.map((s) => (
            <a
              key={s}
              href={`#${s.toLowerCase().replace(" ", "")}`}
              onClick={() => setMenuOpen(false)}
            >
              {s}
            </a>
          ))}
        </div>
      </div>

      {/* Main */}
      <main className="pt-24 pb-10">
        <Section id="aboutme" title="About Me">
          2001年2月7日に石川のさきっぽの珠洲で産声を上げた。空と音楽、それと美味しい食べ物が好き。
        </Section>

        <Section id="skills" title="Skills">
          Reactを得意としていますが、最近はLinuc取得に向けて学習し、Dockerも扱えるようになってきました。
        </Section>

        <Section id="productions" title="Productions">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productions.map((p, i) => (
              <div
                key={i}
                className="bg-[#3a342d] rounded-md shadow p-4 hover:scale-105 transform transition"
              >
                {p.image && (
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-40 object-cover rounded"
                  />
                )}
                <h3 className="mt-4 text-xl font-bold text-[#c9a063]">
                  {p.title}
                </h3>
                <p className="mt-2">{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block mt-2 text-[#c9a063] underline"
                  >
                    詳細を見る →
                  </a>
                )}
              </div>
            ))}
          </div>
        </Section>
      </main>

      <footer className="bg-[#2b241d] text-[#d7c5a5] py-8 mt-16 text-center text-sm border-t border-[#3f3a33]">
        <p>喫茶 kokos - たばこの吸えるおやすみ処</p>
        <p>営業時間：13:30~17:30 ｜ 定休日：月、水、土、日。祝
        </p>
        <p className="mt-2">石川県金沢市某所</p>
        <p className="mt-2">&copy; 2025 Koko's Portfolio</p>
      </footer>
    </div>
  );
};

export default App;
