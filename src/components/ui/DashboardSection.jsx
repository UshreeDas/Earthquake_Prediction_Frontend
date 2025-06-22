// src/Component/Utils/DashboardSection.jsx
export default function DashboardSection({ title, children, className = "" }) {
  return (
    <div className={`bg-white rounded-md shadow p-4 ${className}`}>
      {title && <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>}
      {children}
    </div>
  );
}
