export default function FilterControls({ years, selectedYear, setSelectedYear }) {
  return (
 
      
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
  
  );
}
