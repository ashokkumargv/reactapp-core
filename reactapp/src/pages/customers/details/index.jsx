import { useEffect, useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme, Modal } from "@mui/material";
import Button from '@mui/material/Button';
import {
    GridRowModes, DataGrid, 
    GridToolbar, 
    GridActionsCellItem,
    deDE,
} from "@mui/x-data-grid";
import CustomerDGEditToolbar from "./edittoolbar";
import { tokens } from "../../../theme";
import CustomerService from "../../../services/customerService";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import cookies from 'js-cookie';
import EditCustomer from "../edit/EditCustomer";


const Customers = () => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const [customers, setCustomers] = useState([]);
    const [language, setLanguages] = useState();
    const [rowModesModel, setRowModesModel] = useState({});
    const [openEditPopup, setOpenEditPopup] = useState(false);
    const { t } = useTranslation();
    const firstUpdate = useRef(true);

    
    useEffect(() => {
       
        if (firstUpdate.current) {
            firstUpdate.current = false;
            CustomerService.getAll()
                .then(response => {
                    setCustomers(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        
        if (currentLanguageCode === 'en') {
            setLanguages();

        } else {
            setLanguages(deDE.components.MuiDataGrid.defaultProps.localeText);
            }
        }

    }, []);

    const handleGridLanguage = () => {
        if (currentLanguageCode === 'en') {
            setLanguages();

        } else {
            setLanguages(deDE.components.MuiDataGrid.defaultProps.localeText);
        }
    };

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (param) => {
        console.log("handleEditClick::" + param);
        setOpenEditPopup(true);
    };


    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleGridRefresh = () => {
        CustomerService.getAll()
            .then(response => {
                setCustomers(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const handleGridEditRefresh = () => {
        console.log("Hello handleGridEditRefresh");
        CustomerService.getAll()
            .then(response => {
                setCustomers(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const handleEditCancel = () => {
        setOpenEditPopup(false);
    }
    const handleEditSubmit = (value) => {
        setOpenEditPopup(false);
        handleGridRefresh();
    };

   const currentlySelected = (params) => {
       if (!(params.field === "edit" || params.field === "delete")) {
           return;
       }
       if (params.field === "edit")
       {
           setOpenEditPopup(true);
           setRowModesModel(params.row);
       }
       if (params.field === "delete")
       {
           console.log("Hello handleGridDeleteRefresh");
           console.log(params.row);
           CustomerService.DeleteCustomer(params.row.id)
               .then(response => {
                   handleGridRefresh();
               })
               .catch(e => {
                   console.log(e);
               });
       }
       
    };

    const columns = [
        {
            field: "id", 
            headerName: t('customers_pge_dg_cln_id_hdr_text'),
            editable: false

        },
        {
            field: "name",
            headerName: t('customers_pge_dg_cln_name_hdr_text'),
            flex: 1,
            cellClassName: "name-column--cell",
            valueGetter: (params) => {
                return params.row.name;
            }
        },
        {
            field: "shortName",
            headerName: t('customers_pge_dg_cln_short_name_hdr_text'),
            flex: 1
        },
        {
            field: "number",
            headerName: t('customers_pge_dg_cln_number_hdr_text'),
            flex: 1,
        },
        {
            field: "taxNumber",
            headerName: t('customers_pge_dg_cln_tax_number_hdr_text'),
            flex: 1,
        },
        {
            field: "streetAndNumber",
            headerName: t('customers_pge_dg_cln_street_hdr_text'),
            flex: 1,
            valueGetter: (params) => {
                return params.row.address.streetAndNumber;
            }
        },
        {
            field: "zip",
            headerName: t('customers_pge_dg_cln_zip_hdr_text'),
            flex: 1,
            valueGetter: (params) => {
                return params.row.address.zip;
            }
        },
        {
            field: "city",
            headerName: t('customers_pge_dg_cln_city_hdr_text'),
            flex: 1,
            valueGetter: (params) => {
                return params.row.address.city;
            }
        },
        {
            field: "country",
            headerName: t('customers_pge_dg_cln_country_hdr_text'),
            flex: 1,
            valueGetter: (params) => {
                return params.row.address.country;
            }
        },
        {
            field: 'edit',
            headerName: t('customers_pge_dg_cln_action_hdr_text'),
            width: 100,
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            renderCell: (params) =>
            (
                <div>
                    <Button variant="contained" color="primary" startIcon={<EditIcon />}>
                        Edit
                    </Button>
                </div>
            )
        },
        {
            field: 'delete',
            headerName: t('customers_pge_dg_cln_action_hdr_text'),
            width: 100,
            cellClassName: 'actions',
            disableClickEventBubbling: true,
            renderCell: (params) =>
                (
                    <div>
                        <Button variant="contained" color="primary" startIcon={<DeleteIcon />}>
                            Delete
                        </Button>
                    </div>
                )
        }
    ];

    return (
        <Box m="20px">
            <Header title={t('customers_page_hdr_title')} subtitle={t('customers_page_hdr_sub_title')} />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <div>
                    <EditCustomer open={openEditPopup}
                        onClose={handleEditCancel}
                        onSubmit={handleEditSubmit} 
                        row={rowModesModel}
                    />
                <DataGrid 
                    rows={customers}
                    columns={columns}
                    editMode="row"
                    onCellClick={currentlySelected}
                    components={{
                        Toolbar: CustomerDGEditToolbar,
                    }}
                    componentsProps={{ toolbar: { handleGridRefresh, handleGridEditRefresh } }}
                    localeText={language}                   
                />
                </div>
            </Box>
        </Box>
    );
};

export default Customers;
