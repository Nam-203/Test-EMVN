import { Table } from "antd";
import  { useState } from "react";


const TableComponent = (props) => {
  const {
    selectionType = "checkbox",
    data: dataSource = [],
    isLoading = false,
    columns = [],
    handleDeleteMany,
    onRow,
  } = props;
  const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
 
  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setRowSelectedKeys(selectedRowKeys);
    },
  };
  const handleDeleteAll = () => {
    handleDeleteMany(rowSelectedKeys);
  };


  return (
    <>
      {!!rowSelectedKeys.length && (
        <>
          <div
            style={{
              background: "#1d1ddd",
              color: "#fff",
              fontWeight: "bold",
              padding: "10px",
              cursor: "pointer",
            }}
            onClick={handleDeleteAll}
          >
            Delete All
          </div>
        </>
      )}
      <Table
        rowSelection={{
          type: selectionType,
          ...rowSelection,
        }}
        columns={columns}
        dataSource={dataSource}
        onRow={onRow}
        loading={isLoading}
      />
    </>
  );
};
export default TableComponent;