"use client";

import { useEffect, useState } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 2);
    endDate.setHours(23, 59, 59, 999);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = endDate.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-3 text-lg">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-yellow-400">{timeLeft.days}</span>
        <span className="text-xs uppercase tracking-wider text-gray-400">Days</span>
      </div>
      <span className="text-xl text-gray-600 mt-[-4px]">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-yellow-400">{timeLeft.hours.toString().padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider text-gray-400">Hours</span>
      </div>
      <span className="text-xl text-gray-600 mt-[-4px]">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-yellow-400">{timeLeft.minutes.toString().padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider text-gray-400">Minutes</span>
      </div>
      <span className="text-xl text-gray-600 mt-[-4px]">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-bold text-yellow-400">{timeLeft.seconds.toString().padStart(2, '0')}</span>
        <span className="text-xs uppercase tracking-wider text-gray-400">Seconds</span>
      </div>
    </div>
  );
}