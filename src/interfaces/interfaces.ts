import { ConstructorRacePoints } from "@/util/handleGeneralPageStats";

export interface DriverResults {
  id: string;
  results: [
    {
      Results: [
        {
          position: string;
          positionText: string;
          points: string;
          grid: string;
          status: string;
          Time: {
            time: string;
            millis: string;
          };
          FastestLap: {
            AverageSpeed: {
              speed: string;
            };
          };
          Driver: {
            nationality: string;
            dateOfBirth: string;
            permanentNumber: string;
            givenName: string;
            familyName: string;
          };
          Constructor: {
            constructorId: string;
          };
        },
      ];
      Circuit: {
        circuitId: string;
      };
      raceName: string;
    },
  ];
}

export interface QualyResults {
  id: string;
  Races: [
    {
      QualifyingResults: [
        {
          position: string;
          Driver: {
            // nationality: string;
            // dateOfBirth: string;
            // permanentNumber: string;
            givenName: string;
            familyName: string;
          };
        },
      ];
      Circuit: {
        circuitId: string;
      };
      raceName: string;
    },
  ];
}

export interface News {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

interface Source {
  id?: string;
  name: string;
}

export interface GeneralStats {
  driversInfo: {
    driverFamilyName: string;
    driverFirstName: string;
    totalPoints: number;
    lastRacePosition: number;
    lastQualyPosition: number;
  }[];
  championshipLeader:
    | {
        driverFamilyName: string;
        driverFirstName: string;
      }
    | undefined;
  lastRaceWinner:
    | {
        driverFamilyName: string;
        driverFirstName: string;
      }
    | undefined;
  lastQualyWinner:
    | {
        driverFamilyName: string;
        driverFirstName: string;
      }
    | undefined;
  constructorChampionshipPoints: ConstructorRacePoints[];
}
