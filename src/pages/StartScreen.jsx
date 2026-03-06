import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTION_FLOW } from "../lib/questionFlow";
import { getFlowAnswers, setFlowAnswers } from "../lib/storage";
import "../styles/StartScreen.css";

function StartScreen() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState(getFlowAnswers());

  const updateAnswer = (id, value) => {
    setAnswers((current) => {
      const next = { ...current, [id]: value };
      setFlowAnswers(next);
      return next;
    });
  };

  return (
    <main className="start-screen-page">
      <div className="start-screen-cloud cloud-a" aria-hidden="true" />
      <div className="start-screen-cloud cloud-b" aria-hidden="true" />
      <div className="start-screen-cloud cloud-c" aria-hidden="true" />
      <div className="start-screen-ground" aria-hidden="true" />

      <section className="start-screen-wrap">
        <div className="start-brand-left">
          <h1>LifeDesign</h1>
          <p>Play Your Life</p>
          <button type="button" className="start-top-login" onClick={() => navigate("/login")}>
            ログイン
          </button>
        </div>

        <header className="start-hero">
          <p className="hero-body">
            もし今の人生に満足しているなら、<br />
            このアプリは必要ありません。
          </p>
          <p className="hero-body">でももし、</p>
          <ul className="hero-list">
            <li>人生に違和感がある</li>
            <li>自分の人生を生きていない</li>
            <li>毎日がただ過ぎていく</li>
          </ul>
          <p className="hero-body">そう感じているなら、</p>
          <p className="hero-title">人生をゲームとして設計してみませんか？</p>

          <section className="start-questions">
            <p className="start-questions-title">6つの質問</p>
            <div className="start-questions-grid">
              {QUESTION_FLOW.map((step, index) => (
                <article className="start-question-item" key={step.id}>
                  <p className="start-question-label">{index + 1}. {step.title}</p>
                  <p className="start-question-text">{step.question}</p>
                  <textarea
                    rows="3"
                    value={answers[step.id] || ""}
                    onChange={(event) => updateAnswer(step.id, event.target.value)}
                    placeholder="ここに回答を入力"
                  />
                </article>
              ))}
            </div>
          </section>
        </header>
      </section>
    </main>
  );
}

export default StartScreen;
