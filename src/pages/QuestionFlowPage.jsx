import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { QUESTION_FLOW, QUESTION_FLOW_TOTAL } from "../lib/questionFlow";
import { getFlowAnswers, setFlowAnswer } from "../lib/storage";

function QuestionFlowPage() {
  const { stepId } = useParams();
  const navigate = useNavigate();

  const currentIndex = QUESTION_FLOW.findIndex((step) => step.id === stepId);
  const currentStep = currentIndex >= 0 ? QUESTION_FLOW[currentIndex] : null;

  const answers = useMemo(() => getFlowAnswers(), []);
  const [answer, setAnswer] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [showReason, setShowReason] = useState(false);

  useEffect(() => {
    if (!currentStep) {
      return;
    }
    setAnswer(answers[currentStep.id] ?? "");
    setShowExample(false);
    setShowReason(false);
  }, [answers, currentStep]);

  if (!currentStep) {
    return <Navigate to="/values/vision" replace />;
  }

  const persistCurrent = () => {
    setFlowAnswer(currentStep.id, answer.trim());
  };

  const handleBack = () => {
    persistCurrent();
    const prevStep = QUESTION_FLOW[currentIndex - 1];
    if (prevStep) {
      navigate(`/values/${prevStep.id}`);
      return;
    }
    navigate("/", { replace: true });
  };

  const handleNext = () => {
    persistCurrent();
    const nextStep = QUESTION_FLOW[currentIndex + 1];
    if (nextStep) {
      navigate(`/values/${nextStep.id}`);
      return;
    }
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="page-shell">
      <section className="panel question-panel">
        <p className="progress-badge">{currentIndex + 1}/{QUESTION_FLOW_TOTAL}</p>
        <h1 className="question-title">{currentStep.title}</h1>
        <p className="question-text">{currentStep.question}</p>

        <div className="qa-info-block">
          <p className="qa-label">具体例（ヒント）</p>
          <button type="button" className="btn btn-why" onClick={() => setShowExample((prev) => !prev)}>
            具体例（ヒント）を{showExample ? "閉じる" : "開く"}
          </button>
          {showExample ? <p className="qa-details">{currentStep.exampleDetails}</p> : null}
        </div>

        <div className="qa-info-block">
          <p className="qa-label">この質問の意味</p>
          <button type="button" className="btn btn-why" onClick={() => setShowReason((prev) => !prev)}>
            この質問の意味を{showReason ? "閉じる" : "開く"}
          </button>
          {showReason ? <p className="qa-details">{currentStep.reasonDetails}</p> : null}
        </div>

        <label className="field">
          <span>回答</span>
          <textarea
            rows="7"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            placeholder="ここに入力"
          />
        </label>

        <div className="row-actions">
          <button type="button" className="btn btn-secondary" onClick={handleBack}>戻る</button>
          <button type="button" className="btn btn-primary" onClick={handleNext}>次へ</button>
        </div>
      </section>
    </main>
  );
}

export default QuestionFlowPage;