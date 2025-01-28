module.exports = {
    formatDate: (date) => {
        return new Date(date).toISOString().split('T')[0];
    },
    capitalize: (str) => {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
};
