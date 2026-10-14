// Jobvia / Admin / src / components /  FormField / FileInputField.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Upload, X } from "lucide-react";

const SIZE_CONFIG = {
  xxxs: { height: 24, fontSize: 10, px: "8px" },
  xxs: { height: 28, fontSize: 11, px: "10px" },
  xs: { height: 32, fontSize: 12, px: "12px" },
  s: { height: 36, fontSize: 13, px: "14px" },
  m: { height: 40, fontSize: 14, px: "16px" },
  l: { height: 48, fontSize: 15, px: "18px" },
  xl: { height: 56, fontSize: 16, px: "20px" },
  xxl: { height: 64, fontSize: 18, px: "22px" },
  xxxl: { height: 72, fontSize: 20, px: "24px" },
};

const getSize = (sizeKey) => {
  if (!sizeKey || !SIZE_CONFIG[sizeKey]) {
    console.warn(
      `[FileInputField] "size" prop is required. Use xxxs|xxs|xs|s|m|l|xl|xxl|xxxl`,
    );
    return SIZE_CONFIG.m;
  }
  return SIZE_CONFIG[sizeKey];
};

const BP_MIN = { base: 0, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };

export const FileInputField = ({
  label,
  labelPosition = "top",
  name,
  accept,
  size,
  className = "",
  inputClassName = "",
  labelClassName = "",
  errorClassName = "",
  triggerText,
  TriggerIcon = null,
  value,
  onChange,
  error,
  ...rest
}) => {
  const rules = useMemo(() => {
    if (!size) return [{ bp: "base", value: "m" }];

    const tokens = String(size).trim().split(/\s+/);

    if (!tokens.some((t) => t.includes(":"))) {
      return [{ bp: "base", value: size }];
    }

    const out = [{ bp: "base", value: tokens[0] }];

    tokens.forEach((t) => {
      if (!t.includes(":")) return;
      const [bp, val] = t.split(":");
      if (!(bp in BP_MIN) || !val) return;
      out.push({ bp, value: val });
    });

    return out;
  }, [size]);

  const hasResponsive = rules.some((r) => r.bp !== "base");

  const [vw, setVw] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 1024,
  );

  useEffect(() => {
    if (!hasResponsive) return;
    const onResize = () => setVw(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hasResponsive]);

  const resolvedSize = useMemo(() => {
    let picked = rules[0]?.value || "m";
    rules.forEach((r) => {
      if (vw >= (BP_MIN[r.bp] ?? 0)) picked = r.value;
    });
    return picked;
  }, [rules, vw]);

  const s = getSize(resolvedSize);
  const inputRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const prevUrlRef = useRef(null);
  const previousValueRef = useRef(value);

  const updatePreview = (file) => {
    if (prevUrlRef.current) {
      URL.revokeObjectURL(prevUrlRef.current);
      prevUrlRef.current = null;
    }

    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      prevUrlRef.current = url;
    } else {
      setPreview(null);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  useEffect(() => {
    if (
      previousValueRef.current !== null &&
      previousValueRef.current !== undefined &&
      (value === null || value === undefined)
    ) {
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
        prevUrlRef.current = null;
      }

      setPreview(null);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }

    previousValueRef.current = value;
  }, [value]);

  useEffect(() => {
    return () => {
      if (prevUrlRef.current) {
        URL.revokeObjectURL(prevUrlRef.current);
      }
    };
  }, []);

  const handleFile = (file, e) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    updatePreview(file);
    onChange?.(file, e);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0], e);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const removeImage = () => {
    updatePreview(null);
    onChange?.(null);
  };

  const wrapperClass =
    labelPosition === "left" || labelPosition === "right"
      ? "flex items-center gap-3"
      : labelPosition === "top" || labelPosition === "bottom"
        ? "flex flex-col gap-2"
        : "";

  const renderLabel = label ? (
    <label htmlFor={name} className={`block ${labelClassName}`}>
      {label}
      {rest.required && <span className="text-rose-500 ml-1">*</span>}
    </label>
  ) : null;

  const renderInput = (
    <div
      className={`relative w-full border-2 border-dashed rounded-xl transition-all duration-300 ${
        dragActive
          ? "border-indigo-400 bg-indigo-50"
          : error
            ? "border-rose-300 bg-rose-50"
            : preview
              ? "border-indigo-300 bg-indigo-50/50"
              : "border-gray-300 bg-gray-50 hover:border-indigo-300"
      } ${inputClassName}`}
      style={{
        minHeight: `${s.height}px`,
        padding: `16px ${s.px}`,
      }}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={inputRef}
        id={name}
        name={name}
        type="file"
        accept={accept || "image/*"}
        className="absolute w-px h-px opacity-0"
        onChange={(e) => handleFile(e.target.files?.[0], e)}
        {...rest}
      />

      {preview ? (
        <div className="relative flex justify-center">
          <img
            src={preview}
            alt="Company logo preview"
            className="max-h-20 sm:max-h-32 rounded-lg object-contain"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 p-1 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-colors"
            aria-label="Remove image"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="text-center">
          {TriggerIcon ? (
            <TriggerIcon className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          ) : (
            <Upload className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
          )}

          <p className="mt-2 text-gray-600">
            Drag & drop an image here, or{" "}
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="text-indigo-600 hover:text-indigo-700 cursor-pointer font-bold"
              style={{ fontSize: `${s.fontSize}px` }}
            >
              {triggerText || "Browse"}
            </button>
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className={`${wrapperClass} ${className}`}>
      {labelPosition === "top" && renderLabel}
      {labelPosition === "left" && renderLabel}

      {renderInput}

      {labelPosition === "right" && renderLabel}
      {labelPosition === "bottom" && renderLabel}

      {!!error && (
        <p className={`text-rose-500 text-sm mt-1 ${errorClassName}`}>
          {error}
        </p>
      )}
    </div>
  );
};
