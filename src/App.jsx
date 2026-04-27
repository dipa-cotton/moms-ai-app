import { useState, useEffect, useRef } from "react";
import {
  Star,
  Heart,
  Home,
  BookOpen,
  Sparkles,
  Trophy,
  Flame,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Brain,
  Music,
  RotateCw,
  Check,
  X,
  Volume2,
  Lock,
  Award,
} from "lucide-react";

// ============================================================
//  MANA TELUGU — An app for Shriya, Khushi & Diya
//  Vocabulary drawn from the 90-Day Family Workbook
// ============================================================

const PROFILES = [
  { id: "shriya", name: "Shriya", emoji: "🌸", accent: "#E85A7A", soft: "#FFE4EC" },
  { id: "khushi", name: "Khushi", emoji: "🌟", accent: "#D97706", soft: "#FEF3C7" },
  { id: "diya", name: "Diya", emoji: "🦋", accent: "#0F766E", soft: "#CCFBF1" },
];

// Vocabulary organized by week. English prompt -> Phonetic Telugu answer.
// Categories from the 90-day workbook.
const WEEKS = [
  {
    n: 1,
    phase: 1,
    theme: "Greetings",
    icon: "👋",
    words: [
      { en: "Hello (formal)", te: "Namaskaram" },
      { en: "Hi (informal)", te: "Haayi" },
      { en: "Good morning", te: "Shubhodayam" },
      { en: "Good night", te: "Shubha raatri" },
      { en: "How are you?", te: "Meeru ela unnaru?" },
      { en: "I am fine", te: "Naaku baagundi" },
      { en: "What is your name?", te: "Meeru peru enti?" },
      { en: "Thank you", te: "Dhanyavaadaalu" },
      { en: "Please", te: "Dayachesi" },
      { en: "Yes", te: "Avunu" },
      { en: "No", te: "Kaadu" },
      { en: "Come here", te: "Ikkada raa" },
      { en: "Goodbye", te: "Vellostaa" },
    ],
  },
  {
    n: 2,
    phase: 1,
    theme: "Family",
    icon: "👨‍👩‍👧‍👧",
    words: [
      { en: "Mother", te: "Amma" },
      { en: "Father", te: "Naanna" },
      { en: "Older sister", te: "Akka" },
      { en: "Younger sister", te: "Chelli" },
      { en: "Older brother", te: "Anna" },
      { en: "Grandmother (mom's)", te: "Naanamma" },
      { en: "Grandfather (mom's)", te: "Thaatayya" },
      { en: "Uncle (mom's brother)", te: "Baavayya" },
      { en: "Aunt (younger)", te: "Pinni" },
      { en: "Aunt (older)", te: "Peddamma" },
      { en: "Family", te: "Kutumbam" },
      { en: "I love you", te: "Nenu ninnu premistaanu" },
      { en: "My family is great", te: "Maa kutumbam chaala baagundi" },
    ],
  },
  {
    n: 3,
    phase: 1,
    theme: "Numbers & Colors",
    icon: "🔢",
    words: [
      { en: "One", te: "Okati" },
      { en: "Two", te: "Rendu" },
      { en: "Three", te: "Moodu" },
      { en: "Four", te: "Naalu" },
      { en: "Five", te: "Ayidu" },
      { en: "Six", te: "Aaru" },
      { en: "Seven", te: "Edu" },
      { en: "Eight", te: "Enimidi" },
      { en: "Nine", te: "Tommidi" },
      { en: "Ten", te: "Padi" },
      { en: "Twenty", te: "Iruvai" },
      { en: "Red", te: "Eerra rangu" },
      { en: "Blue", te: "Neeli rangu" },
      { en: "Yellow", te: "Pasupu rangu" },
      { en: "Green", te: "Pacha rangu" },
      { en: "White", te: "Tella rangu" },
      { en: "Black", te: "Nalla rangu" },
      { en: "Pink", te: "Gulabi rangu" },
      { en: "Orange", te: "Naranga rangu" },
    ],
  },
  {
    n: 4,
    phase: 1,
    theme: "Body & Feelings",
    icon: "😊",
    words: [
      { en: "Head", te: "Tallu" },
      { en: "Eyes", te: "Kannulu" },
      { en: "Ears", te: "Chevulu" },
      { en: "Nose", te: "Mukku" },
      { en: "Mouth", te: "Nooru" },
      { en: "Hands", te: "Chetulu" },
      { en: "Legs", te: "Kaalulu" },
      { en: "Stomach", te: "Pedda" },
      { en: "I am hungry", te: "Naaku aakali ga undi" },
      { en: "I am thirsty", te: "Naaku daaham ga undi" },
      { en: "I am sleepy", te: "Naaku nidraga undi" },
      { en: "I am happy", te: "Naaku santhosham ga undi" },
      { en: "I am tired", te: "Naaku aayaasam ga undi" },
      { en: "My head hurts", te: "Naaku talla noopiga undi" },
    ],
  },
  {
    n: 5,
    phase: 1,
    theme: "Food",
    icon: "🍛",
    words: [
      { en: "Rice", te: "Annam" },
      { en: "Water", te: "Neellu" },
      { en: "Milk", te: "Paalu" },
      { en: "Vegetables", te: "Kooralu" },
      { en: "Fruit", te: "Pandulu" },
      { en: "Mango", te: "Maavidi pandu" },
      { en: "It is sweet", te: "Teeyaga undi" },
      { en: "It is spicy", te: "Kaaranga undi" },
      { en: "I want to eat", te: "Naaku tinanundi" },
      { en: "Food is tasty", te: "Vanta baagundi" },
      { en: "Breakfast", te: "Prabhaata bhakshanam" },
      { en: "Dinner", te: "Raatri bhojnam" },
    ],
  },
  {
    n: 6,
    phase: 1,
    theme: "School & Home",
    icon: "🏫",
    words: [
      { en: "School", te: "Badi" },
      { en: "Teacher", te: "Maastaaru" },
      { en: "Book", te: "Pustakam" },
      { en: "Homework", te: "Illu pani" },
      { en: "Friend", te: "Neestu" },
      { en: "House / Home", te: "Illu" },
      { en: "Outside", te: "Baataki" },
      { en: "Come inside", te: "Lopali raa" },
      { en: "Let's go", te: "Velladaam" },
      { en: "I am going to school", te: "Naenu badiki veltunna" },
      { en: "I finished homework", te: "Naenu illu pani chesaanu" },
    ],
  },
  {
    n: 7,
    phase: 2,
    theme: "Action Verbs",
    icon: "🏃",
    words: [
      { en: "To eat", te: "Tinaadam" },
      { en: "To drink", te: "Taadam" },
      { en: "To sleep", te: "Padukkovadam" },
      { en: "To study", te: "Chaduvukovadam" },
      { en: "To play", te: "Aadadam" },
      { en: "To run", te: "Parigettadam" },
      { en: "To sit", te: "Koochovadam" },
      { en: "To stand", te: "Nillabadadam" },
      { en: "I am eating", te: "Naenu tintunnaanu" },
      { en: "I am playing", te: "Naenu aadutunnanu" },
      { en: "Let's play together", te: "Mana koodi aadadam" },
    ],
  },
  {
    n: 8,
    phase: 2,
    theme: "Question Words",
    icon: "❓",
    words: [
      { en: "What?", te: "Enti?" },
      { en: "Who?", te: "Evaru?" },
      { en: "Where?", te: "Ekkada?" },
      { en: "When?", te: "Eppudu?" },
      { en: "Why?", te: "Enduku?" },
      { en: "How?", te: "Ela?" },
      { en: "How much?", te: "Entha?" },
      { en: "What is this?", te: "Idi enti?" },
      { en: "Where is Amma?", te: "Amma ekkada?" },
      { en: "Who is that?", te: "Adi evaru?" },
    ],
  },
  {
    n: 9,
    phase: 2,
    theme: "Time & Nature",
    icon: "🌳",
    words: [
      { en: "Morning", te: "Udayam" },
      { en: "Afternoon", te: "Madhyaahnam" },
      { en: "Evening", te: "Saayantram" },
      { en: "Night", te: "Raatri" },
      { en: "Today", te: "Indu" },
      { en: "Tomorrow", te: "Raandu" },
      { en: "Yesterday", te: "Ninna" },
      { en: "Sun", te: "Surya" },
      { en: "Rain", te: "Vaanam" },
      { en: "It is raining", te: "Vaanam paddindi" },
      { en: "It is hot", te: "Vedi ga undi" },
      { en: "It is cold", te: "Chaali ga undi" },
      { en: "Tree", te: "Chettu" },
      { en: "Flower", te: "Puvvu" },
      { en: "Bird", te: "Pakshi" },
    ],
  },
  {
    n: 10,
    phase: 2,
    theme: "Conversations",
    icon: "💬",
    words: [
      { en: "Can you help me?", te: "Naaku sahaayam chestaavaa?" },
      { en: "I don't understand", te: "Naaku artham kaadu" },
      { en: "Please say it again", te: "Maripi cheppu dayachesi" },
      { en: "I know!", te: "Naaku telusu!" },
      { en: "That is beautiful", te: "Adi chaala andanga undi" },
      { en: "This is delicious", te: "Idi chaala ruchiga undi" },
      { en: "I finished!", te: "Naenu chesaanu!" },
      { en: "Wait a moment", te: "Oka nimisham aagu" },
      { en: "Can we go outside?", te: "Mana baataki vellutaamaa?" },
    ],
  },
  {
    n: 13,
    phase: 3,
    theme: "Feelings & Opinions",
    icon: "💖",
    words: [
      { en: "I like this", te: "Naaku idi ishtam" },
      { en: "I don't like this", te: "Naaku idi ishtam ledu" },
      { en: "That is my favorite", te: "Adi naa ishtamaina" },
      { en: "I am excited", te: "Naaku chala utsaham ga undi" },
      { en: "I am sad", te: "Naaku baadham ga undi" },
      { en: "I am angry", te: "Naaku kopam ga undi" },
      { en: "I am scared", te: "Naaku bayam ga undi" },
      { en: "I am proud", te: "Naaku garvaanga undi" },
      { en: "I agree!", te: "Naenu oppukuntaanu!" },
      { en: "I think that…", te: "Naaku anipistundi..." },
    ],
  },
  {
    n: 14,
    phase: 3,
    theme: "Describing Things",
    icon: "✨",
    words: [
      { en: "Tall", te: "Ella ga undi" },
      { en: "Short (height)", te: "Potti ga undi" },
      { en: "Big", te: "Pedda" },
      { en: "Small", te: "Chinna" },
      { en: "Beautiful", te: "Andamaina" },
      { en: "Smart / Clever", te: "Tellavaraina" },
      { en: "Kind", te: "Manchidi" },
      { en: "Near", te: "Daggaraga" },
      { en: "Far", te: "Dooramga" },
      { en: "Our home is big", te: "Maa illu chaala pedda" },
    ],
  },
  {
    n: 15,
    phase: 3,
    theme: "Storytelling",
    icon: "📖",
    words: [
      { en: "First", te: "Mundhu" },
      { en: "Then / After that", te: "Tarvata" },
      { en: "Finally", te: "Chaivara" },
      { en: "But", te: "Kaani" },
      { en: "Because", te: "Endukante" },
      { en: "So / Therefore", te: "Andukoni" },
      { en: "Also / And", te: "Kooda" },
      { en: "Once upon a time", te: "Oka roju" },
      { en: "A long time ago", te: "Chaala kaalam kinda" },
      { en: "The story ended", te: "Katha aipoyindi" },
    ],
  },
  {
    n: 16,
    phase: 3,
    theme: "Dreams & Future",
    icon: "🌈",
    words: [
      { en: "Math", te: "Ganitam" },
      { en: "Science", te: "Vijnam" },
      { en: "Music", te: "Sangeetham" },
      { en: "Dance", te: "Naatyam" },
      { en: "Sports / Games", te: "Aatalu" },
      { en: "I want to be a doctor", te: "Naenu doctor ayyaalani undi" },
      { en: "When I grow up", te: "Naenu pedda ayinaaka" },
      { en: "I want to visit India", te: "Naenu India ki vellaali ani undi" },
      { en: "I am proud to be Telugu", te: "Naenu Telugu ni ani garvaanga undi" },
      { en: "Our language is beautiful", te: "Mana bhaasha chaala andamaina-di" },
    ],
  },
];

const RHYMES = [
  {
    id: "chanda",
    title: "Chanda Mama",
    subtitle: "Moon Uncle",
    emoji: "🌙",
    lines: [
      { te: "Chanda mama raave", en: "Moon uncle, please come" },
      { te: "Jaabu lo raave", en: "Come into the bowl" },
      { te: "Bangaaru paatraloo", en: "In the golden vessel" },
      { te: "Paalu posi raave", en: "Pour milk and come" },
      { te: "Nalla raatriki raave", en: "Come in the dark night" },
    ],
  },
  {
    id: "aaamma",
    title: "Aa Aa Amma",
    subtitle: "Alphabet Song",
    emoji: "🔤",
    lines: [
      { te: "Aa Aa Amma", en: "A A Mother" },
      { te: "Amma annam pettindi", en: "Mother served rice" },
      { te: "Naanu tinanu emitundi", en: "I ate it, what is there" },
      { te: "Aakali teeripoindi", en: "My hunger was satisfied" },
    ],
  },
  {
    id: "rela",
    title: "Rela Rela Rela",
    subtitle: "Train Song",
    emoji: "🚂",
    lines: [
      { te: "Rela rela rela", en: "Train train train" },
      { te: "Dhooma dhoom", en: "Chug chug" },
      { te: "Oorinchi poindi rela", en: "The train went through the village" },
      { te: "Kaadu kaadu manam", en: "No no, we are not stopping" },
      { te: "Vellutaamu vellutaamu", en: "We will go, we will go" },
    ],
  },
];

const BADGES = [
  { stars: 10, name: "Baby Koyil", emoji: "🐣", desc: "First 10 stars" },
  { stars: 25, name: "Paddy Sparrow", emoji: "🐦", desc: "25 stars" },
  { stars: 50, name: "Marigold Scholar", emoji: "🌼", desc: "50 stars" },
  { stars: 100, name: "Peacock Princess", emoji: "🦚", desc: "100 stars" },
  { stars: 200, name: "Telugu Star", emoji: "⭐", desc: "200 stars" },
  { stars: 400, name: "Bhaasha Queen", emoji: "👑", desc: "400 stars" },
];

// ============================================================
//  PERSISTENCE HELPERS
// ============================================================
async function loadProfile(id) {
  const r = localStorage.getItem(`mt:profile:${id}`);
  return r ? JSON.parse(r) : null;
}

async function saveProfile(id, data) {
  localStorage.setItem(`mt:profile:${id}`, JSON.stringify(data));
  return true;
}

const defaultProfileData = () => ({
  stars: 0,
  streak: 0,
  lastPlayed: null,
  weeksSeen: [],
  rhymesMastered: [],
});

// ============================================================
//  SHUFFLE / RANDOM
// ============================================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample(arr, n) {
  return shuffle(arr).slice(0, n);
}

// ============================================================
//  CONFETTI
// ============================================================
function Confetti({ show }) {
  if (!show) return null;
  const bits = Array.from({ length: 40 });
  const colors = ["#E85A7A", "#D97706", "#0F766E", "#7C3AED", "#FACC15"];
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {bits.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.5;
        const duration = 1.5 + Math.random() * 1.5;
        const color = colors[i % colors.length];
        const size = 8 + Math.random() * 8;
        return (
          <span
            key={i}
            className="absolute rounded-sm"
            style={{
              left: `${left}%`,
              top: "-20px",
              width: size,
              height: size,
              background: color,
              animation: `fall ${duration}s ${delay}s ease-in forwards`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        );
      })}
    </div>
  );
}

// ============================================================
//  DECORATIVE PAISLEY / MANDALA
// ============================================================
function Mandala({ className = "", color = "#E85A7A", opacity = 0.1 }) {
  return (
    <svg viewBox="0 0 100 100" className={className} style={{ opacity }}>
      <g fill="none" stroke={color} strokeWidth="0.5">
        <circle cx="50" cy="50" r="45" />
        <circle cx="50" cy="50" r="35" />
        <circle cx="50" cy="50" r="25" />
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x2 = 50 + 45 * Math.cos(angle);
          const y2 = 50 + 45 * Math.sin(angle);
          return <line key={i} x1="50" y1="50" x2={x2} y2={y2} />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 45 * Math.PI) / 180;
          const cx = 50 + 30 * Math.cos(angle);
          const cy = 50 + 30 * Math.sin(angle);
          return <circle key={i} cx={cx} cy={cy} r="5" />;
        })}
      </g>
    </svg>
  );
}

/**
 * PROFILE PICKER
 * Combined logic for displaying profiles and updating daily streaks.
 */
function ProfilePicker({ onPick }) {
  const [profileStars, setProfileStars] = useState({});

  // 1. Load the star counts for everyone when the component first loads
  useEffect(() => {
    const fetchAllStars = async () => {
      const stars = {};
      for (const p of PROFILES) {
        const d = await loadProfile(p.id);
        stars[p.id] = d?.stars || 0;
      }
      setProfileStars(stars);
    };

    fetchAllStars();
  }, []);

  // 2. Handle the selection and calculate the streak (from the second snippet)
  const handlePick = async (p) => {
    const profileId = p.id;
    const d = await loadProfile(profileId);
    const today = new Date().toDateString();
    let updatedData;

    if (d) {
      // Check if they played yesterday to increment streak
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      const newStreak = d.lastPlayed === today 
        ? d.streak 
        : d.lastPlayed === yesterday 
          ? d.streak + 1 
          : 1;

      updatedData = { ...d, streak: newStreak, lastPlayed: today };
    } else {
      // Brand new profile data
      updatedData = { ...defaultProfileData(), streak: 1, lastPlayed: today };
    }

    // Save and then tell the parent component we are done
    await saveProfile(profileId, updatedData);
    onPick(p);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Background Decor */}
      <Mandala className="absolute -top-20 -right-20 w-96 h-96" color="#E85A7A" opacity={0.12} />
      <Mandala className="absolute -bottom-20 -left-20 w-96 h-96" color="#0F766E" opacity={0.12} />

      {/* Title Section */}
      <div className="text-center mb-10 relative z-10">
        <div className="inline-block mb-3 px-4 py-1 rounded-full bg-white/60 backdrop-blur border border-orange-200">
          <span className="text-sm font-medium text-orange-900 tracking-widest uppercase">
            ॐ Mana Telugu ॐ
          </span>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold text-stone-800 mb-2 tracking-tight" style={{ fontFamily: "'Fraunces', serif" }}>
          Our Telugu
        </h1>

        <p className="text-stone-600 text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Who's learning today?
        </p>
      </div>

      {/* Profile Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl relative z-10">
        {PROFILES.map((p) => (
          <button
            key={p.id}
            onClick={() => handlePick(p)}
            className="group relative bg-white/80 backdrop-blur border-2 border-stone-200 rounded-3xl p-8 hover:border-orange-300 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            style={{
              borderColor: "transparent",
              outline: `2px solid ${p.soft}` // Backticks fixed
            }}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: `linear-gradient(135deg, ${p.soft} 0%, transparent 100%)` }}
            />

            <div className="relative flex flex-col items-center">
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-5xl mb-4" style={{ background: p.soft }}>
                {p.emoji}
              </div>

              <h2 className="text-3xl font-bold mb-2" style={{ color: p.accent, fontFamily: "'Fraunces', serif" }}>
                {p.name}
              </h2>

              <div className="flex items-center gap-1 text-stone-600">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold">{profileStars[p.id] || 0}</span>
                <span className="text-sm text-stone-500">stars</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <p className="mt-10 text-sm text-stone-500 italic relative z-10" style={{ fontFamily: "'Nunito', sans-serif" }}>
        Made with ❤️ for Shriya, Khushi & Diya
      </p>
    </div>
  );
}
// ============================================================
//  DASHBOARD
// ============================================================
function Dashboard({ profile, data, onNav, onSwitch }) {
  const currentWeek = WEEKS[0];
  const nextBadge = BADGES.find((b) => data.stars < b.stars) || BADGES[BADGES.length - 1];
  const progress = Math.min(100, (data.stars / nextBadge.stars) * 100);

  return (
    <div className="min-h-screen px-5 py-6 pb-24 max-w-2xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onSwitch}
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/60 border border-stone-200"
        >
          <span className="text-xl">{profile.emoji}</span>
          <span className="font-semibold text-stone-800">{profile.name}</span>
          <ChevronLeft size={16} className="text-stone-500" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-yellow-50 border border-yellow-200">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-yellow-900">{data.stars}</span>
          </div>
          {data.streak > 0 && (
            <div className="flex items-center gap-1 px-3 py-2 rounded-full bg-orange-50 border border-orange-200">
              <Flame size={16} className="text-orange-500" />
              <span className="font-bold text-orange-900">{data.streak}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hero greeting */}
      <div
        className="relative rounded-3xl p-6 mb-6 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${profile.soft} 0%, #FFF7ED 100%)`,
        }}
      >
        <Mandala
          className="absolute -right-8 -top-8 w-40 h-40"
          color={profile.accent}
          opacity={0.15}
        />
        <div className="relative">
          <p className="text-stone-600 text-sm mb-1">Shubhodayam, {profile.name}! 🌸</p>
          <h2
            className="text-3xl font-bold text-stone-800 mb-3"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            Let's learn Telugu!
          </h2>
          {/* Badge progress */}
          <div className="bg-white/70 rounded-2xl p-4 mt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{nextBadge.emoji}</span>
                <div>
                  <div className="text-xs text-stone-500">Next badge</div>
                  <div className="font-bold text-stone-800">{nextBadge.name}</div>
                </div>
              </div>
              <div className="text-sm text-stone-600 font-semibold">
                {data.stars}/{nextBadge.stars}
              </div>
            </div>
            <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${profile.accent} 0%, #FACC15 100%)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Play modes */}
      <h3
        className="text-xl font-bold text-stone-800 mb-3 px-1"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Play & Learn
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <GameCard
          icon={<BookOpen size={28} />}
          title="Flashcards"
          subtitle="Flip & learn"
          color="#D97706"
          bg="#FEF3C7"
          onClick={() => onNav("flashcards")}
        />
        <GameCard
          icon={<Shuffle size={28} />}
          title="Match-Up"
          subtitle="Pair the words"
          color="#0F766E"
          bg="#CCFBF1"
          onClick={() => onNav("match")}
        />
        <GameCard
          icon={<Brain size={28} />}
          title="Quick Quiz"
          subtitle="Pick the answer"
          color="#E85A7A"
          bg="#FFE4EC"
          onClick={() => onNav("quiz")}
        />
        <GameCard
          icon={<Music size={28} />}
          title="Rhyme Time"
          subtitle="Sing along"
          color="#7C3AED"
          bg="#EDE9FE"
          onClick={() => onNav("rhymes")}
        />
      </div>

      {/* Badges */}
      <h3
        className="text-xl font-bold text-stone-800 mb-3 px-1"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        <span className="inline-flex items-center gap-2">
          <Trophy size={22} className="text-yellow-500" />
          Badges
        </span>
      </h3>
      <div className="grid grid-cols-3 gap-3 mb-6">
        {BADGES.map((b) => {
          const earned = data.stars >= b.stars;
          return (
            <div
              key={b.name}
              className={`rounded-2xl p-3 text-center border-2 ${
                earned
                  ? "bg-white border-yellow-300 shadow-sm"
                  : "bg-stone-50 border-stone-200 opacity-50"
              }`}
            >
              <div className="text-3xl mb-1">{earned ? b.emoji : "🔒"}</div>
              <div className="text-xs font-bold text-stone-800 leading-tight">
                {b.name}
              </div>
              <div className="text-stone-500 mt-1" style={{ fontSize: "10px" }}>{b.desc}</div>
            </div>
          );
        })}
      </div>

      {/* Weeks overview */}
      <h3
        className="text-xl font-bold text-stone-800 mb-3 px-1"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        Word Packs
      </h3>
      <div className="space-y-2">
        {WEEKS.map((w) => (
          <div
            key={w.n}
            className="flex items-center gap-3 p-3 bg-white/70 rounded-2xl border border-stone-200"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
              style={{
                background:
                  w.phase === 1 ? "#FEF3C7" : w.phase === 2 ? "#CCFBF1" : "#EDE9FE",
              }}
            >
              {w.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-stone-800">{w.theme}</div>
              <div className="text-xs text-stone-500">
                Week {w.n} · {w.words.length} words
              </div>
            </div>
            <div className="text-xs font-semibold text-stone-400 px-2 py-1 rounded-full bg-stone-100">
              Phase {w.phase}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function GameCard({ icon, title, subtitle, color, bg, onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-left rounded-3xl p-5 border-2 border-transparent hover:border-stone-300 hover:-translate-y-1 transition-all active:translate-y-0"
      style={{ background: bg }}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 text-white"
        style={{ background: color }}
      >
        {icon}
      </div>
      <div
        className="text-lg font-bold text-stone-800"
        style={{ fontFamily: "'Fraunces', serif" }}
      >
        {title}
      </div>
      <div className="text-sm text-stone-600">{subtitle}</div>
    </button>
  );
}

// ============================================================
//  WEEK PICKER (used before each game)
// ============================================================
function WeekPicker({ title, color, onBack, onPick }) {
  return (
    <div className="min-h-screen px-5 py-6 max-w-2xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/60 border border-stone-200"
        >
          <ChevronLeft size={20} />
        </button>
        <h2
          className="text-2xl font-bold text-stone-800"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          {title}
        </h2>
        <div className="w-10" />
      </div>
      <p className="text-center text-stone-600 mb-6">Pick a word pack to play</p>
      <div className="grid grid-cols-2 gap-3">
        {WEEKS.map((w) => (
          <button
            key={w.n}
            onClick={() => onPick(w)}
            className="p-4 rounded-2xl bg-white/80 border-2 border-stone-200 hover:border-orange-300 transition-all hover:-translate-y-0.5 text-left"
          >
            <div className="text-3xl mb-2">{w.icon}</div>
            <div
              className="font-bold text-stone-800 mb-1"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {w.theme}
            </div>
            <div className="text-xs text-stone-500">
              Week {w.n} · {w.words.length} words
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
//  FLASHCARDS
// ============================================================
function Flashcards({ week, profile, onBack, onEarnStars }) {
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [deck] = useState(() => shuffle(week.words));
  const [seenCount, setSeenCount] = useState(0);

  const w = deck[i];
  const last = i === deck.length - 1;

  const next = () => {
    if (!flipped) setSeenCount((s) => s + 1);
    if (last) {
      onEarnStars(3, "Flashcards complete!");
    } else {
      setI(i + 1);
      setFlipped(false);
    }
  };

  const prev = () => {
    if (i > 0) {
      setI(i - 1);
      setFlipped(false);
    }
  };

  return (
    <div className="min-h-screen px-5 py-6 max-w-2xl mx-auto flex flex-col" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/60 border border-stone-200"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <div className="text-xs text-stone-500 uppercase tracking-wider">
            {week.theme}
          </div>
          <div className="text-sm font-semibold text-stone-700">
            {i + 1} of {deck.length}
          </div>
        </div>
        <div className="w-10" />
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-orange-400 to-pink-500 transition-all duration-300"
          style={{ width: `${((i + 1) / deck.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div
        onClick={() => setFlipped(!flipped)}
        className="flex-1 flex items-center justify-center py-8 cursor-pointer"
      >
        <div
          className="relative w-full max-w-sm mx-auto rounded-3xl shadow-xl transition-transform duration-500"
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
            aspectRatio: "5/6",
          }}
        >
          {/* Front */}
          <div
            className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
            style={{
              backfaceVisibility: "hidden",
              background: "linear-gradient(135deg, #FEF3C7 0%, #FFE4EC 100%)",
            }}
          >
            <Mandala
              className="absolute inset-0 w-full h-full"
              color={profile.accent}
              opacity={0.08}
            />
            <div className="text-xs uppercase tracking-widest text-stone-500 mb-2 relative z-10">
              English
            </div>
            <div
              className="text-3xl md:text-4xl font-bold text-stone-800 relative z-10"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {w.en}
            </div>
            <div className="absolute bottom-6 text-sm text-stone-400 relative z-10">
              Tap to flip ↻
            </div>
          </div>
          {/* Back */}
          <div
            className="absolute inset-0 rounded-3xl flex flex-col items-center justify-center p-8 text-center"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: `linear-gradient(135deg, ${profile.accent} 0%, #D97706 100%)`,
            }}
          >
            <Mandala
              className="absolute inset-0 w-full h-full"
              color="#fff"
              opacity={0.15}
            />
            <div className="text-xs uppercase tracking-widest text-white/80 mb-2 relative z-10">
              Telugu
            </div>
            <div
              className="text-3xl md:text-4xl font-bold text-white relative z-10"
              style={{ fontFamily: "'Fraunces', serif" }}
            >
              {w.te}
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-3 mt-4">
        <button
          onClick={prev}
          disabled={i === 0}
          className="flex-1 p-4 rounded-2xl bg-white/80 border-2 border-stone-200 font-bold text-stone-700 disabled:opacity-40"
        >
          <ChevronLeft className="inline mr-1" size={18} />
          Back
        </button>
        <button
          onClick={() => setFlipped(!flipped)}
          className="p-4 rounded-2xl bg-stone-800 text-white"
        >
          <RotateCw size={20} />
        </button>
        <button
          onClick={next}
          className="flex-1 p-4 rounded-2xl font-bold text-white"
          style={{
            background: `linear-gradient(135deg, ${profile.accent} 0%, #D97706 100%)`,
          }}
        >
          {last ? "Finish ⭐" : "Next"}
          {!last && <ChevronRight className="inline ml-1" size={18} />}
        </button>
      </div>
    </div>
  );
}

// ============================================================
//  MATCH-UP (memory pairs)
// ============================================================
function MatchUp({ week, profile, onBack, onEarnStars }) {
  const pairCount = Math.min(6, week.words.length);
  const [pairs] = useState(() => sample(week.words, pairCount));
  const [cards, setCards] = useState(() => {
    const all = [];
    pairs.forEach((p, idx) => {
      all.push({ id: `${idx}-en`, pairId: idx, text: p.en, type: "en" });
      all.push({ id: `${idx}-te`, pairId: idx, text: p.te, type: "te" });
    });
    return shuffle(all);
  });
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  const handleTap = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.has(id)) return;
    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [a, b] = newFlipped.map((id) => cards.find((c) => c.id === id));
      if (a.pairId === b.pairId) {
        setTimeout(() => {
          setMatched((m) => new Set([...m, a.id, b.id]));
          setFlipped([]);
          if (matched.size + 2 === cards.length) {
            setDone(true);
            const stars = moves <= pairCount + 2 ? 5 : moves <= pairCount + 5 ? 3 : 2;
            onEarnStars(stars, `Match-Up: ${stars} stars!`);
          }
        }, 600);
      } else {
        setTimeout(() => setFlipped([]), 900);
      }
    }
  };

  return (
    <div className="min-h-screen px-5 py-6 max-w-2xl mx-auto flex flex-col" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/60 border border-stone-200"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <div className="text-xs text-stone-500 uppercase tracking-wider">
            {week.theme}
          </div>
          <div className="text-sm font-semibold text-stone-700">
            {matched.size / 2} / {pairCount} pairs · {moves} moves
          </div>
        </div>
        <div className="w-10" />
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 flex-1 content-center">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.has(card.id);
          const isMatched = matched.has(card.id);
          return (
            <button
              key={card.id}
              onClick={() => handleTap(card.id)}
              className="rounded-2xl relative transition-transform"
              style={{
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.4s",
                aspectRatio: "3/4",
              }}
            >
              <div
                className="absolute inset-0 rounded-2xl flex items-center justify-center"
                style={{
                  backfaceVisibility: "hidden",
                  background: `linear-gradient(135deg, ${profile.accent} 0%, #D97706 100%)`,
                }}
              >
                <Sparkles className="text-white/60" size={24} />
              </div>
              <div
                className={`absolute inset-0 rounded-2xl flex items-center justify-center p-2 text-center border-2 ${
                  isMatched ? "border-green-400 bg-green-50" : "border-stone-200 bg-white"
                }`}
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <div>
                  <div className="uppercase tracking-wider text-stone-400 mb-1" style={{ fontSize: "10px" }}>
                    {card.type === "en" ? "English" : "Telugu"}
                  </div>
                  <div
                    className="text-xs sm:text-sm font-bold text-stone-800 leading-tight"
                    style={{ fontFamily: "'Fraunces', serif" }}
                  >
                    {card.text}
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {done && (
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-br from-yellow-100 to-pink-100 text-center">
          <div className="text-5xl mb-2">🎉</div>
          <div className="text-2xl font-bold text-stone-800" style={{ fontFamily: "'Fraunces', serif" }}>
            Chaala baagundi!
          </div>
          <div className="text-stone-600">All pairs matched in {moves} moves</div>
          <button
            onClick={onBack}
            className="mt-4 px-6 py-3 rounded-full bg-stone-800 text-white font-bold"
          >
            Play More
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================
//  QUIZ
// ============================================================
function Quiz({ week, profile, onBack, onEarnStars }) {
  const qCount = Math.min(8, week.words.length);
  const [questions] = useState(() =>
    sample(week.words, qCount).map((w) => {
      const wrongs = sample(
        week.words.filter((x) => x.te !== w.te),
        3
      );
      const options = shuffle([w.te, ...wrongs.map((x) => x.te)]);
      return { prompt: w.en, answer: w.te, options };
    })
  );
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[i];

  const pick = (opt) => {
    if (picked) return;
    setPicked(opt);
    if (opt === q.answer) setCorrectCount((c) => c + 1);
    setTimeout(() => {
      if (i === questions.length - 1) {
        setDone(true);
        const finalCorrect = correctCount + (opt === q.answer ? 1 : 0);
        const stars =
          finalCorrect === questions.length
            ? 6
            : finalCorrect >= questions.length - 1
              ? 4
              : finalCorrect >= questions.length / 2
                ? 2
                : 1;
        onEarnStars(stars, `Quiz: ${finalCorrect}/${questions.length}`);
      } else {
        setI(i + 1);
        setPicked(null);
      }
    }, 900);
  };

  if (done) {
    return (
      <div className="min-h-screen px-5 py-6 max-w-2xl mx-auto flex items-center justify-center" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <div className="text-center">
          <div className="text-7xl mb-4">🌟</div>
          <h2
            className="text-4xl font-bold text-stone-800 mb-2"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {correctCount === questions.length
              ? "Superb!"
              : correctCount >= questions.length / 2
                ? "Chaala baagundi!"
                : "Nice try!"}
          </h2>
          <p className="text-xl text-stone-600 mb-6">
            You got {correctCount} out of {questions.length}
          </p>
          <button
            onClick={onBack}
            className="px-8 py-4 rounded-full text-white font-bold text-lg"
            style={{
              background: `linear-gradient(135deg, ${profile.accent} 0%, #D97706 100%)`,
            }}
          >
            Back to games
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-6 max-w-2xl mx-auto flex flex-col" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/60 border border-stone-200"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="text-center">
          <div className="text-xs text-stone-500 uppercase tracking-wider">
            {week.theme}
          </div>
          <div className="text-sm font-semibold text-stone-700">
            Question {i + 1} of {questions.length}
          </div>
        </div>
        <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-green-50">
          <Check size={14} className="text-green-600" />
          <span className="text-sm font-bold text-green-700">{correctCount}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="h-1.5 bg-stone-200 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-300"
          style={{ width: `${((i + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Prompt */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-center mb-8">
          <div className="text-sm uppercase tracking-widest text-stone-500 mb-2">
            How do you say
          </div>
          <div
            className="text-4xl md:text-5xl font-bold text-stone-800 mb-1"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {q.prompt}
          </div>
          <div className="text-sm text-stone-500">in Telugu?</div>
        </div>

        <div className="space-y-3">
          {q.options.map((opt) => {
            const correct = opt === q.answer;
            const chosen = picked === opt;
            let style = "bg-white border-stone-200 text-stone-800 hover:border-orange-300";
            if (picked) {
              if (correct) style = "bg-green-50 border-green-400 text-green-900";
              else if (chosen) style = "bg-red-50 border-red-400 text-red-900";
              else style = "bg-stone-50 border-stone-200 text-stone-500 opacity-60";
            }
            return (
              <button
                key={opt}
                onClick={() => pick(opt)}
                disabled={!!picked}
                className={`w-full p-4 rounded-2xl border-2 font-semibold text-left transition-all ${style}`}
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{opt}</span>
                  {picked && correct && <Check className="text-green-600" size={22} />}
                  {picked && chosen && !correct && <X className="text-red-600" size={22} />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  RHYMES
// ============================================================
function Rhymes({ profile, onBack, onEarnStars, data }) {
  const [active, setActive] = useState(null);

  if (active) {
    const r = RHYMES.find((x) => x.id === active);
    const mastered = data.rhymesMastered.includes(r.id);
    return (
      <div className="min-h-screen px-5 py-6 max-w-2xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setActive(null)}
            className="p-2 rounded-full bg-white/60 border border-stone-200"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="text-center">
            <div className="text-sm uppercase tracking-wider text-stone-500">
              Nursery Rhyme
            </div>
          </div>
          <div className="w-10" />
        </div>

        <div className="text-center mb-8">
          <div className="text-7xl mb-3">{r.emoji}</div>
          <h2
            className="text-4xl font-bold text-stone-800 mb-1"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            {r.title}
          </h2>
          <p className="text-stone-500 italic">{r.subtitle}</p>
        </div>

        <div className="space-y-3 mb-8">
          {r.lines.map((line, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/80 border border-stone-200"
            >
              <div
                className="text-xl font-bold text-stone-800 mb-1"
                style={{ fontFamily: "'Fraunces', serif" }}
              >
                {line.te}
              </div>
              <div className="text-sm text-stone-500">{line.en}</div>
            </div>
          ))}
        </div>

        {!mastered && (
          <button
            onClick={() => onEarnStars(5, `${r.title} mastered!`, r.id)}
            className="w-full p-4 rounded-2xl text-white font-bold text-lg"
            style={{
              background: `linear-gradient(135deg, ${profile.accent} 0%, #D97706 100%)`,
            }}
          >
            ⭐ I know this rhyme! (+5 stars)
          </button>
        )}
        {mastered && (
          <div className="p-4 rounded-2xl bg-green-50 border-2 border-green-300 text-center">
            <div className="text-2xl mb-1">✨</div>
            <div className="font-bold text-green-900">Mastered!</div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 py-6 max-w-2xl mx-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="p-2 rounded-full bg-white/60 border border-stone-200"
        >
          <ChevronLeft size={20} />
        </button>
        <h2
          className="text-2xl font-bold text-stone-800"
          style={{ fontFamily: "'Fraunces', serif" }}
        >
          Rhyme Time
        </h2>
        <div className="w-10" />
      </div>

      <p className="text-center text-stone-600 mb-6">Three traditional Telugu rhymes</p>

      <div className="space-y-4">
        {RHYMES.map((r) => {
          const mastered = data.rhymesMastered.includes(r.id);
          return (
            <button
              key={r.id}
              onClick={() => setActive(r.id)}
              className="w-full p-5 rounded-3xl bg-white/80 border-2 border-stone-200 hover:border-purple-300 text-left flex items-center gap-4 transition-all hover:-translate-y-0.5"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl bg-purple-50">
                {r.emoji}
              </div>
              <div className="flex-1">
                <div
                  className="text-xl font-bold text-stone-800"
                  style={{ fontFamily: "'Fraunces', serif" }}
                >
                  {r.title}
                </div>
                <div className="text-sm text-stone-500">{r.subtitle}</div>
              </div>
              {mastered && (
                <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 border border-green-300">
                  <Check size={14} className="text-green-600" />
                  <span className="text-xs font-bold text-green-700">Mastered</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ============================================================
//  STAR EARNED TOAST
// ============================================================
function StarToast({ msg, stars, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 2500);
    return () => clearTimeout(t);
  }, [onClose]);
  return (
    <div
      className="fixed top-6 left-1/2 z-50"
      style={{
        transform: "translateX(-50%)",
        animation: "slideDown 0.3s ease-out",
      }}
    >
      <div
        className="bg-white rounded-full shadow-2xl px-6 py-3 flex items-center gap-3 border-2 border-yellow-300"
        style={{ fontFamily: "'Nunito', sans-serif" }}
      >
        <div className="flex">
          {Array.from({ length: Math.min(stars, 5) }).map((_, i) => (
            <Star
              key={i}
              size={20}
              className="fill-yellow-400 text-yellow-400"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
        <div>
          <div className="text-sm text-stone-500">+{stars} stars</div>
          <div className="font-bold text-stone-800">{msg}</div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
//  MAIN APP
// ============================================================
export default function App() {
  const [profile, setProfile] = useState(null);
  const [data, setData] = useState(defaultProfileData());
  const [screen, setScreen] = useState("dashboard"); // dashboard | flashcards-pick | flashcards | match-pick | match | quiz-pick | quiz | rhymes
  const [activeWeek, setActiveWeek] = useState(null);
  const [toast, setToast] = useState(null);
  const [confetti, setConfetti] = useState(false);

  // Load profile data
  useEffect(() => {
    if (!profile) return;
    (async () => {
      const d = await loadProfile(profile.id);
      const today = new Date().toDateString();
      if (d) {
        const newStreak =
          d.lastPlayed === today
            ? d.streak
            : d.lastPlayed === new Date(Date.now() - 86400000).toDateString()
              ? d.streak + 1
              : 1;
        const updated = { ...d, streak: newStreak, lastPlayed: today };
        setData(updated);
        saveProfile(profile.id, updated);
      } else {
        const fresh = { ...defaultProfileData(), streak: 1, lastPlayed: today };
        setData(fresh);
        saveProfile(profile.id, fresh);
      }
    })();
  }, [profile]);

 const handleEarnStars = async (n, msg, rhymeId) => {
    const newStars = data.stars + n;
    const crossedBadge = BADGES.find(
      (b) => data.stars < b.stars && newStars >= b.stars
    );
   const handleEarnStars = async (n, msg, rhymeId) => {
  if (!profile) return;

  const currentStars = data?.stars ?? 0;
  const newStars = currentStars + n;

  const crossedBadge = BADGES.find(
    (b) => currentStars < b.stars && newStars >= b.stars
  );

  const updated = {
    ...data,
    stars: newStars,
    rhymesMastered: rhymeId
      ? [...new Set([...(data?.rhymesMastered ?? []), rhymeId])]
      : data?.rhymesMastered ?? [],
  };

  setData(updated);

  if (profile?.id) {
    await saveProfile(profile.id, updated);
  }

  setToast({
    msg: crossedBadge ? `${crossedBadge.name} unlocked!` : msg,
    stars: n,
  });

  if (crossedBadge) {
    setConfetti(true);
    setTimeout(() => setConfetti(false), 2500);
  }
};
  }

  // Styles / fonts
  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400&family=Nunito:wght@400;600;700;800&display=swap');
    @keyframes fall {
      to { transform: translateY(110vh) rotate(720deg); }
    }
    @keyframes slideDown {
      from { transform: translate(-50%, -100%); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
    body {
      background: linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #FFE4EC 100%);
      min-height: 100vh;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div
        className="min-h-screen"
        style={{
          background: "linear-gradient(135deg, #FFF7ED 0%, #FEF3C7 50%, #FFE4EC 100%)",
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        {!profile && <ProfilePicker onPick={setProfile} />}

        {profile && screen === "dashboard" && (
          <Dashboard
            profile={profile}
            data={data}
            onNav={(n) => {
              if (n === "flashcards") setScreen("flashcards-pick");
              if (n === "match") setScreen("match-pick");
              if (n === "quiz") setScreen("quiz-pick");
              if (n === "rhymes") setScreen("rhymes");
            }}
            onSwitch={() => {
              setProfile(null);
              setScreen("dashboard");
            }}
          />
        )}

        {profile && screen === "flashcards-pick" && (
          <WeekPicker
            title="Flashcards"
            color={profile.accent}
            onBack={() => setScreen("dashboard")}
            onPick={(w) => {
              setActiveWeek(w);
              setScreen("flashcards");
            }}
          />
        )}

        {profile && screen === "flashcards" && activeWeek && (
          <Flashcards
            week={activeWeek}
            profile={profile}
            onBack={() => setScreen("flashcards-pick")}
            onEarnStars={(n, msg) => {
              handleEarnStars(n, msg);
              setScreen("flashcards-pick");
            }}
          />
        )}

        {profile && screen === "match-pick" && (
          <WeekPicker
            title="Match-Up"
            color={profile.accent}
            onBack={() => setScreen("dashboard")}
            onPick={(w) => {
              setActiveWeek(w);
              setScreen("match");
            }}
          />
        )}

        {profile && screen === "match" && activeWeek && (
          <MatchUp
            week={activeWeek}
            profile={profile}
            onBack={() => setScreen("match-pick")}
            onEarnStars={handleEarnStars}
          />
        )}

        {profile && screen === "quiz-pick" && (
          <WeekPicker
            title="Quick Quiz"
            color={profile.accent}
            onBack={() => setScreen("dashboard")}
            onPick={(w) => {
              setActiveWeek(w);
              setScreen("quiz");
            }}
          />
        )}

        {profile && screen === "quiz" && activeWeek && (
          <Quiz
            week={activeWeek}
            profile={profile}
            onBack={() => setScreen("quiz-pick")}
            onEarnStars={handleEarnStars}
          />
        )}

        {profile && screen === "rhymes" && (
          <Rhymes
            profile={profile}
            data={data}
            onBack={() => setScreen("dashboard")}
            onEarnStars={handleEarnStars}
          />
        )}

        {toast && (
          <StarToast
            msg={toast.msg}
            stars={toast.stars}
            onClose={() => setToast(null)}
          />
        )}
        <Confetti show={confetti} />
      </div>
    </>
  );
}
