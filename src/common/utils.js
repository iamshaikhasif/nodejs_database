
const id = "";

exports.setId = (id) => {
    console.log(`setid=${id}`);
    this.id = id;
}

exports.getId = () => {
    return id;
}