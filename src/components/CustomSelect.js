import { useEffect, useRef, useState } from "react";

export default function CustomSelect({
  value,
  onChange,
  options,
  placeholder = "Select an option",
}) {
  const [open, setOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const onDocClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const selectedOption = options.find((o) => o.value === value);

  const openMenu = () => {
    setOpen((prev) => !prev);
    if (!open) {
      const idx = Math.max(
        0,
        options.findIndex((o) => o.value === value),
      );
      setHighlightIndex(idx === -1 ? 0 : idx);
    }
  };

  const choose = (opt) => {
    onChange(opt.value);
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (
      !open &&
      (e.key === "ArrowDown" ||
        e.key === "ArrowUp" ||
        e.key === "Enter" ||
        e.key === " ")
    ) {
      e.preventDefault();
      setOpen(true);
      return;
    }
    if (!open) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((i) => (i + 1) % options.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      choose(options[highlightIndex]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`custom-select ${open ? "open" : ""}`}
      onKeyDown={onKeyDown}
    >
      <button
        type="button"
        className="custom-select-toggle manual-select manual-select-civilian"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={openMenu}
      >
        <span className="custom-select-label">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className="custom-select-caret" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <div className="custom-select-menu" role="listbox">
          {options.map((opt, idx) => (
            <div
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`custom-select-option ${value === opt.value ? "selected" : ""} ${idx === highlightIndex ? "highlight" : ""}`}
              onMouseEnter={() => setHighlightIndex(idx)}
              onClick={() => choose(opt)}
            >
              <span className="option-label">{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
