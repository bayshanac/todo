import { FC } from "react";
import { LuCheck, LuX } from "react-icons/lu";

import { Button as IconButton } from "@components/ui";

interface AlertDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const AlertDialog: FC<AlertDialogProps> = ({
  isOpen,
  title,
  description,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black opacity-80 z-40" />

      <div
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-lg p-6 z-50"
        data-testid="alert-dialog"
      >
        <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>

        <p className="text-sm text-gray-500 mb-6">{description}</p>

        <div className="flex justify-end gap-3">
          <IconButton
            icon={<LuX />}
            onClick={onCancel}
            variant="delete"
            className="p-3 text-xl"
            data-testid="alert-dialog-cancel-button"
          />
          <IconButton
            icon={<LuCheck />}
            onClick={onConfirm}
            className="p-3 text-xl"
            data-testid="alert-dialog-confirm-button"
          />
        </div>
      </div>
    </>
  );
};

export default AlertDialog;
