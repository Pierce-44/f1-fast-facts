export interface Driver {
  driverId: string;
  permanentNumber: string;
  code: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
}

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
            nationality: string;
            dateOfBirth: string;
            permanentNumber: string;
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

export interface Calendar {
  season: string;
  Races: Race[];
}

interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  FirstPractice: FirstPractice;
  SecondPractice: SecondPractice;
  ThirdPractice?: ThirdPractice;
  Qualifying: Qualifying;
  Sprint?: Sprint;
}

interface Circuit {
  circuitId: string;
  url: string;
  circuitName: string;
  Location: Location;
}

interface Location {
  lat: string;
  long: string;
  locality: string;
  country: string;
}

interface FirstPractice {
  date: string;
  time: string;
}

interface SecondPractice {
  date: string;
  time: string;
}

interface ThirdPractice {
  date: string;
  time: string;
}

interface Qualifying {
  date: string;
  time: string;
}

interface Sprint {
  date: string;
  time: string;
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
