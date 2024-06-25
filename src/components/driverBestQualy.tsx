import { QualyResults, Race } from "@/util/fetchDriverQualyResults";
import Image from "next/image";

interface Props {
  driverQaulyResults: QualyResults | null;
}

export default function DriverBestQualy({ driverQaulyResults }: Props) {
  const bestResult = driverQaulyResults?.races.reduce(
    (previousValue: string, race) => {
      const position = race.qualifyingResults?.[0]?.position || "22";

      return Number(position) < Number(previousValue)
        ? position
        : previousValue;
    },
    "22" // highest grid position by default
  );

  const worstResult = driverQaulyResults?.races.reduce(
    (previousValue: string, race) => {
      const position = race.qualifyingResults?.[0]?.position;

      return Number(position) > Number(previousValue)
        ? position
        : previousValue;
    },
    "1" // lowest grid position by default
  );

  const lastRaceResult =
    driverQaulyResults?.races[driverQaulyResults?.races?.length - 1]
      .qualifyingResults[0].position;

  return (
    <div className="w-full h-full rounded-md shadow-mine text-gray-600 bg-[#5d87ff] space-y-2 p-4 pt-2 dark:shadow-none border dark:border-opacity-20 dark:border-dark transition-all duration-500">
      <p className="text-white font-semibold">Qualifying Stats</p>
      <div className="relative h-[90px] w-[90px] mx-auto">
        <Image className="" src="/f1Wheel.png" alt="f1 wheel" fill />
      </div>
      <div className="bg-white px-4 rounded-lg dark:bg-dark transition-colors duration-700">
        <div className="text-sm font-semibold text-gray-500 pt-2 flex items-center dark:text-gray-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-7 w-7 mr-2 fill-green-500"
          >
            <path d="M479.87-341.54q40.44 0 72.17-24.65 31.73-24.66 46.42-61.96H361.54q14.69 37.3 46.29 61.96 31.59 24.65 72.04 24.65Zm-84.3-141.54q18.66 0 31.55-13.06Q440-509.21 440-527.87q0-18.67-13.07-31.55-13.06-12.89-31.73-12.89-18.66 0-31.55 13.07-12.88 13.06-12.88 31.73 0 18.66 13.06 31.55 13.07 12.88 31.74 12.88Zm169.23 0q18.66 0 31.55-13.06 12.88-13.07 12.88-31.73 0-18.67-13.06-31.55-13.07-12.89-31.74-12.89-18.66 0-31.55 13.07Q520-546.18 520-527.51q0 18.66 13.07 31.55 13.06 12.88 31.73 12.88ZM325-676.31l104.31-138.84q9.54-12.83 22.65-18.84Q465.08-840 480-840t28.04 6.01q13.11 6.01 22.65 18.84L635-676.31l160.77 54.69q21.38 7.24 32.92 24.24 11.54 17.01 11.54 37.58 0 9.49-2.78 18.85-2.78 9.37-9.14 17.95L722.92-380.08l4 153.23q1 28.19-18.65 47.52Q688.62-160 662.54-160q.31 0-18.16-2.23L480-210.69l-164.38 48.46q-5 2-9.65 2.11-4.64.12-8.51.12-26.61 0-46-19.33-19.38-19.33-18.38-47.52l4-154.23L131.92-523q-6.36-8.66-9.14-18.11Q120-550.55 120-560q0-20.25 11.86-37.67 11.87-17.42 33.14-24.71l160-53.93Zm25.15 34.39-171.69 57.84q-11.54 3.85-15.77 15.77-4.23 11.93 3.46 21.93l111.7 153.61-4.77 166.39q-.77 13.07 9.23 20.76 10 7.7 22.31 3.85L480-252.15l175.38 51.38q12.31 3.85 22.31-3.85 10-7.69 9.23-20.76l-4.77-167.39 111.7-151.61q7.69-10 3.46-21.93-4.23-11.92-15.77-15.77l-171.69-59.84-110.62-147.31q-6.92-10-19.23-10t-19.23 10L350.15-641.92ZM480-499.23Z" />
          </svg>
          <p>Best:</p>
          <p className="bg-[#43ff8241] text-green-600 px-4 py-1.5 rounded font-semibold ml-auto w-[65px] text-center">
            {bestResult}
          </p>
        </div>
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 pt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-7 w-7 mr-2 fill-blue-500"
          >
            <path d="M296.15-240v-40h290.16q62.23 0 106.04-42.69 43.8-42.69 43.8-104.23 0-61.54-43.8-103.85-43.81-42.31-106.04-42.31H276.62l118.61 118.62-28.31 28.31L200-593.08 366.92-760l28.31 28.31-118.61 118.61h309.69q78.54 0 134.19 54.16 55.65 54.15 55.65 132 0 77.84-55.65 132.38Q664.85-240 586.31-240H296.15Z" />
          </svg>
          <p>Last Race:</p>
          <p className="bg-[#487cff2f] text-blue-600 px-4 py-1.5 rounded font-semibold ml-auto w-[65px] text-center">
            {lastRaceResult}
          </p>
        </div>
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 pt-2 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-7 w-7 mr-2 fill-red-500"
          >
            <path d="M480-301.54q10.46 0 17.54-7.08 7.08-7.07 7.08-17.53 0-10.47-7.08-17.54-7.08-7.08-17.54-7.08-10.46 0-17.54 7.08-7.08 7.07-7.08 17.54 0 10.46 7.08 17.53 7.08 7.08 17.54 7.08Zm-20-132.31h40v-240h-40v240ZM480.13-120q-74.67 0-140.41-28.34-65.73-28.34-114.36-76.92-48.63-48.58-76.99-114.26Q120-405.19 120-479.87q0-74.67 28.34-140.41 28.34-65.73 76.92-114.36 48.58-48.63 114.26-76.99Q405.19-840 479.87-840q74.67 0 140.41 28.34 65.73 28.34 114.36 76.92 48.63 48.58 76.99 114.26Q840-554.81 840-480.13q0 74.67-28.34 140.41-28.34 65.73-76.92 114.36-48.58 48.63-114.26 76.99Q554.81-120 480.13-120Zm-.13-40q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
          <p>Worst:</p>
          <p className="bg-[#ff46462a] dark:bg-[#ff46464d] text-red-600 px-4 py-1.5 rounded font-semibold ml-auto w-[65px] text-center">
            {worstResult}
          </p>
        </div>
        <div className="text-sm font-semibold text-gray-500 dark:text-gray-400 pt-2 flex items-center pb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="h-7 w-7 mr-2 fill-yellow-500"
          >
            <path d="M280-200v-32.31L523.85-480 280-727.69V-760h400v50H364.08l225 230-225 230.77H680V-200H280Z" />
          </svg>
          <p>Average:</p>
          <p className="bg-[#fffbc3] dark:bg-[#fff34d6c] dark:text-yellow-400 text-yellow-600 px-4 py-1.5 rounded font-semibold ml-auto w-[65px] text-center">
            {calculateAverageRaceResult(driverQaulyResults?.races)}
          </p>
        </div>
      </div>
    </div>
  );
}

function calculateAverageRaceResult(arr: Race[] | undefined) {
  // Check if the array is empty
  if (!arr || arr.length === 0) return 0;

  // Sum all numbers in the array
  const sum = arr.reduce(
    (acc, currentRace) =>
      acc + Number(currentRace.qualifyingResults[0].position),
    0
  );

  // Divide the sum by the number of elements to get the average
  const average = sum / arr.length;

  return average.toFixed(1);
}
