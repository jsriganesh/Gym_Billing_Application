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


export  const convertToISO=(dateString:string)=>{
    const date = new Date(dateString);
    return date.toISOString();
}