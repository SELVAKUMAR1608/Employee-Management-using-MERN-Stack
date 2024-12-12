import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';

function SearchEmp() {
  let location = useLocation();
  let query = new URLSearchParams(location.search).get('query');
  let [results, setResults] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token")
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees',
          {
            headers: { "authorization": `Bearer ${token}` }
          }
        );
        const filtered = response.data.filter(
          (item) =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.email.toLowerCase().includes(query.toLowerCase()) ||
            item.mobile.includes(query) ||
            item.destination.toLowerCase().includes(query.toLowerCase()) ||
            (Array.isArray(item.course) ? item.course.join(', ').toLowerCase() : item.course.toLowerCase()).includes(query)
        );
        setResults(filtered);
      } catch (error) {
        console.error('Error fetching search results:', error.message);
      }
    };

    if (query) fetchSearchResults();
  }, [query]);
  return (
    <TableContainer component={Paper} sx={{ marginTop: '20px' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>S.No</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Mobile</TableCell>
            <TableCell>Destination</TableCell>
            <TableCell>Course</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.length > 0 ? (
            results.map((data, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{data.name}</TableCell>
                <TableCell>
                  <img src={data.poster} alt="Employee" style={{ width: '100px' }} />
                </TableCell>
                <TableCell>{data.email}</TableCell>
                <TableCell>{data.mobile}</TableCell>
                <TableCell>{data.destination}</TableCell>
                <TableCell>{Array.isArray(data.course) ? data.course.join(', ') : data.course}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                No results found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default SearchEmp