import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { tableActions } from '../../redux/slices/tableSlice';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ItemComponent } from '../ItemComponent/ItemComponent';
import { PaginationComponent } from '../PaginationComponent/PaginationComponent';
import './TableComponent.css'

const TableComponent: FC = () => {
    const dispatch = useAppDispatch();
    const { table } = useAppSelector((state) => state.tableReducer);

    useEffect(() => {
        dispatch(tableActions.getAll());
    }, [dispatch]);


    return (
        <TableContainer component={Paper} style={{ height: '100vh' }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Birthday Date</TableCell>
                        <TableCell>Phone Number</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {table.map((item) => (
                        <ItemComponent item={item} key={item.id} />
                    ))}
                </TableBody>
            </Table>
            <div className="paginationContainer">
                <PaginationComponent />
            </div>
        </TableContainer>
    );
};

export { TableComponent };