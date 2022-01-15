const userDataService = (route: any) => {
  const url = `http://localhost:8000/${route}`;
  return url;
};
const authService = (route: any) => {
  const url = `http://localhost:4000/${route}`;
  return url;
};

export { userDataService, authService };
