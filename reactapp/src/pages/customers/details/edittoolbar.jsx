import { useState } from "react";
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
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import { createPortal } from "react-dom";
import cookies from 'js-cookie';
import AddNewCustomer from "../add/AddNewCustomer";


const CustomerDGEditToolbar = ({ handleGridRefresh, handleGridEditRefresh }) => {
    
    const [openPopup, setOpenPopup] = useState(false);
    const { t } = useTranslation();

    const handleSubmitButtonClick = (value) => {
        setOpenPopup(false);
        handleGridRefresh();
    };

    const handleOpen = () => setOpenPopup(true);
    const handleClose = () => {
        setOpenPopup(false);
    }

    return (
        <div>
            <GridToolbarContainer>
                <Button color="primary" startIcon={<AddIcon />}
                        onClick={handleOpen}
                >
                    {t('customers_pge_dg_add_record_text')}

                </Button>
                <GridToolbarColumnsButton />
                <GridToolbarFilterButton />
                <GridToolbarDensitySelector />
            </GridToolbarContainer>
            {openPopup &&
                createPortal(
                    <AddNewCustomer open={true}
                        onClose={handleClose}
                        onSubmit={handleSubmitButtonClick} />,
                    document.body
                )}
        </div>
    );
};

export default CustomerDGEditToolbar;
