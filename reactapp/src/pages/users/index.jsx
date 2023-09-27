import { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import { Box, Typography, useTheme, Modal } from "@mui/material";
import Button from '@mui/material/Button';
import {
    GridRowModes, DataGrid, GridToolbar, GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons, 
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarDensitySelector,
    deDE,
} from "@mui/x-data-grid";
import { tokens } from "../../theme";
import UserService from "../../services/userService.js";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { createPortal } from "react-dom";
import AddUserModal from "../users/AddUserModal";
import cookies from 'js-cookie';

function EditToolbar(props) {
    const [modalOpen, setModalOpen] = useState(false);
    const { t } = useTranslation();
    
    const handleSubmitButtonClick = (value) => {
        setModalOpen(false);
        console.log("submit clicked");
    };

    
    const handleOpen = () => setModalOpen(true);
    const handleClose = () => {
        console.log("submit");
        setModalOpen(false);
    }

    return (
        <div>
            <GridToolbarContainer  >
                <Button color="primary" startIcon={<AddIcon />}
                    onClick={handleOpen}
                >
                    {t('usr_pge_dg_add_record_text')}
                    
                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton/>
                <GridToolbarDensitySelector/>
            </GridToolbarContainer>
            {modalOpen &&
                createPortal(
                    <AddUserModal open={modalOpen} onClose={handleClose} onSubmit={handleSubmitButtonClick} />,
                    document.body
                )}
        </div>
    );
}



const Users = () => {
    const currentLanguageCode = cookies.get('i18next') || 'en';
    const [users, setUsers] = useState([]);
    const [language, setLanguages] = useState();
    const { i18n, t } = useTranslation();

    useEffect(() => {
        UserService.getAll()
            .then(response => {
                setUsers(response.data);
            })           
            .catch(e => {
                console.log(e);
            });

    }, []);

    
    const handleGridLanguage = () => {
        if (currentLanguageCode == 'en') {
            setLanguages();

        } else {
            setLanguages(deDE.components.MuiDataGrid.defaultProps.localeText);
        }
    }
    useEffect(() => {
        handleGridLanguage();
    }, [currentLanguageCode, t]);
    

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [rows, setRows] = useState(users);
    const [rowModesModel, setRowModesModel] = useState({});
   

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
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

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const columns = [
        { field: "id", headerName: t('usr_pge_dg_cln_id_hdr_text'), editable: true },
        {
            field: "name",
            headerName: t('usr_pge_dg_cln_name_hdr_text'),
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "age",
            headerName: t('usr_pge_dg_cln_age_hdr_text'),
            type: "number",
            headerAlign: "left",
            align: "left",
        },
        {
            field: "phone",
            headerName: t('usr_pge_dg_cln_phone_hdr_text'),
            flex: 1,
        },
        {
            field: "email",
            headerName: t('usr_pge_dg_cln_email_hdr_text'),
            flex: 1,
        },
        {
            field: "accessLevel",
            headerName: t('usr_pge_dg_cln_access_lvl_hdr_text'),
            flex: 1,
            renderCell: ({ row: { access } }) => {
                return (
                    <Box
                        width="60%"
                        m="0 auto"
                        p="5px"
                        display="flex"
                        justifyContent="center"
                        backgroundColor={
                            access === "admin"
                                ? colors.greenAccent[600]
                                : access === "manager"
                                    ? colors.greenAccent[700]
                                    : colors.greenAccent[700]
                        }
                        borderRadius="4px"
                    >
                        {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
                        {access === "manager" && <SecurityOutlinedIcon />}
                        {access === "user" && <LockOpenOutlinedIcon />}
                        <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
                            {access}
                        </Typography>
                    </Box>
                );
            },
        },
        {
            field: 'actions',
            type: 'actions',
            headerName: t('usr_pge_dg_cln_action_hdr_text'),
            width: 100,
            cellClassName: 'actions',
            getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label={t('usr_pge_dg_action_save_text')}
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                                label={t('usr_pge_dg_action_edit_cancel_text')}
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label={t('usr_pge_dg_action_edit_text')}
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label={t('usr_pge_dg_action_delete_text')}
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        }
    ];

    return (
        <Box m="20px">
            <Header title={t('user_page_hdr_title')} subtitle={t('user_page_hdr_sub_title')} />
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
                <DataGrid checkboxSelection
                    rows={users}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                    
                    editMode="row"
                    rowModesModel={rowModesModel}
                    onRowModesModelChange={handleRowModesModelChange}
                    onRowEditStop={handleRowEditStop}
                    processRowUpdate={processRowUpdate}
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    slotProps={{
                        toolbar: { setRows, setRowModesModel },
                    }}
                    localeText={language}
                />
            </Box>
        </Box>
    );
};

export default Users;
