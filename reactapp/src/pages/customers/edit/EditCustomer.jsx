import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { 
    Grid, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Divider,    
    CardActions
} from '@mui/material';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Textfield from "../../../components/Textfield";
import Button from "@mui/material/Button";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomerService from "../../../services/customerService";

const useStyles = styled(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5)
    },
    dialogTitle: {
        paddingRight: '0px'
    }
}));

const EditCustomer = ({ open, onSubmit, onClose, row  }) => {

    const { t } = useTranslation();
       
    const INITIAL_FORM_STATE = {
        id: row.id===undefined ? "": row.id,
        name: row.name===undefined ? "":row.name,
        shortName: row.shortName===undefined ? "":row.shortName,
        number: row.number===undefined ? "": row.number,
        taxNumber: row.taxNumber===undefined ? "": row.taxNumber,
        address:{
            id: row.address===undefined ? "": row.address.id===undefined ? "": row.address.id,
            customerId: row.address===undefined ? "": row.address.customerId===undefined ? "": row.address.customerId,
            streetAndNumber: row.address===undefined ? "": row.address.streetAndNumber===undefined ? "": row.address.streetAndNumber,
            zip: row.address===undefined ? "": row.address.zip===undefined ? "": row.address.zip,
            city: row.address===undefined ? "": row.address.city===undefined ? "": row.address.city,
            country: row.address===undefined ? "": row.address.country===undefined ? "": row.address.country
        },
    };

    const FORM_VALIDATION = Yup.object().shape({
        name: Yup.string()
            .required(t('application_validation_required')),
        shortName: Yup.string()
            .required(t('application_validation_required')),
        number: Yup.number()
            .required(t('application_validation_required')),
        taxNumber: Yup.number()
            .integer()
            .typeError(t('application_valid_tax_number_message'))
            .required(t('application_validation_required')),
    });
   
    const handleSubmit = (values) => {
        CustomerService.updateCustomer(values)
            .then(response => {
                onSubmit();
            })
            .catch(e => {
                console.log(e);
            });
    }
    const handleCancel = (event) => {
        event.preventDefault();
        onClose();
    };

    return (
        <Dialog open={open} maxWidth="md" aria-labelledby="edit-apartment">
            <DialogTitle>
                <div>
                    {t('customers_pge_edit_title')}
                </div>
            </DialogTitle>
            <DialogContent>
                <div>
                    <Box>
                        <Formik                          
                            initialValues={{
                                ...INITIAL_FORM_STATE
                            }}
                            validationSchema={FORM_VALIDATION}
                            onSubmit={handleSubmit}
                        >
                            {({
                                  errors,
                                  handleBlur,
                                  handleChange,
                                  handleSubmit,
                                  isSubmitting,
                                  isValid,
                                  dirty,
                                  touched,
                                  values
                              }) => (
                            <Form>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Textfield
                                            autoFocus
                                            name="name"
                                            value={values.name}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_name_hdr_text')}
                                            onChange={handleChange}
                                    />
                                    </Grid>
                                    <Grid item xs={6}>
                                    <Textfield autoFocus
                                            name="shortName"
                                            value={values.shortName}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_short_name_hdr_text')}
                                            onChange={handleChange}
                                    />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield autoFocus
                                            name="number"
                                            value={values.number}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_number_hdr_text')}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield autoFocus
                                            name="taxNumber"
                                            value={values.taxNumber}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_tax_number_hdr_text')}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield 
                                            name="address.streetAndNumber"
                                            value={values.address.streetAndNumber}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_street_hdr_text')}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield 
                                            name="address.zip"
                                            value={values.address.zip}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_zip_hdr_text')}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield 
                                            name="address.city"
                                            value={values.address.city}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_city_hdr_text')}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Textfield 
                                            name="address.country"
                                            value={values.address.country}
                                            margin="dense"
                                            label={t('customers_pge_dg_cln_country_hdr_text')}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                </Grid>
                                <Divider />
                                <CardActions  disableSpacing
                                              sx={{
                                                  alignSelf: "stretch",
                                                  display: "flex",
                                                  justifyContent: "flex-end",
                                                  alignItems: "flex-start",
                                                  // 👇 Edit padding to further adjust position
                                                  p: 0,
                                              }}>
                                    <Button onClick={handleCancel} color= "primary">
                                        {t('customers_pge_dg_action_edit_cancel_text')}
                                    </Button>
                                    <Button 
                                            type="submit"
                                            color="secondary"
                                    >
                                        {t('customers_pge_dg_action_save_text')}
                                    </Button>
                                </CardActions>
                            </Form>
                            )}
                        </Formik>
                    </Box>
                </div>
            </DialogContent>
            <DialogActions>
               
            </DialogActions>
        </Dialog>
    );
};

export default EditCustomer;