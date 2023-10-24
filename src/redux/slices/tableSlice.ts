import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import {ITable, ITableData, IUpdateTable} from "../../interfaces/tableInterfaces";
import {tableServices} from "../../services";

interface IState {
    table: ITable[];
    isLoggedIn: boolean;
    errors: null | string | unknown;
    next: string | null;
    previous: string | null;
    totalItems: number;
    currentPage: number;
    totalPages: number;
}

const initialState: IState = {
    table: [],
    errors: null,
    isLoggedIn: false,
    next: null,
    previous: null,
    totalItems: 0,
    currentPage: 1,
    totalPages: 0,
};



const getAll = createAsyncThunk<ITableData, void>(
    "tableSlice/getAll",
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await tableServices.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);


const loadNextPage = createAsyncThunk<ITableData, number>(
    "tableSlice/loadNextPage",
    async (page, { rejectWithValue }) => {
        try {
            const { data } = await tableServices.loadPage(page * 10);
            return data;
        } catch (e) {
            const err = e as AxiosError;
            return rejectWithValue(err.response?.data);
        }
    }
);


const updateById = createAsyncThunk(
    'tableSlice/updateCar',
    async ({id,newDate}: IUpdateTable,  thunkAPI) => {
        try {
            const data = await tableServices.updateById(id, newDate);
            thunkAPI.dispatch(getAll())
            return data
        } catch (e) {
            const err = e as AxiosError;
            return thunkAPI.rejectWithValue(err.response?.data);
        }

    }
);


const tableSlice = createSlice({
    name: 'tableSlice',
    initialState,
    reducers: {
        setQueryIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.table = action.payload.results
                state.previous = action.payload.previous
                state.next = action.payload.next
                state.totalItems = action.payload.count
                state.totalPages = Math.ceil(action.payload.count / 10);
            })
            .addCase(loadNextPage.fulfilled, (state, action) => {
                state.table = action.payload.results;
                state.previous = action.payload.previous;
                state.next = action.payload.next;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.errors = action.payload
            })
            .addCase(loadNextPage.rejected, (state, action) => {
                state.errors = action.payload
            })
});

const { reducer: tableReducer,
    actions: { setQueryIsLoggedIn,setCurrentPage } } = tableSlice


const tableActions = {
    getAll,
    loadNextPage,
    setQueryIsLoggedIn,
    updateById,
    setCurrentPage
}

export {
    tableReducer,
    tableActions
}