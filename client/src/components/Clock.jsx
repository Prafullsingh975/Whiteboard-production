import { useEffect, useState } from "react";
const Clock = () => {
  const [time, setTime] = useState(getTime());
  function getTime() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const date = new Date();
    const hrs = date.getHours();
    const mins = date.getMinutes();
    let d = date.getDate();
    let day = date.getDay();
    const month = months[date.getMonth()]
;    let m = "AM";
    if (hrs >= 12) {
      m = "PM";
    }
    switch (day) {
      case 0:
        day = "Sun";
        break;
      case 1:
        day = "Mon";
        break;
      case 2:
        day = "Tue";
        break;
      case 3:
        day = "Wed";
        break;
      case 4:
        day = "Thu";
        break;
      case 5:
        day = "Fri";
        break;
      case 6:
        day = "Sat";
        break;

      default:
        break;
    }

    return { time: `${hrs}:${mins} ${m}`, date: `${day}, ${month} ${d}` };
  }
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => clearInterval(timer);
  });
  return <div className="flex items-center justify-center">{time.time} <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mx-1"></div> {time.date}
  </div>;
};

export default Clock;
