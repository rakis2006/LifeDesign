import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldReason from "../components/FieldReason";
import { getTodayTasks, setTodayTasks } from "../lib/storage";

function TodayPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState(getTodayTasks());

  const updateTaskText = (index, text) => {
    setTasks((current) => current.map((task, currentIndex) => (currentIndex === index ? { ...task, text } : task)));
  };

  const toggleDone = (index) => {
    setTasks((current) =>
      current.map((task, currentIndex) =>
        currentIndex === index ? { ...task, done: !task.done } : task
      )
    );
  };

  const save = () => {
    setTodayTasks(tasks);
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="page-shell">
      <section className="panel">
        <h1>今日の行動</h1>
        <p className="subtitle">今日やる3つを具体化する</p>
        <div className="form-grid">
          {tasks.map((task, index) => (
            <div className="task-entry" key={index}>
              <div className="task-row">
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleDone(index)}
                  aria-label={`task-${index + 1}-done`}
                />
                <input
                  type="text"
                  value={task.text}
                  onChange={(event) => updateTaskText(index, event.target.value)}
                  placeholder={`タスク ${index + 1}`}
                />
              </div>
              <FieldReason
                helper="目標を実行に変えるため、今日やることを明確にするためです。"
                details="3つに絞ることで、優先順位が定まり着手が速くなります。\n完了チェックを残すと、達成感と振り返りの材料が同時に得られます。"
              />
            </div>
          ))}
          <div className="row-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>キャンセル</button>
            <button type="button" className="btn btn-primary" onClick={save}>保存して戻る</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default TodayPage;