const walletReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ACCOUNT":
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
    case "REMOVE_ACCOUNT":
      return {
        ...state,
        accounts: state.accounts.filter(
          (account) => account.id !== action.payload
        ),
      };
    case "SET_PROVIDER":
      return {
        ...state,
        provider: action.payload,
      };
    case "SET_ACCOUNT_SELECTED":
      return {
        ...state,
        accountSelected: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
