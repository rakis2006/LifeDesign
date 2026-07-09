import { useNavigate } from "react-router-dom";
import { FaBullseye, FaRoute, FaShieldHalved, FaTrophy } from "react-icons/fa6";
import LifeDesignLogo from "../components/LifeDesignLogo";
import "../styles/StartScreen.css";

const STEP_ITEMS = [
  { id: "win", title: "人生の勝利条件", subtitle: "あなたの人生のゴール", icon: FaTrophy, tone: "win" },
  { id: "lose", title: "敗北条件", subtitle: "避けたい人生の結末", icon: FaShieldHalved, tone: "lose" },
  { id: "mission", title: "ミッション", subtitle: "今年の最重要目標", icon: FaBullseye, tone: "mission" },
  { id: "quest", title: "クエスト", subtitle: "今日やる行動", icon: FaRoute, tone: "quest" },
];

function StartScreen() {
  const navigate = useNavigate();

  return (
    <main className="start-screen-page">
      <div className="start-screen-cloud cloud-a" aria-hidden="true" />
      <div className="start-screen-cloud cloud-b" aria-hidden="true" />
      <div className="start-screen-cloud cloud-c" aria-hidden="true" />
      <div className="start-screen-ground" aria-hidden="true" />

      <section className="start-screen-wrap">
        <div className="start-brand-left">
          <LifeDesignLogo />
          <button type="button" className="start-top-login" onClick={() => navigate("/login")}>
            ログイン
          </button>
        </div>

        <header className="start-hero">
          <p className="hero-lead">人生をゲーム化しませんか？</p>

          <section className="start-stepper" aria-label="4つのステップ">
            {STEP_ITEMS.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === STEP_ITEMS.length - 1;
              return (
                <article className="start-step-item" key={step.id}>
                  <div className={`step-node ${step.tone}`}>
                    <Icon aria-hidden="true" />
                  </div>
                  <div className="step-card">
                    <p className="step-card-title">{step.title}</p>
                    <p className="step-card-subtitle">{step.subtitle}</p>
                  </div>
                  {!isLast ? <span className="step-flow" aria-hidden="true">↓</span> : null}
                </article>
              );
            })}
          </section>

          <section className="hero-explain">
            <p className="hero-body hero-explain-intro">
              もし今の人生に満足しているなら、
              <br />
              このアプリは必要ありません。
            </p>
            <p className="hero-body hero-explain-if">でももし、</p>
            <ul className="hero-list hero-explain-list">
              <li>人生に違和感がある</li>
              <li>自分の人生を生きていない</li>
              <li>毎日がただ過ぎていく</li>
            </ul>
            <p className="hero-body hero-explain-then">そう感じているなら、</p>
            <p className="hero-title">
              人生をゲーム化し、人生を時間を忘れて楽しめるようにしましょう
            </p>
          </section>
        </header>
      </section>
    </main>
  );
}

export default StartScreen;
