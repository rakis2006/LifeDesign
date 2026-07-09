import logoMark from "../assets/lifedesign-mark.png";

function LifeDesignLogo({ className = "" }) {
  return (
    <div className={`ld-logo ${className}`.trim()}>
      <span className="ld-logo-mark-wrap">
        <img className="ld-logo-image" src={logoMark} alt="LifeDesign logo" />
      </span>
      <span className="ld-logo-copy">
        <span className="ld-logo-title">LifeDesign</span>
        <span className="ld-logo-tagline">Play Your Life</span>
      </span>
    </div>
  );
}

export default LifeDesignLogo;
