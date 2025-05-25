const convertToISO=(dateString)=>{
    const date = new Date(dateString);
    return date.toISOString();
}

module.exports = { convertToISO };
