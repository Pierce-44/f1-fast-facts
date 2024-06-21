import calculateAge from "@/util/calculateAge";
import { DriverResults } from "@/util/fetchDriverRaceResults";

export default function useDriverPageSlider(
  driverResults: DriverResults | null
) {
  if (!driverResults) return null;

  console.log("check", driverResults);

  const totalPoints = driverResults?.races.reduce(
    (acc, result) => acc + Number(result.results[0].points),
    0
  );

  const positionSum = driverResults?.races.reduce(
    (acc, result) => acc + Number(result.results[0].position),
    0
  );

  const gridSum = driverResults?.races.reduce(
    (acc, result) => acc + Number(result.results[0].grid),
    0
  );

  const speedSum = driverResults?.races.reduce((acc, result) => {
    if (
      result.results[0]?.fastestLap?.averageSpeed &&
      result.results[0]?.fastestLap?.averageSpeed.speed !== "unknown"
    ) {
      return acc + Number(result.results[0]?.fastestLap?.averageSpeed.speed);
    } else {
      return acc;
    }
  }, 0);

  const speedLength = driverResults?.races.reduce((acc, result) => {
    if (
      result.results[0]?.fastestLap?.averageSpeed?.speed &&
      result.results[0]?.fastestLap?.averageSpeed.speed !== "unknown"
    ) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const racesFinished = driverResults?.races.reduce((acc, result) => {
    if (result.results[0]?.position === result.results[0]?.positionText) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const averageFinishing = positionSum / driverResults?.races.length;

  const averageStartingGrid = gridSum / driverResults?.races.length;

  const averageSpeed = speedSum / speedLength;

  return [
    {
      title: "Total Points",
      value: totalPoints,
      imgUrl: "/totalPoints.svg",
      textColour: "#facc15",
      bgColour: "#fef5e5",
    },
    {
      title: "Avg Starting",
      value: averageStartingGrid.toFixed(2),
      imgUrl: "/avgStarting.svg",
      textColour: "#60a5fa",
      bgColour: "#eaf0ff",
    },
    {
      title: "Avg Finishing",
      value: averageFinishing.toFixed(2),
      imgUrl: "/avgFinishing.svg",
      textColour: "#f87171",
      bgColour: "#fdede8",
    },
    {
      title: "Avg Speed",
      value: `${Math.round(averageSpeed)} kph`,
      imgUrl: "/avgSpeed.svg",
      textColour: "#facc15",
      bgColour: "#fef5e5",
    },
    {
      title: "Races Finished",
      value: `${racesFinished} of ${driverResults?.races.length}`,
      imgUrl: "/racesFinished.svg",
      textColour: "#f472b6",
      bgColour: "#ffeefd",
    },
    {
      title: "Nationality",
      value: driverResults.races[0].results[0].driver.nationality,
      imgUrl: "/earth.svg",
      textColour: "#4ade80",
      bgColour: "#e6fffa",
    },
    {
      title: "Age",
      value: calculateAge(driverResults.races[0].results[0].driver.dateOfBirth),
      imgUrl: "/cake.svg",
      textColour: "#60a5fa",
      bgColour: "#eaf0ff",
    },
    {
      title: "Car Number",
      value: driverResults.races[0].results[0].driver.permanentNumber,
      imgUrl: "/hashtag.svg",
      textColour: "#f472b6",
      bgColour: "#ffeefd",
    },
  ];
}
