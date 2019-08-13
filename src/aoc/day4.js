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
      acc.push({ date: val.date, guardId: val.guardId, ranges: [] });
      return acc;
    }
    if (!val.asleep) {
      const prev = self[index - 1];
      acc[acc.length - 1].ranges.push({ start: prev.date, end: val.date });
    }

    return acc;
  }, []);

const addTimeMostAsleep = i =>
  i.map(val => {
    const minutesAsleep = val.ranges.reduce(
      (aslp, range) =>
        aslp + (range.end.getTime() - range.start.getTime()) / 1000 / 60,
      0
    );
    return { ...val, minutesAsleep };
  }, []);

const addMinuteMostAsleep = i => i.sort((a, b) => a.guardId - b.guardId);

const res = addMinuteMostAsleep(
  addTimeMostAsleep(getRanges(getSort(getParse(testInput))))
);
console.log("res", res);
// console.log(getSort(getParse(testInput)));
