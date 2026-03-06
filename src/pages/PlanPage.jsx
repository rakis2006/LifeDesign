import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldReason from "../components/FieldReason";
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
            <FieldReason
              helper="長期の方向性を明確にし、日々の選択をそろえるためです。"
              details="理想の状態を先に言葉にすることで、年間目標や月間行動の整合性を取りやすくなります。\n迷ったときに戻れる判断基準として機能します。"
            />
          </label>
          <label className="field">
            <span>yearGoal</span>
            <input type="text" value={plan.yearGoal} onChange={(event) => update("yearGoal", event.target.value)} />
            <FieldReason
              helper="visionを1年単位の達成基準に落とし込むためです。"
              details="1年で到達したい状態を具体化すると、進捗の確認が可能になります。\n抽象的な理想を実行可能なマイルストーンに変換する役割です。"
            />
          </label>
          <label className="field">
            <span>monthGoal</span>
            <input type="text" value={plan.monthGoal} onChange={(event) => update("monthGoal", event.target.value)} />
            <FieldReason
              helper="今月やることを絞り、実行優先度を明確にするためです。"
              details="月単位の目標は、今日の行動に直接つながる最短距離の設計図です。\n範囲を狭めることで着手しやすくなり、継続率を上げられます。"
            />
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