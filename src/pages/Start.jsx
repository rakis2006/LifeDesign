import { Link, useNavigate } from "react-router-dom";
import { startGuestMode } from "../lib/storage";

function Start() {
  const navigate = useNavigate();

  const handleGuestStart = () => {
    startGuestMode();
    navigate("/values", { replace: true });
  };

  return (
    <main className="page-shell">
      <section className="panel start-panel">
        <div className="start-copy" aria-label="start-copy">
          <p className="start-lead">多くの人は<br />自分の人生を生きていません。</p>

          <ul className="start-list">
            <li>世間の評価</li>
            <li>親の期待</li>
            <li>他人の評価</li>
          </ul>

          <p>で作られた目標を追いかけています。</p>

          <p>
            これからする質問で<br />
            <strong>あなたの本当の目標</strong><br />
            を見つけます。
          </p>
        </div>

        <button type="button" className="btn btn-primary start-button" onClick={handleGuestStart}>
          【ゲストで始める】
        </button>

        <p className="start-subtext">【ゲストで始める】で最初からやり直せます</p>

        <Link to="/login" className="start-login-link">ログインして続きから</Link>
      </section>
    </main>
  );
}

export default Start;
