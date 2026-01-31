export function Table({ columns, data }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-text/10">
      <table className="min-w-full">
        <thead className="bg-primary ">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className="px-4 py-3 text-left text-md font-semibold text-white border-t border-primary"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-t border-text/10 hover:bg-text/5 transition ${
                rowIndex % 2 === 0 ? "bg-bg" : "bg-bg-secondary"
              }`}
            >
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="px-4 py-3 text-sm text-text">
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : String(row[col.accessor])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
