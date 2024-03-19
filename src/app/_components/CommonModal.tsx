import React from "react";
import { Modal, ModalProps } from "antd";

const CommonModal: React.FC<CommonModalProps> = ({
  children,
  open,
  ...otherProps
}) => {
  return (
    <Modal
      title=""
      open={open}
      destroyOnClose={true}
      closeIcon={false}
      footer={null}
      {...otherProps}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;

interface CommonModalProps extends ModalProps {}
