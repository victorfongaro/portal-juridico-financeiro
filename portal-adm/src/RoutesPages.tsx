import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage'
import GenerateContract from './pages/GenerateContract'

function RoutesPages (){
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/portal-juridico-financeiro" element={<DashboardPage />} />

            <Route path="/portal-juridico-financeiro/gerar-contrato" element={<GenerateContract />} />
        </Routes>
    </BrowserRouter>
    )
}

export default RoutesPages