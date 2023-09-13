export const common = {
  errorCheck: (error) => {
    debugger;
    if (error.response.status === 403) {
      window.location.href = "/login";
    }
    console.log(error);
  },
};
