export default function useLocalstorage() {
  const setValues = (value) => {
    sessionStorage.setItem("permissions", JSON.stringify(value));
  };
  const getValues = () => {
    const permissions = sessionStorage.getItem("permissions");
    return permissions ? JSON.parse(permissions) : undefined;
  };
  return {
    setValues,
    getValues,
  };
}
