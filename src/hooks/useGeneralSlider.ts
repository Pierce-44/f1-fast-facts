import { GeneralStats } from "@/interfaces/interfaces";
import calculateAge from "@/util/calculateAge";
import { DriverResults } from "@/util/fetchDriverRaceResults";

export default function useGeneralPageSlider(stats: GeneralStats) {
  return [
    {
      title: "Round",
      value: `${stats.thisRaceIndex} of ${stats.numberOfRaces}`,
      imgUrl: "/calendar.svg",
      textColour: "#4ade80",
      bgColour: "#28ffc92c",
    },
    {
      title: "Average Driver Age",
      value: Math.round(stats.averageDriverAge),
      imgUrl: "/cake.svg",
      textColour: "#60a5fa",
      bgColour: "#287eff25",
    },
    {
      title: "Championship Leader",
      value: stats.championshipLeader.driverFamilyName,
      imgUrl: "/totalPoints.svg",
      textColour: "#facc15",
      bgColour: "#ffc6282c",
    },
    {
      title: "Youngest Driver Age",
      value: Math.round(stats.youngestDriverAge),
      imgUrl: "/youngest.svg",
      textColour: "#60a5fa",
      bgColour: "#28a9ff27",
    },
    {
      title: "Number of Drivers",
      value: stats.driversInfo.length - 1,
      imgUrl: "/driver.svg",
      textColour: "#f472b6",
      bgColour: "#ff28db1c",
    },
    {
      title: "Last Race Winner",
      value: stats.lastRaceWinner.driverFamilyName,
      imgUrl: "/avgStarting.svg",
      textColour: "#60a5fa",
      bgColour: "#28a9ff27",
    },

    {
      title: "Oldest Driver Age",
      value: Math.round(stats.oldestDriverAge),
      imgUrl: "/oldest.svg",
      textColour: "#f87171",
      bgColour: "#ff282827",
    },
    {
      title: "Last Pole Position",
      value: stats.lastQualyWinner.driverFamilyName,
      imgUrl: "/avgSpeed.svg",
      textColour: "#facc15",
      bgColour: "#ffc6282c",
    },
    {
      title: "Next Race",
      value: stats.nextRace?.raceName,
      imgUrl: "/earth.svg",
      textColour: "#4ade80",
      bgColour: "#28ffc92c",
    },
    {
      title: "Number of Teams",
      value: stats.constructorChampionshipPoints.length,
      imgUrl: "/hashtag.svg",
      textColour: "#f472b6",
      bgColour: "#ff28db1c",
    },
    // {
    //   title: "Races Finished",
    //   value: `${racesFinished} of ${driverResults?.races.length}`,
    //   imgUrl: "/racesFinished.svg",
    //   textColour: "#f472b6",
    //   bgColour: "#ff28db15",
    // },
    // {
    //   title: "Nationality",
    //   value: driverResults.races[0].results[0].driver.nationality,
    //   imgUrl: "/earth.svg",
    //   textColour: "#4ade80",
    //   bgColour: "#28ffc92c",
    // },
    // {
    //   title: "Age",
    //   value: calculateAge(driverResults.races[0].results[0].driver.dateOfBirth),
    //   imgUrl: "/cake.svg",
    //   textColour: "#60a5fa",
    //   bgColour: "#287eff25",
    // },
    // {
    //   title: "Car Number",
    //   value: driverResults.races[0].results[0].driver.permanentNumber,
    //   imgUrl: "/hashtag.svg",
    //   textColour: "#f472b6",
    //   bgColour: "#ff28db1c",
    // },
  ];
}
