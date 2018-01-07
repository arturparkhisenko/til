const add = (a, b) => a + b;
module.exports.add = add;

const asyncAddCb = (a, b, cb) => {
  setTimeout(()=>{
    cb(a + b);
  }, 100);
};
module.exports.asyncAddCb = asyncAddCb;

const asyncAdd = (a, b) => Promise.resolve(a + b);
module.exports.asyncAdd = asyncAdd;

const setName = (user = {}, fullName = '') => {
  const names = fullName.split(' ');
  let result = Object.assign({}, user);
  result.firstName = names[0];
  result.secondName = names[1];
  return result;
};
module.exports.setName = setName;

// export add;

// export default {add, sub};
