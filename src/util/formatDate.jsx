export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-GB');
};
