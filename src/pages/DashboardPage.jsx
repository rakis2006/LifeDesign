import { Link, useNavigate } from "react-router-dom";
import { clearAuth, getTodayTasks, getValues, getPlan } from "../lib/storage";

function DashboardPage() {
  const navigate = useNavigate();
  const valuesCount = getValues().filter((value) => value.trim() !== "").length;
  const plan = getPlan();
  const doneCount = getTodayTasks().filter((task) => task.done).length;

  const logout = () => {
    clearAuth();
    navigate("/", { replace: true });
  };

  return (
    <main className="page-shell">
      <section className="panel">
        <div className="header-row">
          <h1>Dashboard</h1>
          <button type="button" className="btn btn-ghost" onClick={logout}>ログアウト</button>
        </div>
        <p className="subtitle">FlowLifeの3つを毎日つなぐ</p>
        <div className="card-grid">
          <Link to="/values" className="card-link">
            <article className="card">
              <h2>価値観</h2>
              <p>{valuesCount} / 5 件</p>
              <span className="card-action">編集する</span>
            </article>
          </Link>
          <Link to="/plan" className="card-link">
            <article className="card">
              <h2>人生設計</h2>
              <p>{plan.vision ? "入力済み" : "未入力"}</p>
              <span className="card-action">編集する</span>
            </article>
          </Link>
          <Link to="/today" className="card-link">
            <article className="card">
              <h2>今日の行動</h2>
              <p>{doneCount} / 3 完了</p>
              <span className="card-action">編集する</span>
            </article>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default DashboardPage;
