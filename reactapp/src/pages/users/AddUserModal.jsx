import React, { useState } from "react";
import "../users/AddUserModal.css";
import Box from "@mui/material/Box";
import Textfield from '../../components/Textfield';
import { Grid, Typography, } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Modal from '@mui/material/Modal';

const AddUserModal = ({ open, onSubmit, onClose, closeModal, children }) => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        phone: "",
        email: "",
        accesslevel: ""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(`Name: ${formData.name},
                Age:${formData.age}, 
                Phone:${formData.phone},
                Email: ${formData.email}, 
                Accesslevel: ${formData.accesslevel}`
        );
        onSubmit();
    };
    const handleCancel = (event) => {
        event.preventDefault();
        onClose();
        console.log(event);
    };

    
    const handleFirstNameChange = (e) => {
        setFormData({
            ...formData,
            name: e.target.value
        });
    }
    
    const handleAgeChange = (e) => {
        setFormData({
            ...formData,
            age: e.target.value
        });
    }

    const handlePhoneNumberChange = (e) => {
        setFormData({
            ...formData,
            phone: e.target.value
        });
    }

    const handleEmailChange = (e) => {
        setFormData({
            ...formData,
            email: e.target.value
        });
    }

    const handleAccessLevelChange = (e) => {
        setFormData({
            ...formData,
            accesslevel: e.target.value
        });
    }
    const INITIAL_FORM_STATE = {
        name: '',
        age: '',
        phone: '',
        email: '',
        accessLevel: ''
    };

    const FORM_VALIDATION = Yup.object().shape({
        name: Yup.string()
            .required('Required'),
        age: Yup.string()
            .required('Required'),
        email: Yup.string()
            .email('Invalid email.')
            .required('Required'),
        phone: Yup.number()
            .integer()
            .typeError('Please enter a valid phone number')
            .required('Required'),
        accessLevel: Yup.string(),
       
    });
    
    return (
            <Modal
            open={open}
            className="modal modal-container"
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            <Box >
                    <Formik
                        initialValues={{
                            ...INITIAL_FORM_STATE
                        }}
                        validationSchema={FORM_VALIDATION}
                        onSubmit={handleSubmit}
                    >
                        <Form>

                            <Grid item xs={6}>
                                <Textfield
                                name="name"
                                value={formData.name}
                                label="First Name"
                                onChange={handleFirstNameChange}
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <Textfield
                                    name="age"
                                label="Age"
                                value={formData.age}
                                    onChange={handleAgeChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Textfield
                                    name="phone"
                                label="Phone"
                                value={formData.phone}
                                    onChange={handlePhoneNumberChange}
                                />

                            </Grid>

                            <Grid item xs={12}>
                                <Textfield
                                    name="email"
                                label="Email"
                                value={formData.email}
                                    onChange={handleEmailChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Textfield
                                    name="accesslevel"
                                label="Access Level"
                                value={formData.accesslevel}
                                    onChange={handleAccessLevelChange}
                               
                                />
                            </Grid>
                        </Form>
                    </Formik>

                        <div className="modal-footer">
                            <button
                                type="submit"
                                className="btn btn-submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                            <button
                                type="submit"
                        className="btn btn-cancel"
                        onClick={handleCancel}
                        
                            >
                                Cancel
                            </button>
                        </div>
                </Box>
            </Modal>

    );
};
export default AddUserModal;