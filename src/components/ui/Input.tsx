import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-carbon">
        {label}
        {props.required && <span className="text-forest"> *</span>}
      </label>
      <input
        id={inputId}
        className={cn(
          "w-full rounded-lg border border-border-light bg-porcelain px-4 py-3 text-base text-carbon placeholder:text-stone/60 transition-colors focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, className, id, ...props }: TextareaProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-carbon">
        {label}
        {props.required && <span className="text-forest"> *</span>}
      </label>
      <textarea
        id={inputId}
        className={cn(
          "min-h-[120px] w-full resize-y rounded-lg border border-border-light bg-porcelain px-4 py-3 text-base text-carbon placeholder:text-stone/60 transition-colors focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest",
          error && "border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
}

export function Select({
  label,
  error,
  options,
  placeholder,
  className,
  id,
  ...props
}: SelectProps) {
  const inputId = id ?? props.name;

  return (
    <div className="space-y-1.5">
      <label htmlFor={inputId} className="block text-sm font-medium text-carbon">
        {label}
        {props.required && <span className="text-forest"> *</span>}
      </label>
      <select
        id={inputId}
        className={cn(
          "w-full appearance-none rounded-lg border border-border-light bg-porcelain px-4 py-3 text-base text-carbon transition-colors focus:border-forest focus:outline-none focus:ring-1 focus:ring-forest",
          error && "border-red-500",
          className
        )}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
