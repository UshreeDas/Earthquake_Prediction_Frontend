export default function FilterControls({ years, selectedYear, setSelectedYear }) {
  return (
 
      
      <select
  value={selectedYear}
  onChange={(e) => setSelectedYear(Number(e.target.value))}
  className="h-9 px-4 border rounded-md font-semibold text-black bg-white border-black-300 hover:border-red-400  "
>
        <option value="">All</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
  
  );
}
