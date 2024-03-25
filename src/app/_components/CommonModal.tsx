import React from "react";
import { Modal, ModalProps } from "antd";
import { twMerge } from "tailwind-merge";

const CommonModal: React.FC<ModalProps> = ({
  children,
  open,
  className,
  ...otherProps
}) => {
  return (
    <Modal
      title=""
      open={open}
      destroyOnClose={true}
      closeIcon={false}
      footer={null}
      className={twMerge("h-[calc(100svh-200px)] flex items-center", className)}
      {...otherProps}
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
