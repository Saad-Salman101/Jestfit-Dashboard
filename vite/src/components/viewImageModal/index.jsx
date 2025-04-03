import React, { useState } from 'react';
import { Modal, Backdrop, Fade, Box, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const ImageModal = ({ imageUrl, open, handleClose }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: "auto",
                        maxWidth: '90%',
                        maxHeight: '90%',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                        outline: 'none',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        onClick={handleClose}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            color: 'grey.500',
                        }}
                    >
                        <CloseIcon />
                    </IconButton>
                    <img
                        src={imageUrl}
                        alt="modal content"
                        style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain' }}
                    />
                </Box>
            </Fade>
        </Modal>
    );
};

export default ImageModal;