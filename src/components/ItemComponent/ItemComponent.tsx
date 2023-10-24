import React, {useState} from 'react';
import {ITable} from "../../interfaces/tableInterfaces";
import {Button, TableCell, TableRow} from "@mui/material";
import {useAppDispatch} from "../../hooks";
import {tableActions} from "../../redux/slices/tableSlice";
import "./ItemComponent.css"

interface ItemProps {
    item: ITable;
}

const ItemComponent: React.FC<ItemProps> = ({item}) => {
    const [editingRowId, setEditingRowId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState<ITable | null>(null);
    const dispatch = useAppDispatch();

    const startEditing = (id: number, data: ITable) => {
        setEditingRowId(id);
        setEditedData({ ...data });
    };

    const cancelEditing = () => {
        setEditingRowId(null);
        setEditedData(null);
    };

    const saveEditedData = () => {
        if (editedData) {
            dispatch(tableActions.updateById({id: item.id, newDate: editedData}))
        }
    };

    return (
        <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>
                {editingRowId === item.id ? (
                    <input
                        type="text"
                        value={editedData?.name || ""}
                        onChange={(e) => setEditedData(
                            { ...editedData, name: e.target.value })}
                    />
                ) : (
                    item.name
                )}
            </TableCell>
            <TableCell>
                {editingRowId === item.id ? (
                    <input
                        type="text"
                        value={editedData?.email || ""}
                        onChange={(e) => setEditedData(
                            { ...editedData, email: e.target.value })}
                    />
                ) : (
                    item.email
                )}
            </TableCell>
            <TableCell>
                {editingRowId === item.id ? (
                    <input
                        type="text"
                        value={editedData?.birthday_date || ""}
                        onChange={(e) => setEditedData(
                            { ...editedData, birthday_date: e.target.value })}
                    />
                ) : (
                    item.birthday_date
                )}
            </TableCell>
            <TableCell>
                {editingRowId === item.id ? (
                    <input
                        type="text"
                        value={editedData?.phone_number || ""}
                        onChange={(e) => setEditedData(
                            { ...editedData, phone_number: e.target.value })}
                    />
                ) : (
                    item.phone_number
                )}
            </TableCell>
            <TableCell>
                {editingRowId === item.id ? (
                    <input
                        type="text"
                        value={editedData?.address || ""}
                        onChange={(e) => setEditedData(
                            { ...editedData, address: e.target.value })}
                    />
                ) : (
                    item.address
                )}
            </TableCell>
            <TableCell>
                {editingRowId === item.id ? (
                    <div className="buttonBox">
                        <Button variant="contained" color="primary" onClick={saveEditedData} className="button">
                            Save
                        </Button>
                        <Button variant="contained" color="secondary" onClick={cancelEditing} className="button">
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <Button variant="contained" color="primary" onClick={() =>
                        startEditing(item.id as number, item)} className="button">
                        Edit
                    </Button>

                )}
            </TableCell>
        </TableRow>
    );
};

export  {ItemComponent};