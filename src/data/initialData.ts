import { Team, Match } from "../types";

export const STADIUMS = [
  { name: "Estadio Azteca", city: "CDMX", country: "México" },
  { name: "Estadio Akron", city: "Guadalajara", country: "México" },
  { name: "Estadio BBVA", city: "Monterrey", country: "México" },
  { name: "BC Place", city: "Vancouver", country: "Canadá" },
  { name: "Toronto Stadium", city: "Toronto", country: "Canadá" },
  { name: "MetLife Stadium", city: "Nueva York/Nueva Jersey", country: "Estados Unidos" },
  { name: "SoFi Stadium", city: "Los Ángeles", country: "Estados Unidos" },
  { name: "Dallas Stadium", city: "Dallas", country: "Estados Unidos" },
  { name: "Mercedes-Benz Stadium", city: "Atlanta", country: "Estados Unidos" },
  { name: "Levi's Stadium", city: "San Francisco", country: "Estados Unidos" },
  { name: "Hard Rock Stadium", city: "Miami", country: "Estados Unidos" },
  { name: "Lumen Field", city: "Seattle", country: "Estados Unidos" },
  { name: "NRG Stadium", city: "Houston", country: "Estados Unidos" },
  { name: "Lincoln Financial Field", city: "Filadelfia", country: "Estados Unidos" },
  { name: "Arrowhead Stadium", city: "Kansas City", country: "Estados Unidos" },
  { name: "Gillette Stadium", city: "Boston", country: "Estados Unidos" }
];

export const TEAMS: Record<string, Team> = {
  // Group A
  MEX: { id: "MEX", name: "México", flag: "🇲🇽", group: "A" },
  RSA: { id: "RSA", name: "Sudáfrica", flag: "🇿🇦", group: "A" },
  KOR: { id: "KOR", name: "Corea del Sur", flag: "🇰🇷", group: "A" },
  CZE: { id: "CZE", name: "Chequia", flag: "🇨🇿", group: "A" },

  // Group B
  CAN: { id: "CAN", name: "Canadá", flag: "🇨🇦", group: "B" },
  BIH: { id: "BIH", name: "Bosnia y Herzegovina", flag: "🇧🇦", group: "B" },
  QAT: { id: "QAT", name: "Catar", flag: "🇶🇦", group: "B" },
  SUI: { id: "SUI", name: "Suiza", flag: "🇨🇭", group: "B" },

  // Group C
  BRA: { id: "BRA", name: "Brasil", flag: "🇧🇷", group: "C" },
  MAR: { id: "MAR", name: "Marruecos", flag: "🇲🇦", group: "C" },
  HAI: { id: "HAI", name: "Haití", flag: "🇭🇹", group: "C" },
  SCO: { id: "SCO", name: "Escocia", flag: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", group: "C" },

  // Group D
  USA: { id: "USA", name: "Estados Unidos", flag: "🇺🇸", group: "D" },
  PAR: { id: "PAR", name: "Paraguay", flag: "🇵🇾", group: "D" },
  AUS: { id: "AUS", name: "Australia", flag: "🇦🇺", group: "D" },
  TUR: { id: "TUR", name: "Turquía", flag: "🇹🇷", group: "D" },

  // Group E
  GER: { id: "GER", name: "Alemania", flag: "🇩🇪", group: "E" },
  CUW: { id: "CUW", name: "Curazao", flag: "🇨🇼", group: "E" },
  CIV: { id: "CIV", name: "Costa de Marfil", flag: "🇨🇮", group: "E" },
  ECU: { id: "ECU", name: "Ecuador", flag: "🇪🇨", group: "E" },

  // Group F
  NED: { id: "NED", name: "Países Bajos", flag: "🇳🇱", group: "F" },
  JPN: { id: "JPN", name: "Japón", flag: "🇯🇵", group: "F" },
  SWE: { id: "SWE", name: "Suecia", flag: "🇸🇪", group: "F" },
  TUN: { id: "TUN", name: "Túnez", flag: "🇹🇳", group: "F" },

  // Group G
  BEL: { id: "BEL", name: "Bélgica", flag: "🇧🇪", group: "G" },
  EGY: { id: "EGY", name: "Egipto", flag: "🇪🇬", group: "G" },
  IRN: { id: "IRN", name: "Irán", flag: "🇮🇷", group: "G" },
  NZL: { id: "NZL", name: "Nueva Zelanda", flag: "🇳🇿", group: "G" },

  // Group H
  ESP: { id: "ESP", name: "España", flag: "🇪🇸", group: "H" },
  CPV: { id: "CPV", name: "Cabo Verde", flag: "🇨🇻", group: "H" },
  KSA: { id: "KSA", name: "Arabia Saudita", flag: "🇸🇦", group: "H" },
  URU: { id: "URU", name: "Uruguay", flag: "🇺🇾", group: "H" },

  // Group I
  FRA: { id: "FRA", name: "Francia", flag: "🇫🇷", group: "I" },
  SEN: { id: "SEN", name: "Senegal", flag: "🇸🇳", group: "I" },
  IRQ: { id: "IRQ", name: "Irak", flag: "🇮🇶", group: "I" },
  NOR: { id: "NOR", name: "Noruega", flag: "🇳🇴", group: "I" },

  // Group J
  ARG: { id: "ARG", name: "Argentina", flag: "🇦🇷", group: "J" },
  ALG: { id: "ALG", name: "Argelia", flag: "🇩🇿", group: "J" },
  AUT: { id: "AUT", name: "Austria", flag: "🇦🇹", group: "J" },
  JOR: { id: "JOR", name: "Jordania", flag: "🇯🇴", group: "J" },

  // Group K
  POR: { id: "POR", name: "Portugal", flag: "🇵🇹", group: "K" },
  COD: { id: "COD", name: "RD Congo", flag: "🇨🇩", group: "K" },
  UZB: { id: "UZB", name: "Uzbekistán", flag: "🇺🇿", group: "K" },
  COL: { id: "COL", name: "Colombia", flag: "🇨🇴", group: "K" },

  // Group L
  ENG: { id: "ENG", name: "Inglaterra", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", group: "L" },
  CRO: { id: "CRO", name: "Croacia", flag: "🇭🇷", group: "L" },
  GHA: { id: "GHA", name: "Ghana", flag: "🇬🇭", group: "L" },
  PAN: { id: "PAN", name: "Panamá", flag: "🇵🇦", group: "L" }
};

export const GROUPS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];

// Create the 72 group stage matches
export function generateGroupMatches(): Match[] {
  return [
    // Semana 1
    // Jueves 11 de junio
    { id: 1, stage: "group", group: "A", homeTeamId: "MEX", awayTeamId: "RSA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Azteca", city: "CDMX", date: "Jueves 11 de junio", time: "19:00" },
    { id: 2, stage: "group", group: "A", homeTeamId: "KOR", awayTeamId: "CZE", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Akron", city: "Guadalajara", date: "Jueves 11 de junio", time: "20:00" },
    // Viernes 12 de junio
    { id: 3, stage: "group", group: "B", homeTeamId: "CAN", awayTeamId: "BIH", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Toronto Stadium", city: "Toronto", date: "Viernes 12 de junio", time: "15:00" },
    { id: 4, stage: "group", group: "D", homeTeamId: "USA", awayTeamId: "PAR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Los Angeles Stadium", city: "Los Ángeles", date: "Viernes 12 de junio", time: "18:00" },
    // Sábado 13 de junio
    { id: 5, stage: "group", group: "B", homeTeamId: "QAT", awayTeamId: "SUI", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "San Francisco Bay Area Stadium", city: "San Francisco", date: "Sábado 13 de junio", time: "12:00" },
    { id: 6, stage: "group", group: "C", homeTeamId: "BRA", awayTeamId: "MAR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "New York New Jersey Stadium", city: "NY/NJ", date: "Sábado 13 de junio", time: "18:00" },
    { id: 7, stage: "group", group: "C", homeTeamId: "HAI", awayTeamId: "SCO", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Boston Stadium", city: "Boston", date: "Sábado 13 de junio", time: "21:00" },
    { id: 8, stage: "group", group: "D", homeTeamId: "AUS", awayTeamId: "TUR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "BC Place", city: "Vancouver", date: "Sábado 13 de junio", time: "21:00" },
    // Domingo 14 de junio
    { id: 9, stage: "group", group: "E", homeTeamId: "GER", awayTeamId: "CUW", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Houston Stadium", city: "Houston", date: "Domingo 14 de junio", time: "12:00" },
    { id: 10, stage: "group", group: "F", homeTeamId: "NED", awayTeamId: "JPN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Dallas Stadium", city: "Dallas", date: "Domingo 14 de junio", time: "15:00" },
    { id: 11, stage: "group", group: "E", homeTeamId: "CIV", awayTeamId: "ECU", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Philadelphia Stadium", city: "Filadelfia", date: "Domingo 14 de junio", time: "19:00" },
    { id: 12, stage: "group", group: "F", homeTeamId: "SWE", awayTeamId: "TUN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Monterrey", city: "Monterrey", date: "Domingo 14 de junio", time: "20:00" },
    // Lunes 15 de junio
    { id: 13, stage: "group", group: "H", homeTeamId: "ESP", awayTeamId: "CPV", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Atlanta Stadium", city: "Atlanta", date: "Lunes 15 de junio", time: "12:00" },
    { id: 14, stage: "group", group: "G", homeTeamId: "BEL", awayTeamId: "EGY", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Seattle Stadium", city: "Seattle", date: "Lunes 15 de junio", time: "12:00" },
    { id: 15, stage: "group", group: "H", homeTeamId: "KSA", awayTeamId: "URU", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Miami Stadium", city: "Miami", date: "Lunes 15 de junio", time: "18:00" },
    { id: 16, stage: "group", group: "G", homeTeamId: "IRN", awayTeamId: "NZL", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Los Angeles Stadium", city: "Los Ángeles", date: "Lunes 15 de junio", time: "18:00" },
    // Martes 16 de junio
    { id: 17, stage: "group", group: "I", homeTeamId: "FRA", awayTeamId: "SEN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "New York New Jersey Stadium", city: "NY/NJ", date: "Martes 16 de junio", time: "15:00" },
    { id: 18, stage: "group", group: "I", homeTeamId: "IRQ", awayTeamId: "NOR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Boston Stadium", city: "Boston", date: "Martes 16 de junio", time: "18:00" },
    { id: 19, stage: "group", group: "J", homeTeamId: "ARG", awayTeamId: "ALG", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Kansas City Stadium", city: "Kansas City", date: "Martes 16 de junio", time: "20:00" },
    { id: 20, stage: "group", group: "J", homeTeamId: "AUT", awayTeamId: "JOR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "San Francisco Bay Area Stadium", city: "San Francisco", date: "Martes 16 de junio", time: "21:00" },
    // Miércoles 17 de junio
    { id: 21, stage: "group", group: "K", homeTeamId: "POR", awayTeamId: "COD", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Houston Stadium", city: "Houston", date: "Miércoles 17 de junio", time: "12:00" },
    { id: 22, stage: "group", group: "L", homeTeamId: "ENG", awayTeamId: "CRO", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Dallas Stadium", city: "Dallas", date: "Miércoles 17 de junio", time: "15:00" },
    { id: 23, stage: "group", group: "L", homeTeamId: "GHA", awayTeamId: "PAN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Toronto Stadium", city: "Toronto", date: "Miércoles 17 de junio", time: "19:00" },
    { id: 24, stage: "group", group: "K", homeTeamId: "UZB", awayTeamId: "COL", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Azteca", city: "CDMX", date: "Miércoles 17 de junio", time: "20:00" },

    // Semana 2
    // Jueves 18 de junio
    { id: 25, stage: "group", group: "A", homeTeamId: "CZE", awayTeamId: "RSA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Atlanta Stadium", city: "Atlanta", date: "Jueves 18 de junio", time: "12:00" },
    { id: 26, stage: "group", group: "B", homeTeamId: "SUI", awayTeamId: "BIH", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Los Angeles Stadium", city: "Los Ángeles", date: "Jueves 18 de junio", time: "12:00" },
    { id: 27, stage: "group", group: "B", homeTeamId: "CAN", awayTeamId: "QAT", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "BC Place", city: "Vancouver", date: "Jueves 18 de junio", time: "15:00" },
    { id: 28, stage: "group", group: "A", homeTeamId: "MEX", awayTeamId: "KOR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Akron", city: "Guadalajara", date: "Jueves 18 de junio", time: "19:00" },
    // Viernes 19 de junio
    { id: 29, stage: "group", group: "D", homeTeamId: "USA", awayTeamId: "AUS", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Seattle Stadium", city: "Seattle", date: "Viernes 19 de junio", time: "12:00" },
    { id: 30, stage: "group", group: "C", homeTeamId: "SCO", awayTeamId: "MAR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Boston Stadium", city: "Boston", date: "Viernes 19 de junio", time: "18:00" },
    { id: 31, stage: "group", group: "C", homeTeamId: "BRA", awayTeamId: "HAI", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Philadelphia Stadium", city: "Filadelfia", date: "Viernes 19 de junio", time: "20:30" },
    { id: 32, stage: "group", group: "D", homeTeamId: "TUR", awayTeamId: "PAR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "San Francisco Bay Area Stadium", city: "San Francisco", date: "Viernes 19 de junio", time: "20:00" },
    // Sábado 20 de junio
    { id: 33, stage: "group", group: "F", homeTeamId: "NED", awayTeamId: "SWE", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Houston Stadium", city: "Houston", date: "Sábado 20 de junio", time: "12:00" },
    { id: 34, stage: "group", group: "E", homeTeamId: "GER", awayTeamId: "CIV", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Toronto Stadium", city: "Toronto", date: "Sábado 20 de junio", time: "16:00" },
    { id: 35, stage: "group", group: "E", homeTeamId: "ECU", awayTeamId: "CUW", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Kansas City Stadium", city: "Kansas City", date: "Sábado 20 de junio", time: "19:00" },
    { id: 36, stage: "group", group: "F", homeTeamId: "TUN", awayTeamId: "JPN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Monterrey", city: "Monterrey", date: "Sábado 20 de junio", time: "22:00" },
    // Domingo 21 de junio
    { id: 37, stage: "group", group: "H", homeTeamId: "ESP", awayTeamId: "KSA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Atlanta Stadium", city: "Atlanta", date: "Domingo 21 de junio", time: "12:00" },
    { id: 38, stage: "group", group: "G", homeTeamId: "BEL", awayTeamId: "IRN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Los Angeles Stadium", city: "Los Ángeles", date: "Domingo 21 de junio", time: "12:00" },
    { id: 39, stage: "group", group: "H", homeTeamId: "URU", awayTeamId: "CPV", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Miami Stadium", city: "Miami", date: "Domingo 21 de junio", time: "18:00" },
    { id: 40, stage: "group", group: "G", homeTeamId: "NZL", awayTeamId: "EGY", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "BC Place", city: "Vancouver", date: "Domingo 21 de junio", time: "18:00" },
    // Lunes 22 de junio
    { id: 41, stage: "group", group: "J", homeTeamId: "ARG", awayTeamId: "AUT", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Dallas Stadium", city: "Dallas", date: "Lunes 22 de junio", time: "12:00" },
    { id: 42, stage: "group", group: "I", homeTeamId: "FRA", awayTeamId: "IRQ", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Philadelphia Stadium", city: "Filadelfia", date: "Lunes 22 de junio", time: "16:00" },
    { id: 43, stage: "group", group: "I", homeTeamId: "NOR", awayTeamId: "SEN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "New York New Jersey Stadium", city: "NY/NJ", date: "Lunes 22 de junio", time: "19:00" },
    { id: 44, stage: "group", group: "J", homeTeamId: "JOR", awayTeamId: "ALG", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "San Francisco Bay Area Stadium", city: "San Francisco", date: "Lunes 22 de junio", time: "20:00" },
    // Martes 23 de junio
    { id: 45, stage: "group", group: "K", homeTeamId: "POR", awayTeamId: "UZB", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Houston Stadium", city: "Houston", date: "Martes 23 de junio", time: "12:00" },
    { id: 46, stage: "group", group: "L", homeTeamId: "ENG", awayTeamId: "GHA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Boston Stadium", city: "Boston", date: "Martes 23 de junio", time: "15:00" },
    { id: 47, stage: "group", group: "L", homeTeamId: "PAN", awayTeamId: "CRO", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Toronto Stadium", city: "Toronto", date: "Martes 23 de junio", time: "19:00" },
    { id: 48, stage: "group", group: "K", homeTeamId: "COL", awayTeamId: "COD", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Akron", city: "Guadalajara", date: "Martes 23 de junio", time: "20:00" },

    // Semana 3 (Cierre de Grupos - Horarios unificados)
    // Miércoles 24 de junio
    { id: 49, stage: "group", group: "B", homeTeamId: "SUI", awayTeamId: "CAN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "BC Place", city: "Vancouver", date: "Miércoles 24 de junio", time: "15:00" },
    { id: 50, stage: "group", group: "B", homeTeamId: "BIH", awayTeamId: "QAT", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Seattle Stadium", city: "Seattle", date: "Miércoles 24 de junio", time: "15:00" },
    { id: 51, stage: "group", group: "C", homeTeamId: "SCO", awayTeamId: "BRA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Miami Stadium", city: "Miami", date: "Miércoles 24 de junio", time: "18:00" },
    { id: 52, stage: "group", group: "C", homeTeamId: "MAR", awayTeamId: "HAI", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Atlanta Stadium", city: "Atlanta", date: "Miércoles 24 de junio", time: "18:00" },
    { id: 53, stage: "group", group: "A", homeTeamId: "CZE", awayTeamId: "MEX", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Azteca", city: "CDMX", date: "Miércoles 24 de junio", time: "21:00" },
    { id: 54, stage: "group", group: "A", homeTeamId: "RSA", awayTeamId: "KOR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Monterrey", city: "Monterrey", date: "Miércoles 24 de junio", time: "21:00" },
    // Jueves 25 de junio
    { id: 55, stage: "group", group: "E", homeTeamId: "ECU", awayTeamId: "GER", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "New York New Jersey Stadium", city: "NY/NJ", date: "Jueves 25 de junio", time: "13:00" },
    { id: 56, stage: "group", group: "E", homeTeamId: "CUW", awayTeamId: "CIV", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Philadelphia Stadium", city: "Filadelfia", date: "Jueves 25 de junio", time: "13:00" },
    { id: 57, stage: "group", group: "F", homeTeamId: "TUN", awayTeamId: "NED", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Kansas City Stadium", city: "Kansas City", date: "Jueves 25 de junio", time: "18:00" },
    { id: 58, stage: "group", group: "F", homeTeamId: "JPN", awayTeamId: "SWE", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Dallas Stadium", city: "Dallas", date: "Jueves 25 de junio", time: "18:00" },
    { id: 59, stage: "group", group: "D", homeTeamId: "TUR", awayTeamId: "USA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Los Angeles Stadium", city: "Los Ángeles", date: "Jueves 25 de junio", time: "19:00" },
    { id: 60, stage: "group", group: "D", homeTeamId: "PAR", awayTeamId: "AUS", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "San Francisco Bay Area Stadium", city: "San Francisco", date: "Jueves 25 de junio", time: "19:00" },
    // Viernes 26 de junio
    { id: 61, stage: "group", group: "I", homeTeamId: "NOR", awayTeamId: "FRA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Boston Stadium", city: "Boston", date: "Viernes 26 de junio", time: "15:00" },
    { id: 62, stage: "group", group: "I", homeTeamId: "SEN", awayTeamId: "IRQ", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Toronto Stadium", city: "Toronto", date: "Viernes 26 de junio", time: "15:00" },
    { id: 63, stage: "group", group: "H", homeTeamId: "CPV", awayTeamId: "KSA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Houston Stadium", city: "Houston", date: "Viernes 26 de junio", time: "19:00" },
    { id: 64, stage: "group", group: "H", homeTeamId: "URU", awayTeamId: "ESP", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Estadio Akron", city: "Guadalajara", date: "Viernes 26 de junio", time: "19:00" },
    { id: 65, stage: "group", group: "G", homeTeamId: "EGY", awayTeamId: "IRN", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Seattle Stadium", city: "Seattle", date: "Viernes 26 de junio", time: "20:00" },
    { id: 66, stage: "group", group: "G", homeTeamId: "NZL", awayTeamId: "BEL", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "BC Place", city: "Vancouver", date: "Viernes 26 de junio", time: "20:00" },
    // Sábado 27 de junio
    { id: 67, stage: "group", group: "L", homeTeamId: "PAN", awayTeamId: "ENG", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "New York New Jersey Stadium", city: "NY/NJ", date: "Sábado 27 de junio", time: "15:00" },
    { id: 68, stage: "group", group: "L", homeTeamId: "CRO", awayTeamId: "GHA", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Philadelphia Stadium", city: "Filadelfia", date: "Sábado 27 de junio", time: "15:00" },
    { id: 69, stage: "group", group: "J", homeTeamId: "JOR", awayTeamId: "ARG", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Dallas Stadium", city: "Dallas", date: "Sábado 27 de junio", time: "21:00" },
    { id: 70, stage: "group", group: "J", homeTeamId: "ALG", awayTeamId: "AUT", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Kansas City Stadium", city: "Kansas City", date: "Sábado 27 de junio", time: "21:00" },
    { id: 71, stage: "group", group: "K", homeTeamId: "COL", awayTeamId: "POR", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Miami Stadium", city: "Miami", date: "Sábado 27 de junio", time: "19:30" },
    { id: 72, stage: "group", group: "K", homeTeamId: "COD", awayTeamId: "UZB", homeScore: null, awayScore: null, homePenalties: null, awayPenalties: null, winnerId: null, stadium: "Atlanta Stadium", city: "Atlanta", date: "Sábado 27 de junio", time: "19:30" }
  ];
}

// Pre-define templates for the 32 knockout matches (P73 to P104)
export function generateInitialKnockoutMatches(): Match[] {
  const matches: Match[] = [];

  // P73 to P88: Dieciseisavos (Round of 32)
  const r32Pairings = [
    { id: 73, homePlaceholder: "2A", awayPlaceholder: "2B", stadium: "Los Angeles Stadium", city: "Los Ángeles", date: "Domingo 28 de junio" },
    { id: 74, homePlaceholder: "1E", awayPlaceholder: "Mejor 3° #1", stadium: "Boston Stadium", city: "Boston", date: "Lunes 29 de junio" },
    { id: 75, homePlaceholder: "1F", awayPlaceholder: "2C", stadium: "Estadio Monterrey", city: "Monterrey", date: "Lunes 29 de junio" },
    { id: 76, homePlaceholder: "1C", awayPlaceholder: "2F", stadium: "Houston Stadium", city: "Houston", date: "Lunes 29 de junio" },
    { id: 77, homePlaceholder: "1I", awayPlaceholder: "Mejor 3° #2", stadium: "MetLife Stadium", city: "NY/NJ", date: "Martes 30 de junio" },
    { id: 78, homePlaceholder: "2E", awayPlaceholder: "2I", stadium: "Dallas Stadium", city: "Dallas", date: "Martes 30 de junio" },
    { id: 79, homePlaceholder: "1A", awayPlaceholder: "Mejor 3° #3", stadium: "Estadio Azteca", city: "CDMX", date: "Martes 30 de junio" },
    { id: 80, homePlaceholder: "1L", awayPlaceholder: "Mejor 3° #4", stadium: "Atlanta Stadium", city: "Atlanta", date: "Miércoles 1 de julio" },
    { id: 81, homePlaceholder: "1D", awayPlaceholder: "Mejor 3° #5", stadium: "San Francisco Bay Area Stadium", city: "San Francisco", date: "Miércoles 1 de julio" },
    { id: 82, homePlaceholder: "1G", awayPlaceholder: "Mejor 3° #6", stadium: "Seattle Stadium", city: "Seattle", date: "Miércoles 1 de julio" },
    { id: 83, homePlaceholder: "2K", awayPlaceholder: "2L", stadium: "Toronto Stadium", city: "Toronto", date: "Jueves 2 de julio" },
    { id: 84, homePlaceholder: "1H", awayPlaceholder: "2J", stadium: "Los Angeles Stadium", city: "Los Ángeles", date: "Jueves 2 de julio" },
    { id: 85, homePlaceholder: "1B", awayPlaceholder: "Mejor 3° #7", stadium: "BC Place", city: "Vancouver", date: "Jueves 2 de julio" },
    { id: 86, homePlaceholder: "1J", awayPlaceholder: "2H", stadium: "Miami Stadium", city: "Miami", date: "Viernes 3 de julio" },
    { id: 87, homePlaceholder: "1K", awayPlaceholder: "Mejor 3° #8", stadium: "Kansas City Stadium", city: "Kansas City", date: "Viernes 3 de julio" },
    { id: 88, homePlaceholder: "2D", awayPlaceholder: "2G", stadium: "Dallas Stadium", city: "Dallas", date: "Viernes 3 de julio" }
  ];

  r32Pairings.forEach((p, idx) => {
    matches.push({
      id: p.id,
      stage: "r32",
      homeTeamId: null,
      awayTeamId: null,
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
      winnerId: null,
      stadium: p.stadium,
      city: p.city,
      date: p.date,
      time: idx % 2 === 0 ? "16:00" : "20:00",
      homePlaceholder: p.homePlaceholder,
      awayPlaceholder: p.awayPlaceholder
    });
  });

  // P89 to P96: Octavos de final (Round of 16)
  const r16Pairings = [
    { id: 89, hPk: 74, aPk: 77, stadium: "Philadelphia Stadium", city: "Filadelfia", date: "Sábado 4 de julio" },
    { id: 90, hPk: 73, aPk: 75, stadium: "Houston Stadium", city: "Houston", date: "Sábado 4 de julio" },
    { id: 91, hPk: 76, aPk: 78, stadium: "MetLife Stadium", city: "NY/NJ", date: "Domingo 5 de julio" },
    { id: 92, hPk: 79, aPk: 80, stadium: "Estadio Azteca", city: "CDMX", date: "Domingo 5 de julio" },
    { id: 93, hPk: 81, aPk: 82, stadium: "Seattle Stadium", city: "Seattle", date: "Lunes 6 de julio" },
    { id: 94, hPk: 83, aPk: 84, stadium: "BC Place", city: "Vancouver", date: "Lunes 6 de julio" },
    { id: 95, hPk: 85, aPk: 86, stadium: "Atlanta Stadium", city: "Atlanta", date: "Martes 7 de julio" },
    { id: 96, hPk: 87, aPk: 88, stadium: "SoFi Stadium", city: "Los Ángeles", date: "Martes 7 de julio" }
  ];

  r16Pairings.forEach((p, idx) => {
    matches.push({
      id: p.id,
      stage: "r16",
      homeTeamId: null,
      awayTeamId: null,
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
      winnerId: null,
      stadium: p.stadium,
      city: p.city,
      date: p.date,
      time: idx % 2 === 0 ? "15:00" : "19:00",
      homePlaceholder: `Ganador P${p.hPk}`,
      awayPlaceholder: `Ganador P${p.aPk}`
    });
  });

  // P97 to P100: Cuartos de final
  const qfPairings = [
    { id: 97, hPk: 89, aPk: 90, stadium: "Boston Stadium", city: "Boston", date: "Jueves 9 de julio" },
    { id: 98, hPk: 91, aPk: 92, stadium: "SoFi Stadium", city: "Los Ángeles", date: "Viernes 10 de julio" },
    { id: 99, hPk: 93, aPk: 94, stadium: "Kansas City Stadium", city: "Kansas City", date: "Sábado 11 de julio" },
    { id: 100, hPk: 95, aPk: 96, stadium: "MetLife Stadium", city: "NY/NJ", date: "Sábado 11 de julio" }
  ];

  qfPairings.forEach((p, idx) => {
    matches.push({
      id: p.id,
      stage: "qf",
      homeTeamId: null,
      awayTeamId: null,
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
      winnerId: null,
      stadium: p.stadium,
      city: p.city,
      date: p.date,
      time: idx % 2 === 0 ? "16:00" : "20:00",
      homePlaceholder: `Ganador P${p.hPk}`,
      awayPlaceholder: `Ganador P${p.aPk}`
    });
  });

  // P101 & P102: Semifinales
  const sfPairings = [
    { id: 101, hPk: 97, aPk: 98, stadium: "Dallas Stadium", city: "Dallas", date: "Martes 14 de julio" },
    { id: 102, hPk: 99, aPk: 100, stadium: "Atlanta Stadium", city: "Atlanta", date: "Miércoles 15 de julio" }
  ];

  sfPairings.forEach((p, idx) => {
    matches.push({
      id: p.id,
      stage: "sf",
      homeTeamId: null,
      awayTeamId: null,
      homeScore: null,
      awayScore: null,
      homePenalties: null,
      awayPenalties: null,
      winnerId: null,
      stadium: p.stadium,
      city: p.city,
      date: p.date,
      time: idx === 0 ? "17:00" : "20:00",
      homePlaceholder: `Ganador P${p.hPk}`,
      awayPlaceholder: `Ganador P${p.aPk}`
    });
  });

  // P103: Tercer Puesto
  matches.push({
    id: 103,
    stage: "third",
    homeTeamId: null,
    awayTeamId: null,
    homeScore: null,
    awayScore: null,
    homePenalties: null,
    awayPenalties: null,
    winnerId: null,
    stadium: "Hard Rock Stadium",
    city: "Miami",
    date: "Sábado 18 de julio",
    time: "16:00",
    homePlaceholder: "Perdedor P101",
    awayPlaceholder: "Perdedor P102"
  });

  // P104: Gran Final
  matches.push({
    id: 104,
    stage: "final",
    homeTeamId: null,
    awayTeamId: null,
    homeScore: null,
    awayScore: null,
    homePenalties: null,
    awayPenalties: null,
    winnerId: null,
    stadium: "MetLife Stadium",
    city: "NY/NJ",
    date: "Domingo 19 de julio",
    time: "18:00",
    homePlaceholder: "Ganador P101",
    awayPlaceholder: "Ganador P102"
  });

  return matches;
}
