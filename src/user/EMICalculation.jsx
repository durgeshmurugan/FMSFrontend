
export const calculateEMI = (price, months) => {
    return (price / months).toFixed(2);
}
