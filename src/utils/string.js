module.exports = {
    convertToPath: (str) => str.substr(0, 1).toLowerCase() + str.substr(1).replace(/([A-Z])/g, (match, p1, offset, string) => '-' + p1.toLowerCase()),
    convertToModule: (str) => str.substr(0, 1).toUpperCase() + str.substr(1).replace(/(\-([a-z]))/g, (match, p1, p2, offset, string) => p2.toUpperCase())
}
