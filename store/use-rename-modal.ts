import { create } from "zustand";

const defaultValues = {
    id: "",
    title: "",
}

interface IRenameModal {
    isOpen: boolean;
    initialValues: typeof defaultValues;
    onClose: () => void;
    onOpen: (id: string, title: string) => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
    isOpen: false,
    initialValues: defaultValues,
    onClose: () => set({ isOpen: false, initialValues: defaultValues }),
    onOpen: (id, title) => set({ isOpen: true, initialValues: { id, title } }),
}));
