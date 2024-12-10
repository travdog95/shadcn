import {
  format,
  parseISO,
  differenceInYears,
  getYear,
  intervalToDuration,
  formatDuration,
  daysToWeeks,
  differenceInDays,
  addDays,
  startOfWeek,
  isValid,
  isSunday,
  subDays,
} from "date-fns";

export const calculateAge = (birthDate: any) => {
  if (!birthDate) return;
  const validatedBirthDate =
    typeof birthDate === "string" ? parseISO(birthDate) : birthDate;

  return differenceInYears(new Date(), validatedBirthDate);
};

export const formatDate = (date: any, dateFormat: string) => {
  if (!date || !dateFormat) return;

  const validateDate = typeof date === "string" ? parseISO(date) : date;
  return format(validateDate, dateFormat);
};

export const normalizePhoneNumber = (phoneNumber: string) => {
  if (!phoneNumber || typeof phoneNumber !== "string") return;

  const numbersOnly = phoneNumber.replace(/\D+/g, "");

  //If the phone number is not 10 digits, return the original value
  if (numbersOnly.length !== 10) return phoneNumber;

  const areaCode = numbersOnly.substring(0, 3);
  const firstThreeNumbers = numbersOnly.substring(3, 6);
  const lastFourNumbers = numbersOnly.substring(6);

  //Strip spaces, periods, parentheses and dashes
  return `(${areaCode}) ${firstThreeNumbers}-${lastFourNumbers}`;
};

//   export const getMeetingPrayers = (members, meetingPrayers) => {
//     //Find prayers
//     const meetingInvocation = meetingPrayers.filter((prayer) => prayer.prayerType === "Invocation");
//     const meetingBenediction = meetingPrayers.filter((prayer) => prayer.prayerType === "Benediction");

//     let invocation = null;
//     let memberInvocationArray = [];
//     if (meetingInvocation.length > 0) {
//       memberInvocationArray = members.filter((m) => m._id === meetingInvocation[0].member);
//       invocation = meetingInvocation[0];
//     }

//     const memberInvocation = memberInvocationArray[0] ? memberInvocationArray[0] : null;

//     let benediction = null;
//     let memberBenedictionArray = [];
//     if (meetingBenediction.length > 0) {
//       memberBenedictionArray = members.filter((m) => m._id === meetingBenediction[0].member);
//       benediction = meetingBenediction[0];
//     }

//     const memberBenediction = memberBenedictionArray[0] ? memberBenedictionArray[0] : null;

//     return { invocation, memberInvocation, benediction, memberBenediction };
//   };

export const isYouth = (birthDate: Date) => {
  const validatedBirthDate =
    typeof birthDate === "string" ? parseISO(birthDate) : birthDate;
  const age = calculateAge(birthDate);
  const birthYear = getYear(validatedBirthDate);
  const currentYear = getYear(new Date());

  return age !== undefined && age < 19 && currentYear - birthYear >= 12;
};

//   export const calcAndFormatDuration = (date, endDate = null) => {
//     const validatedDate = typeof date === "string" ? parseISO(date) : date;

//     let validatedEndDate = new Date();
//     if (endDate) {
//       validatedEndDate = typeof date === "string" ? parseISO(endDate) : endDate;
//     }

//     const diffDays = Math.abs(differenceInDays(validatedDate, validatedEndDate));
//     const duration = intervalToDuration({ start: validatedDate, end: validatedEndDate });

//     let durationFormat = [];
//     if (diffDays < 7) {
//       durationFormat = ["days"];
//     } else if (diffDays >= 7 && duration.months === 0 && duration.years === 0) {
//       duration.weeks = daysToWeeks(duration.days);
//       duration.days = duration.days % 7;
//       durationFormat = ["weeks", "days"];
//     } else if (duration.years === 0 && duration.months > 0) {
//       duration.weeks = daysToWeeks(duration.days);
//       durationFormat = ["months", "weeks"];
//     } else {
//       durationFormat = ["years", "months"];
//     }

//     return formatDuration(duration, {
//       format: durationFormat,
//       delimiter: ", ",
//     });
//   };

//   export const formatByIds = (items) => {
//     const itemsObject = {};

//     items.forEach((item) => {
//       itemsObject[item._id] = item;
//     });

//     return itemsObject;
//   };

interface FormatFileSizeOptions {
  bytes: number;
  decimalPoint?: number;
}

export const formatFileSize = ({
  bytes,
  decimalPoint,
}: FormatFileSizeOptions): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024,
    dm = decimalPoint || 2,
    sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
    i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

// interface ItemWithDate {
//   date: string | Date;
// }

// export const getLatestDate = (items: ItemWithDate[]): string | Date | undefined => {
//   if (!items) return;

//   const sortedItems = sortByDate(items);

//   return sortedItems[0].date;
// };

// export const sortByDate = (items: ItemWithDate[]): string | Date | undefined => {
//   let sortedItems = [...items];
//   sortedItems.sort((a, b) => {
//     let da = new Date(a.date);
//     let db = new Date(b.date);
//     return db.getTime() - da.getTime();
//   });

//   return sortedItems;
// };

//   export const findUpcomingSundays = (numSundays, startDate) => {
//     let upcomingSundays = [];

//     //Default startDate to today if no value is passed in (undefined)
//     startDate = startDate ? startDate : new Date();

//     let validatedStartDate = typeof startDate === "string" ? parseISO(startDate) : startDate;

//     if (isValid(validatedStartDate)) {
//       //if the startDate is Sunday, include in results
//       if (isSunday(validatedStartDate)) {
//         validatedStartDate = subDays(validatedStartDate, 1);
//       }

//       const nextSunday = startOfWeek(addDays(validatedStartDate, 7));

//       for (let i = 0; i < numSundays; i++) {
//         upcomingSundays.push(addDays(nextSunday, 7 * i));
//       }
//     }
//     return upcomingSundays;
//   };

interface UrlParam {
  [key: string]: string | number | boolean;
}

export const stringifyUrlParams = (params: UrlParam[]): string => {
  let paramsString = "";

  if (params.length > 0) {
    paramsString = "?";
    params.forEach((param, index) => {
      if (index > 0) paramsString += "&";
      for (const [key, value] of Object.entries(param)) {
        paramsString += `${key}=${value}`;
      }
    });
  }

  return paramsString;
};

//   export const storage = {
//     getUser: () => {
//       const user = JSON.parse(window.localStorage.getItem("user"))
//         ? JSON.parse(window.localStorage.getItem("user"))
//         : {};
//       return user;
//     },
//     setUser: (user) => window.localStorage.setItem("user", JSON.stringify(user)),
//     clearUser: () => window.localStorage.removeItem("user"),
//   };

//   export const sortMembers = (members) => {
//     members.sort((a, b) => {
//       const nameA = a.preferredName.toUpperCase();
//       const nameB = b.preferredName.toUpperCase();

//       return nameA < nameB ? -1 : 1;
//     });

//     return members;
//   };

//   export const getAppointmentsToSchedule = (items, members) => {
//     let appointments = [];

//     items.forEach((item) => {
//       if (item.releaseStatus === "Schedule") {
//         const member = members.filter((m) => m._id === item.currentOfficer);
//         appointments.push(member[0]);
//       }

//       if (item.sustainStatus === "Schedule") {
//         item.proposedOfficers.forEach((officerId) => {
//           const member = members.filter((m) => m._id === officerId);
//           appointments.push(member[0]);
//         });
//       }
//     });

//     return appointments;
//   };

//   export const getCallingsToUpdate = (items, members, callings) => {
//     let updates = [];

//     items.forEach((item) => {
//       if (item.releaseStatus === "Released") {
//         const memberArray = members.filter((m) => m._id === item.currentOfficer);
//         const callingArray = callings.filter((c) => c._id === item.calling);
//         const member = {
//           ...memberArray[0],
//           ...{ calling: callingArray[0], update: item.releaseStatus },
//         };
//         updates.push(member);
//       }

//       if (item.sustainStatus === "Sustained") {
//         item.proposedOfficers.forEach((officerId) => {
//           const memberArray = members.filter((m) => m._id === officerId);
//           const callingArray = callings.filter((c) => c._id === item.calling);

//           const member = {
//             ...memberArray[0],
//             ...{ calling: callingArray[0], update: item.sustainStatus },
//           };
//           updates.push(member);
//         });
//       }
//     });

//     return updates;
//   };

//   export const formatPhoneNumber = (phoneNumber) => {
//     let formattedPhoneNumber = "";
//     let phoneNumberString = "";
//     if (typeof phoneNumber !== "number") return;

//     phoneNumberString = phoneNumber.toString();

//     formattedPhoneNumber =
//       "(" +
//       phoneNumberString.substring(0, 3) +
//       ") " +
//       phoneNumberString.substring(3, 6) +
//       "-" +
//       phoneNumberString.substring(6);

//     return formattedPhoneNumber;
//   };

//   export const formatScheduleMessage = (data) => {
//     let message =
//       "Please schedule appointments for the following members (include spouse, if married):";

//     data.forEach((d) => {
//       message += `\n${d.lastName}, ${d.firstName}`;
//     });

//     return message;
//   };

//   export const formatCallingsUpdatesMessage = (data) => {
//     let message = "Please make the following updates:";

//     data.forEach((d) => {
//       message += `\n${d.lastName}, ${d.firstName} - ${d.update} as ${d.calling?.calling}`;
//     });

//     return message;
//   };
