import { MemberDetails } from "../interface/common";

export const calculateAgeInYears = (isoDateString: string): number => {   // isoDateString = "2024-11-27T04:57:00.000Z"
  const dob = new Date(isoDateString);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());

  if (!hasHadBirthdayThisYear) {
    age -= 1;
  }

  return age;
}


export const convertToISO = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString();
}

export const isFutureDate = (dateString: string) => { //"2025-05-31T14:38:48.827Z"
  const inputDate = new Date(dateString);
  const today = new Date();

  // Set today's time to 00:00:00 for a pure date comparison
  today.setHours(0, 0, 0, 0);

  return inputDate > today;
}

export const getNewJoinee = (membersList: MemberDetails[],getOnlyCount:boolean =false) => { //"2025-05-31T14:38:48.827Z"

  const now = new Date();
  const currentMonth = now.getMonth(); // 0-11
  const currentYear = now.getFullYear();

  const currentMonthJoins = membersList.filter(member => {
    const joinDate = new Date(member.dateOfJoin);
    return (
      joinDate.getMonth() === currentMonth &&
      joinDate.getFullYear() === currentYear
    );
  });

  return  getOnlyCount ? currentMonthJoins.length :currentMonthJoins
}


export const getFeesPendingMembers = (membersList: MemberDetails[],getOnlyCount:boolean =false) => { //"2025-05-31T14:38:48.827Z"

  const today = new Date();

const upcomingPayments = membersList.filter(member => {
  const nextPayment = new Date(member.nextPaymentDate);
  return nextPayment < today;
});

  return  getOnlyCount ? upcomingPayments.length :upcomingPayments
}

export const getTodayDateRange=():{ fromDate: string; toDate: string }=>  {
  const now = new Date();

  // Set fromDate to today's midnight UTC
  const fromDate = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0
  ));

  // Set toDate to today's 23:59:59 UTC
  const toDate = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23, 59, 59
  ));

  return {
    fromDate: fromDate.toISOString(), // e.g., '2025-06-18T00:00:00.000Z'
    toDate: toDate.toISOString(),     // e.g., '2025-06-18T23:59:59.000Z'
  };
}


export const converNumberToRupee=(amount:string|number)=>{
  return parseInt(amount.toString()).toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  });
}
