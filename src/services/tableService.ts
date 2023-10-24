import {urls} from "../configs";
import {ITable} from "../interfaces/tableInterfaces";
import {axiosService} from "./authService";

const tableServices = {
    getAll: () => axiosService.get(urls.table),
    loadPage: (number: number) => axiosService.get(`${urls.table}?limit=10&offset=${number}`),
    updateById: (id: number | undefined, newDate: ITable) => axiosService.patch(urls.tableById(id), newDate),
}

export {
    tableServices
}