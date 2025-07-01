export default function FilterControls({ years, selectedYear, setSelectedYear }) {
  return (
 
      
      <select
  value={selectedYear}
  onChange={(e) => setSelectedYear(Number(e.target.value))}
  className="h-9 px-4 border rounded-md font-semibold text-black bg-white border-[#005F73] hover:border-[#EE9B00]  "
>
        <option value="">All</option>
        {years.map((year) => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
  
  );
}
