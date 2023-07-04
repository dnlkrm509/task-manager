export function getFormatedDate(date) {
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"];
    const day_week = weekday[date.getUTCDay()];
    const day_month = date.getUTCDate();
    const month = months[date.getUTCMonth()];
    return `${day_week} ${day_month} ${month}`;
};