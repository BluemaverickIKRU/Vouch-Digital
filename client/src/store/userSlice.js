import { createSlice } from '@reduxjs/toolkit';

// Slice containing user info and table data
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    tableData: [],
    isLogged: false,
  },
  reducers: {
    // To mutate the data of isLogged when a user logs 'on' or 'off'
    logOnOff: (state, action) => {
      if (action.payload) {
        state.isLogged = action.payload;
      } else {
        state.isLogged = action.payload;
        state.tableData = [];
        state.userInfo = {};
      }
    },
    // Set table data with the actual data from the database
    setTableData: (state, action) => {
      state.tableData.push(action.payload);
    },
    // Updates the user info when a user logs in
    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
    initiateTableData: (state, action) => {
      state.tableData = action.payload;
    },
  },
});

export const { logOnOff, setTableData, updateUser, initiateTableData } =
  userSlice.actions;

export default userSlice.reducer;
