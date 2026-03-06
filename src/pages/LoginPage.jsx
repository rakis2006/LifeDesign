import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthenticated, setMode } from "../lib/storage";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("メールとパスワードを入力してください。");
      return;
    }

    setMode("user");
    setAuthenticated(true);
    navigate("/values", { replace: true });
  };

  return (
    <main className="page-shell">
      <section className="panel auth-panel">
        <h1>ログイン</h1>
        <p className="subtitle">続きから再開します</p>
        <form onSubmit={handleSubmit} className="form-grid">
          <label className="field">
            <span>メール</span>
            <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="field">
            <span>パスワード</span>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
          </label>
          {error ? <p className="error-text">{error}</p> : null}
          <button type="submit" className="btn btn-primary">ログインして始める</button>
        </form>
      </section>
    </main>
  );
}

export default LoginPage;