const valid = 351451208401216;
const initial = 1234567;
const checksum = 4;

const str = valid.toString();

const check = input => {
  const chk = input
    .slice(0, input.length - 1)
    .split("")
    .reverse()
    .map((num, i) => parseInt(i % 2 ? num : ((num * 2 - 1) % 9) + 1))
    .reduce((acc, val) => acc + val);

  const checksum = 10 - (chk % 10);
  return parseInt(input.slice(input.length - 1)) === checksum;
};

console.log(check(str));
