import React from 'react';
import CloseIcon from 'react-ionicons/lib/MdClose';
import { Dialog } from '../Dialog';
import { Button, IconButton } from '../Button';

export const ConfirmationDialog = ({
  show,
  title,
  message,
  onClose,
  onConfirm,
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog show={show}>
      <div className="dialog-header">
        <h4>{title}</h4>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className="dialog-message">
        <p>{message}</p>
      </div>

      <div className="dialog-actions">
        <Button
          onClick={onClose}
          size="small"
          color="primary"
          variant="outlined"
        >
          Cancelar
        </Button>
        <Button onClick={handleConfirm} size="small" color="secondary">
          Deletar
        </Button>
      </div>
    </Dialog>
  );
};
