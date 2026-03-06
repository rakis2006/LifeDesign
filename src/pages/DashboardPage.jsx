import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { QUESTION_FLOW } from "../lib/questionFlow";
import { getFlowAnswers, getMode, getTodayTasks, setTodayTasks } from "../lib/storage";

function DashboardPage() {
  const navigate = useNavigate();
  const flowAnswers = getFlowAnswers();
  const mode = getMode();
  const [tasks, setTasks] = useState(getTodayTasks());

  const doneCount = tasks.filter((task) => task.done).length;
  const visionAnswer = (flowAnswers.vision || "").trim();
  const missionAnswer = (flowAnswers.mission || "").trim();
  const monthAnswer = (flowAnswers.bossfight || "").trim();

  const updateTask = (index, patch) => {
    setTasks((current) => {
      const next = current.map((task, taskIndex) =>
        taskIndex === index ? { ...task, ...patch } : task
      );
      setTodayTasks(next);
      return next;
    });
  };

  const addTask = () => {
    setTasks((current) => {
      const next = [...current, { text: "", done: false }];
      setTodayTasks(next);
      return next;
    });
  };

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="header-row">
          <h1>人生のミッション管理</h1>
          <div className="header-actions">
            <button type="button" className="btn btn-primary" onClick={() => navigate("/login")}>ログイン</button>
            <button type="button" className="btn btn-ghost" onClick={() => navigate("/", { replace: true })}>開始ページへ</button>
          </div>
        </div>

        <p className="subtitle">
          LifeDesignで人生に熱中しよう{mode === "guest" ? "（ゲストモード）" : ""}
        </p>

        <section className="mission-goal-block">
          <p className="mission-goal-label">人生の目標</p>
          <p className="mission-goal-text">{visionAnswer || "まだ設定されていません"}</p>
          <p className="mission-goal-label" style={{ marginTop: 10 }}>1年の目標</p>
          <p className="mission-goal-subtext">{missionAnswer || "まだ設定されていません"}</p>
          <p className="mission-goal-label" style={{ marginTop: 10 }}>1か月の目標</p>
          <p className="mission-goal-subtext">{monthAnswer || "まだ設定されていません"}</p>
        </section>

        <article className="card">
          <h2>今日やるべきこと</h2>
          <p>{doneCount} / {tasks.length} 完了</p>
          <div className="today-preview">
            {tasks.map((task, index) => (
              <div className="task-row" key={index}>
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => updateTask(index, { done: !task.done })}
                  aria-label={`dashboard-task-${index + 1}`}
                />
                <input
                  type="text"
                  value={task.text}
                  placeholder={`タスク ${index + 1}`}
                  onChange={(event) => updateTask(index, { text: event.target.value })}
                />
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-secondary" onClick={addTask}>タスクを追加</button>
        </article>

        <div className="card-grid" style={{ marginTop: 12 }}>
          <Link to="/values" className="card-link">
            <article className="card">
              <h2>6つの質問一覧</h2>
              <span className="card-action">編集する</span>
            </article>
          </Link>
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
          <button type="button" className="btn btn-primary" onClick={() => navigate("/", { replace: true })}>
            ログインしてクラウド保存（将来）
          </button>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
