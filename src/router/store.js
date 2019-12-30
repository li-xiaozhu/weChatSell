let eqInfo_key = 'eqInfo';

let Store = {
  setEqInfo(data) {
    sessionStorage.setItem(eqInfo_key, JSON.stringify(data))
  },
  getEqInfo() {
    return JSON.parse(sessionStorage.getItem(eqInfo_key))
  },
  delEqInfo() {
    sessionStorage.removeItemItem(eqInfo_key)
  }
};

export {Store};
