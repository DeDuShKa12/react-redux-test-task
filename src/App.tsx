import React, { FC } from 'react';
import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { AuthRequireLayout } from "./layouts/AuthRequireLayout";
import { TablePage } from "./pages/TablePage/TablePage";


const App: FC = () => {

    return (
        <div className="App">
            <Routes>
                <Route path={'/'} element={<MainLayout />}>
                    <Route index element={<Navigate to={'login'} />}/>
                    <Route path={'login'} element={<LoginPage />}/>

                    <Route element={<AuthRequireLayout />}>
                        <Route path={'table'} element={<TablePage />}/>
                    </Route>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
