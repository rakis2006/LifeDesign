import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FieldReason from "../components/FieldReason";
import { getValues, setValues } from "../lib/storage";

const MAX_VALUES = 5;

function ValuesPage() {
  const navigate = useNavigate();
  const initialValues = useMemo(() => {
    const storedValues = getValues().slice(0, MAX_VALUES);
    return storedValues.length ? storedValues : [""];
  }, []);

  const [values, setValuesState] = useState(initialValues);
  const [error, setError] = useState("");

  const updateValue = (index, text) => {
    setValuesState((current) => current.map((value, currentIndex) => (currentIndex === index ? text : value)));
  };

  const addValue = () => {
    if (values.length >= MAX_VALUES) {
      return;
    }
    setValuesState((current) => [...current, ""]);
  };

  const save = () => {
    const normalized = values.map((value) => value.trim()).filter((value) => value !== "");
    if (normalized.length < 3) {
      setError("3つ以上入力して");
      return;
    }

    setValues(normalized.slice(0, MAX_VALUES));
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="page-shell">
      <section className="panel">
        <h1>価値観入力</h1>
        <p className="subtitle">あなたの行動の軸を3〜5個入力</p>
        <div className="form-grid">
          {values.map((value, index) => (
            <label className="field" key={index}>
              <span>価値観 {index + 1}</span>
              <input
                type="text"
                value={value}
                maxLength={40}
                onChange={(event) => updateValue(index, event.target.value)}
              />
              <FieldReason
                helper="日々の判断を迷いなくする基準を明確にするためです。"
                details="価値観を言語化すると、目標や行動を選ぶときの優先順位がぶれにくくなります。\n3つ以上あると、状況が変わっても意思決定の軸を維持しやすくなります。"
              />
            </label>
          ))}
          <div className="row-actions">
            <button type="button" className="btn btn-secondary" onClick={addValue} disabled={values.length >= MAX_VALUES}>
              追加
            </button>
            <button type="button" className="btn btn-primary" onClick={save}>保存して戻る</button>
          </div>
          {error ? <p className="error-text">{error}</p> : null}
        </div>
      </section>
    </main>
  );
}

export default ValuesPage;