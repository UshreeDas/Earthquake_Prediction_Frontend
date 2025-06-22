export default function FilterControls({ years, selectedYear, setSelectedYear }) {
  return (
    <div className="mb-6">
      <label className="text-sm font-semibold mr-2">Filter by Year:</label>
      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(Number(e.target.value))}
        className="border p-2 rounded"
      >
        <option value="">All</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
}
