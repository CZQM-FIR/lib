import type { RosterPosition, RosterStatus, SoloEndorsement } from '$lib/czqm/db/schema';

export const getRosterStatus = (userData: any, position: RosterPosition) => {
  if (userData.roster.filter((r: RosterStatus) => r.position === position).length === 0) {
    return -1; // N/A
  } else if (
    userData.soloEndorsements.filter((r: any) => {
      if (
        r.position?.callsign.toLowerCase().includes(position) &&
        r.expiresAt > new Date().getTime()
      ) {
        console.log('soloEndorsement', r);
        return true;
      }
    }).length > 0
  ) {
    return 1; // solo
  } else if (userData.roster.filter((r: RosterStatus) => r.position === position)[0].status === 0) {
    return 0; // training
  } else if (userData.roster.filter((r: RosterStatus) => r.position === position)[0].status === 2) {
    return 2; // certified
  } else {
    return -1; // N/A
  }
};
