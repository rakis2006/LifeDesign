import { Link, useNavigate } from "react-router-dom";
import { QUESTION_FLOW } from "../lib/questionFlow";
import { getFlowAnswers, getMode, getTodayTasks } from "../lib/storage";

function DashboardPage() {
  const navigate = useNavigate();
  const flowAnswers = getFlowAnswers();
  const tasks = getTodayTasks();
  const doneCount = tasks.filter((task) => task.done).length;
  const mode = getMode();

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="header-row">
          <h1>ステータス</h1>
          <div className="header-actions">
            <button type="button" className="btn btn-primary" onClick={() => navigate("/login")}>
              ログイン
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/", { replace: true })}>
              開始ページへ
            </button>
          </div>
        </div>

        <p className="subtitle">
          LifeDesignで人生に熱中しよう{mode === "guest" ? "（ゲストモード）" : ""}
        </p>

        <div className="card-grid">
          <Link to="/values/vision" className="card-link">
            <article className="card">
              <h2>6つの質問</h2>
              <span className="card-action">編集する</span>
            </article>
          </Link>

          <article className="card">
            <h2>今日の行動</h2>
            <p>{doneCount} / 3 完了</p>
            <div className="today-preview">
              {tasks.map((task, index) => (
                <div className="task-row" key={index}>
                  <input type="checkbox" checked={task.done} readOnly aria-label={`dashboard-task-${index + 1}`} />
                  <input type="text" value={task.text} placeholder={`タスク ${index + 1}`} readOnly />
                </div>
              ))}
            </div>
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/today")}>
              編集する
            </button>
          </article>
        </div>

        <section className="answers-section">
          <h2>質問フローの回答一覧</h2>
          <div className="answers-grid">
            {QUESTION_FLOW.map((step, index) => (
              <article key={step.id} className="answer-item">
                <p className="answer-label">{index + 1}. {step.title}</p>
                <p className="answer-value">{flowAnswers[step.id] || "未入力"}</p>
              </article>
            ))}
          </div>
        </section>

        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => navigate("/", { replace: true })}
          >
            ログインしてクラウド保存（将来）
          </button>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;