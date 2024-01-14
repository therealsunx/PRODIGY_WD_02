import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const [time, setTime] = useState(0);
  const [laps, setLaps] = useState([]);

  const [timerOn, setTimerOn] = useState(false);

  useEffect(() => {
    let _i;
    if (timerOn) {
      _i = setInterval(() => {
        setTime((p) => p + 1);
      }, 10)
    }

    return () => clearInterval(_i);
  }, [timerOn]);

  const formatTime = (ms) => {
    const s = Math.floor(ms / 100);
    const m = Math.floor(s / 60);
    const h = Math.floor(m / 60);

    return `${String(h).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}:${String(ms % 100).padStart(2, '0')}`;
  };

  return (
    <div className='w-screen min-h-screen bg-black flex flex-col gap-16 items-center justify-start text-white'>

      <p className="font-bold text-4xl lg:text-6xl lg:my-20 w-fit">StopWatch</p>

      <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 px-12 lg:px-24 w-full'>

        <div className='flex flex-1 flex-col items-center text-center gap-4 bg-[#111] p-12 rounded-2xl h-fit'>

          <div className='flex flex-col'>
            <p className='text-2xl font-bold px-10 py-4 border-4 border-[#0aa] rounded-full'>{formatTime(time)}</p>
            <div className='py-6 flex justify-between gap-6'>
              <button className={`px-12 py-4 rounded-full ${timerOn ? 'bg-[#a00]' : 'bg-[#0aa]'}`} onClick={() => setTimerOn(!timerOn)}>{timerOn ? "Stop" : "Go On"}</button>
              <button className={`px-12 py-4 rounded-full ${timerOn ? 'bg-[#f44]' : 'bg-[#811]'}`} onClick={() => { setTime(0); setLaps([]); }}>Reset</button>
            </div>
            <button className={`px-12 py-4 rounded-full ${timerOn ? 'bg-[#0aa]' : 'bg-[#444] text-[#aaa]'}`} onClick={() => timerOn ? setLaps([...laps, time]) : null}>Lap</button>
          </div>

        </div>

        <div className='flex flex-1 flex-col flex-wrap overflow-y-scroll text-center p-6 lg:p-12 bg-[#111] rounded-2xl'>
          <p className='font-bold text-xl mb-8 '>Laps</p>
          {laps.map((l, i) => (
            <p key={i}>{formatTime(l)}</p>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;
