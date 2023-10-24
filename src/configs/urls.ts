const baseURL:string = "https://technical-task-api.icapgroupgmbh.com/api"

const urls = {
    login: `${baseURL}/login/`,
    table: `${baseURL}/table/`,
    tableById:(id:number | undefined) => `${baseURL}/table/${id}/`,
}

export { baseURL, urls}