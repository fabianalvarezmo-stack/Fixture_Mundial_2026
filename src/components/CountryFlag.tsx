import React from "react";

export const TEAM_ISO2: Record<string, string> = {
  MEX: "mx",
  RSA: "za",
  KOR: "kr",
  CZE: "cz",
  CAN: "ca",
  BIH: "ba",
  QAT: "qa",
  SUI: "ch",
  BRA: "br",
  MAR: "ma",
  HAI: "ht",
  SCO: "gb-sct",
  USA: "us",
  PAR: "py",
  AUS: "au",
  TUR: "tr",
  GER: "de",
  CUW: "cw",
  CIV: "ci",
  ECU: "ec",
  NED: "nl",
  JPN: "jp",
  SWE: "se",
  TUN: "tn",
  BEL: "be",
  EGY: "eg",
  IRN: "ir",
  NZL: "nz",
  ESP: "es",
  CPV: "cv",
  KSA: "sa",
  URU: "uy",
  FRA: "fr",
  SEN: "sn",
  IRQ: "iq",
  NOR: "no",
  ARG: "ar",
  ALG: "dz",
  AUT: "at",
  JOR: "jo",
  POR: "pt",
  COD: "cd",
  UZB: "uz",
  COL: "co",
  ENG: "gb-eng",
  CRO: "hr",
  GHA: "gh",
  PAN: "pa"
};

interface CountryFlagProps {
  key?: any;
  teamId: string;
  fallbackFlag?: string; // Standard emoji backup e.g. "🇲🇽"
  className?: string; // Custom sizing classes
  title?: string;
}

export default function CountryFlag({ teamId, fallbackFlag, className, title }: CountryFlagProps) {
  const code = TEAM_ISO2[teamId.toUpperCase()];
  if (!code) {
    return <span className={className}>{fallbackFlag || "?"}</span>;
  }

  return (
    <img
      src={`https://flagcdn.com/w80/${code}.png`}
      alt={teamId}
      className={`inline-block select-none pointer-events-none object-cover ${className || ""}`}
      title={title || teamId}
      referrerPolicy="no-referrer"
    />
  );
}
