export interface ITable {
    name?: string | undefined;
    id?: number;
    email?: string | undefined;
    birthday_date?: string | undefined;
    phone_number?: string | undefined;
    address?: string | undefined;

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
    }

}