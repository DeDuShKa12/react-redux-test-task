export interface ITable {
    name?: string ;
    id?: number;
    email?: string;
    birthday_date?: string;
    phone_number?: string;
    address?: string;

}

export interface ITableData {
    count: number;
    next: string | null;
    previous: string | null;
    results: ITable[];
}

export interface IUpdateTable {
    id: number | undefined,
    newDate: {
        name?: string;
        email?: string;
        birthday_date?: string;
        phone_number?: string;
        address?: string;
    },
    page: number

}