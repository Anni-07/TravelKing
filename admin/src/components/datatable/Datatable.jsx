import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { useLocation } from "react-router-dom";
import axios from "axios"; 



// This component is part of a React application that displays a list of users in a data table.
// *************  here is the flow of how the data is fetched and displayed:
// 1. The `Datatable` component uses the `useFetch` hook to fetch user data from an API endpoint. 

// Browser URL:
// → http://localhost:3001/users

// Frontend:
// → React router shows <UserList />
// → <UserList /> renders <Datatable />
// → Datatable fetches from /api/users
// → Proxy sends it to backend at http://localhost:8000/api/users

// Backend:
// → Express fetches from MongoDB
// → Sends user list as JSON
// → React displays the users in a table


const API = process.env.REACT_APP_API_URL;

const Datatable = ({columns}) => {
  const location  = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
// const {data, loading, error} = useFetch(`/api/${path}`); // this will fetch user data from the API endpoint
 const { data, loading, error } = useFetch(`/${path}`);


 useEffect(()=>{
  setList(data)
 },[data])

  const handleDelete = async (id) => {
    try{
      // await axios.delete(`/${path}/${id}`)

      // await axios.delete(`/api/${path}/${id}`); // this will send a DELETE request to the backend to delete a user by ID
        await axios.delete(`${API}/${path}/${id}`);

      setList(list.filter((item) => item._id !== id));
    }
    catch(err){}
     };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        Add New {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id} // Assuming your user data has a unique _id field
      />
    </div>
  );
};

export default Datatable;
