"use client";

export default function Input({
  label,
  register,
  name,
  type = "text",
  placeholder,
  errors,
  rules = {},
}) {
  return (
    <div className="mb-4">
      <label className="block mb-1 font-semibold text-sm">{label}</label>

      <input
        {...register(name, rules)}
        type={type}
        className="w-full p-3 rounded-xl bg-white/20 focus:outline-none shadow-inner border border-gray-300"
        placeholder={placeholder}
      />

      {errors[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </p>
      )}
    </div>
  );
}
