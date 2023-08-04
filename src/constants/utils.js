export const calculateAgeInYears=(dob)=> {
    const currentDate = new Date();
    const dobDate = new Date(dob);
  
    let age = currentDate.getFullYear() - dobDate.getFullYear();
  
    if (currentDate.getMonth() < dobDate.getMonth() ||
        (currentDate.getMonth() === dobDate.getMonth() && currentDate.getDate() < dobDate.getDate())) {
      age -= 1;
    }
  
    return age;
  }