import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { QUESTION_FLOW } from "../lib/questionFlow";
import { getFlowAnswers, setFlowAnswers } from "../lib/storage";

function QuestionsListPage() {
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
    <main className="page-shell">
      <section className="panel">
        <div className="header-row">
          <h1>6つの質問一覧</h1>
          <button type="button" className="btn btn-ghost" onClick={() => navigate("/dashboard")}>
            戻る
          </button>
        </div>
        <p className="subtitle">この画面で6つすべて編集できます</p>

        <div className="answers-grid">
          {QUESTION_FLOW.map((step, index) => (
            <article key={step.id} className="answer-item">
              <p className="answer-label">{index + 1}. {step.title}</p>
              <p className="question-list-text">{step.question}</p>
              <label className="field">
                <span>回答</span>
                <textarea
                  rows="4"
                  value={answers[step.id] || ""}
                  onChange={(event) => updateAnswer(step.id, event.target.value)}
                  placeholder="ここに入力"
                />
              </label>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default QuestionsListPage;
