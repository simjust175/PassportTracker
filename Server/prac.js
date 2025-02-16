let today = new Date();
let sixMonthsAgo = new Date(today.setMonth(today.getMonth() + 6));

// Format the date if needed
let formattedDate = sixMonthsAgo.toISOString().split('T')[0];
console.log(formattedDate);


