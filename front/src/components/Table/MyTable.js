import React, { Fragment } from "react";
import Table from "react-bootstrap/Table";

const TableHead = ({ headers }) => (
  <thead>
    <tr>
      {headers.map((header, index) => (
        <th key={index}>{header}</th>
      ))}
    </tr>
  </thead>
);

const MyTable = ({ headers, items, itemsComposition }) => {
  return (
    <Table striped bordered hover responsive>
      <TableHead headers={headers} />
      <tbody>{items.map(item => itemsComposition(item))}</tbody>
    </Table>
  );
};

export default MyTable;
