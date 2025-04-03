
import { createSlice } from '@reduxjs/toolkit';
import config from 'config';


export const initialState = {
    isOpen: [], // for active default menu
    defaultId: 'default',
    fontFamily: config.fontFamily,
    borderRadius: config.borderRadius,
    opened: true
};


const NewCustomizationReducer = createSlice({
    name: "Customization",
    initialState,
    reducers: {
        menuOpen(state, action) {
            state.isOpen = [action.payload.id]
        },
        setMenu(state, action) {
            state.opened = action.payload.opened
        },
        setFontFamily(state, action) {
            state.fontFamily = action.payload.fontFamily
        },
        setBorderRadius(state, action) {
            state.borderRadius = action.payload.borderRadius
        },
    },
});

export const {
    menuOpen,
    setMenu,
    setBorderRadius,
    setFontFamily
} = NewCustomizationReducer.actions





export default NewCustomizationReducer.reducer