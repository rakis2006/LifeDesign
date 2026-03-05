import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPlan, setPlan } from "../lib/storage";

function PlanPage() {
  const navigate = useNavigate();
  const [plan, setPlanState] = useState(getPlan());

  const update = (field, value) => {
    setPlanState((current) => ({ ...current, [field]: value }));
  };

  const save = () => {
    setPlan(plan);
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="page-shell">
      <section className="panel">
        <h1>人生設計入力</h1>
        <p className="subtitle">ビジョンから今月までをつなぐ</p>
        <div className="form-grid">
          <label className="field">
            <span>vision</span>
            <textarea rows="3" value={plan.vision} onChange={(event) => update("vision", event.target.value)} />
          </label>
          <label className="field">
            <span>yearGoal</span>
            <input type="text" value={plan.yearGoal} onChange={(event) => update("yearGoal", event.target.value)} />
          </label>
          <label className="field">
            <span>monthGoal</span>
            <input type="text" value={plan.monthGoal} onChange={(event) => update("monthGoal", event.target.value)} />
          </label>
          <div className="row-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate("/dashboard")}>キャンセル</button>
            <button type="button" className="btn btn-primary" onClick={save}>保存して戻る</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default PlanPage;
