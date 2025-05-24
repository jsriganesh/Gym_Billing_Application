import { createSlice,PayloadAction } from "@reduxjs/toolkit"

const footerSlice = createSlice({
  name: "footer",
  initialState: {
    message: "Initial message",
    selectedFooterOption:'home'
  },
  reducers: {
    updateActiveFooter(state, action: PayloadAction<string>) {
        state.selectedFooterOption = action.payload
      }
  
  }
})
export const { updateActiveFooter } = footerSlice.actions

export default footerSlice.reducer
