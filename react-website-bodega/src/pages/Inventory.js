import '../App.css';
import Footer from '../components/Footer/Footer';
import Text from '../components/Text/Text';
import { useState } from "react";
import {DataGrid} from '@mui/x-data-grid'

const Inventory = () => {

    const columns = [
        {field: 'id',headerName: 'ID', width: 150,},
        {field: 'descrip',headerName: 'Descripción', width: 150,},
        {field: 'categoria',headerName: 'Categoría', width: 150,},
        {field: 'marca',headerName: 'Marca', width: 150,},
        {field: 'model',headerName: 'Modelo', width: 150,},
        { field: 'serie', headerName: 'Serie', width: 130 },
        {field: 'estado',headerName: 'Estado', width: 150,},
        { field: 'num_activo', headerName: 'No. Activo', width: 130 },
        {field: 'num_Tec',headerName: 'No. Activo Tec', width: 150,},
        {field: 'observa',headerName: 'Observaciones', width: 160,},
      ];

    function createData(id, categoria, estado, descrip, num_activo, marca, model, num_Tec, serie, observa) {
        return {id, categoria, estado, descrip, num_activo, marca, model, num_Tec, serie, observa};
      }
      
    const rows = [
    createData(1,"MULTIMETRO", "DISPONIBLE", "EQUIPO 1", "EQ1", "Marca A", "Modelo X", "000", "12345", "null"),
    createData(2,"GENERADOR FUNCIONES", "AGOTADO", "EQUIPO 2", "EQ2", "Marca B", "null", "null", "67890", "null")
    ];

    const [searchTerm, setSearchTerm] = useState("");
    const [searchFilter, setSearchFilter] = useState("No. Activo")


    function onSearch (){
        window.alert(searchTerm);
    }

    const handleChangeSearchBar = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleChangeSearchFilter = (event) =>{
        setSearchFilter(event.target.value);
    }

    return(
        <>
            <div style={{marginLeft: '5%', marginTop: '50px'}}>
            <Text text= "Buscar en inventario" text_style="text_title"/>
            </div>
            
            <div style={{marginBottom: '100px', marginLeft: '5%' , maxWidth: '90%'}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </div>
        <div style={{marginBottom: '0%'}}>               
        <Footer/>
        </div>
        </>
    );
}

export default Inventory;