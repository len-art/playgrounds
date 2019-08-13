const testInput = `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;

const getParse = i =>
  i.split(/\n/).map(l => {
    let [year, month, day, hour, minute] = l.substr(1, 16).split(/\D/);
    const rest = l.substr(19);
    if (parseInt(hour) > 1) {
      day = (parseInt(day) + 1).toString();
      hour = "00";
      minute = "00";
    }
    return {
      year,
      month,
      day,
      hour,
      minute,
      originalTime: l.substr(1, 16),
      date: new Date(Date.UTC(year, month - 1, day, hour, minute)),
      guardId: parseInt(rest.replace(/\D/g, "")),
      asleep: rest === "falls asleep",
      rest
    };
  });

const getSort = i => i.sort((a, b) => a.date.getTime() - b.date.getTime());

const getRanges = i =>
  i.reduce((acc, val, index, self) => {
    if (!Number.isNaN(val.guardId)) {
      acc.push({ ...val, date: val.date, guardId: val.guardId, ranges: [] });
      return acc;
    }
    if (!val.asleep) {
      const prev = self[index - 1];
      acc[acc.length - 1].ranges.push({ start: prev, end: val });
    }

    return acc;
  }, []);

const addTimeMostAsleep = i =>
  i.map(val => {
    const minutesAsleep = val.ranges.reduce(
      (aslp, range) =>
        aslp +
        (range.end.date.getTime() - range.start.date.getTime()) / 1000 / 60,
      0
    );
    return { ...val, minutesAsleep };
  }, []);

const getMinutesInRange = (s, e) => {
  const start = new Date(s.originalTime).getMinutes();
  const end = new Date(e.originalTime).getMinutes();
  return Array.from(
    new Array(parseInt(end) - parseInt(start)),
    (_, i) => start + i
  );
};

const getMinuteMostAsleep = i =>
  i
    .sort((a, b) => a.guardId - b.guardId)
    .reduce((acc, val, index) => {
      console.log(val);
      let guardIndex = acc.findIndex(e => e.guardId === val.guardId);
      if (guardIndex === -1) {
        acc.push({ ...val, guardId: val.guardId, ranges: [] });
        guardIndex = acc.length - 1;
      }
      acc[guardIndex].ranges.push(...val.ranges);

      return acc;
    }, [])
    .map(v => {
      // TODO: find duplicates
      const ranges = v.ranges.map(i => getMinutesInRange(i.start, i.end));
      /* ranges = [[[range], [range],...], [[range], [range], ...]] */

      // const duplicates = ranges.map((v, single, s) => s.filter((_, ind) => ind !== i).reduce((acc, otherSingle) => {
      //   return single.filter(x => otherSingle.filter())
      // }, []))
      // console.log(duplicates)
    });
// .map(v => {
//   return { guardId: v.guardId };
// })

const res = getMinuteMostAsleep(
  addTimeMostAsleep(getRanges(getSort(getParse(testInput))))
);
console.log("res", res);
// console.log(getSort(getParse(testInput)));
