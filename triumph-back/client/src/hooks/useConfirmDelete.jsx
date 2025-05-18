import { useState } from 'react';
import ConfirmModal from '../components/Modals/ConfirmModal';

export function useConfirmDelete() {
  const [isOpen, setIsOpen] = useState(false);
  const [targetId, setTargetId] = useState(null);
  const [onConfirm, setOnConfirm] = useState(() => () => {});

  const openConfirm = (id, callback) => {
    setTargetId(id);
    setOnConfirm(() => () => callback(id));
    setIsOpen(true);
  };

  const handleConfirm = () => {
    onConfirm();
    setIsOpen(false);
  };

  const Confirm = () => (
    <ConfirmModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      onConfirm={handleConfirm}
    />
  );

  return { openConfirm, Confirm };
}
