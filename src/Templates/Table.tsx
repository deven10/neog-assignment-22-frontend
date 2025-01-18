const ReactTable = ({ tableInstance }) => {
  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow } =
    tableInstance;
  return (
    <table {...getTableProps()} className="table mt-4 text-center react-table">
      <thead className="react-table_thead">
        {headerGroups.map((headerGroup, index) => (
          <tr key={index} className={``} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, idx) => {
              return (
                <th
                  key={idx}
                  className=""
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <span>
                    <span>{column.render("Header")} </span>
                    <span>
                      {column.Header === "Actions" ||
                      column.Header === "Volunteer Roles" ? (
                        ""
                      ) : column.isSorted ? (
                        column.isSortedDesc ? (
                          <span className="sorting_arrow-size">⬇</span>
                        ) : (
                          <span className="sorting_arrow-size">⬆</span>
                        )
                      ) : (
                        <span className="sorting_arrow-size">⬆⬇</span>
                      )}
                    </span>
                  </span>
                </th>
              );
            })}
          </tr>
        ))}
      </thead>
      <tbody style={{ verticalAlign: "middle" }} {...getTableBodyProps()}>
        {page.map((row, index) => {
          prepareRow(row);
          return (
            <tr className={``} {...row.getRowProps()} key={index}>
              {row.cells.map((cell, index) => {
                return (
                  <td key={index} {...cell.getCellProps()} className="">
                    {cell.render("Cell")}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default ReactTable;
