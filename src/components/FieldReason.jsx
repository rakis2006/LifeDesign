import { useState } from "react";

function FieldReason({ helper, details }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="reason-block">
      <p className="reason-helper">{helper}</p>
      <button
        type="button"
        className="btn btn-why"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
      >
        なぜ？
      </button>
      {open ? <p className="reason-detail">{details}</p> : null}
    </div>
  );
}

export default FieldReason;