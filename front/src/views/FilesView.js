import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Col, Row, Spinner } from "react-bootstrap";
import MyTable from "../components/Table/MyTable";
import { getFiles } from "../reducers/filesReducer";
import CustomForm from "../components/Form/Form";

const getFileLinesColumns = (lines, fileName) => {
  return lines.map((line, index) => (
    <tr key={fileName + index}>
      <td>{fileName}</td>
      <td>{line.text}</td>
      <td>{line.number}</td>
      <td>{line.hex}</td>
    </tr>
  ));
};

const fields = [{ name: "fileName", type: "text", placeholder: "File Name" }];
const tableHeaders = ["File", "Text", "Number", "Hex"];

const FilesTableView = () => {
  const dispatch = useDispatch();
  const filesState = useSelector(state => state.files);

  const handleSubmit = formData => {
    const { fileName } = formData;
    dispatch(getFiles(fileName));
  };

  useEffect(() => {
    dispatch(getFiles());
  }, []);

  return (
    <Fragment>
      <Row className="mb-3">
        <Col xs="auto">
          <CustomForm
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Search"
            submitDisabled={filesState.isLoading}
          />
        </Col>
      </Row>
      {filesState.isLoading && Loader()}
      {!filesState.isLoading && filesState.errorLoading && (
        <Alert variant="danger">
          Oops! seems something went wrong, try again
        </Alert>
      )}
      {!filesState.isLoading && !filesState.errorLoading && (
        <MyTable
          headers={tableHeaders}
          items={filesState.files}
          itemsComposition={item => getFileLinesColumns(item.lines, item.file)}
        ></MyTable>
      )}
    </Fragment>
  );
};

const Loader = () => (
  <Row className="justify-content-md-center">
    <Col xs="auto">
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading Files...</span>
      </Spinner>
    </Col>
    <Col xs="auto">Loading Files..</Col>
  </Row>
);

export default FilesTableView;
