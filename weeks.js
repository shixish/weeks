const ONE_DAY = 1000*60*60*24;
const ONE_WEEK = ONE_DAY*7;
const ONE_YEAR = ONE_WEEK*52;

const params = (new URL(document.location)).searchParams;
const BIRTHDAY_YEAR = 1988;
const BIRTHDAY_MONTH = 6;
const BIRTHDAY_DAY = 13;
const FULL_AGE = 81;

const birthday = new Date(`${BIRTHDAY_YEAR}-${BIRTHDAY_MONTH}-${BIRTHDAY_DAY} 00:00:00`);
const death = new Date(`${BIRTHDAY_YEAR+FULL_AGE}-${BIRTHDAY_MONTH}-${BIRTHDAY_DAY} 00:00:00`);

const weeks = Math.round((death - birthday)/ONE_WEEK);
const leftover = weeks-52*81;

const generateTable = (currentWeek)=>{
  const currentYear = Math.floor(currentWeek/52);
  const weekOfThisYear = currentWeek - currentYear*52
  let table = '<table class="grid">';
  for (let i = 0; i < FULL_AGE; i++){
    if (i === currentYear){
      table += `<tr class="current">${`<td class="past"></td>`.repeat(weekOfThisYear-1)}${`<td class="current"></td>`}${`<td></td>`.repeat(52-weekOfThisYear)}</tr>`;
    }else if (i < currentYear){
      table += `<tr class="past">${`<td></td>`.repeat(52)}</tr>`;
    }else{
      table += `<tr>${`<td></td>`.repeat(52)}</tr>`;
    }
  }
  if (leftover > 0){
    table += `<tr>${`<td></td>`.repeat(leftover)}${leftover < 52?`<td colspan="${52-leftover}" class="nothing"></td>`:``}</tr>`;
  }
  table += '</table>';
  return table;
};

const elDisplay = document.createElement('main');
elDisplay.classList.add('display');
document.body.insertAdjacentElement('afterbegin', elDisplay);

let lastCurrentWeek;
const update = ()=>{
  const currentDays = (new Date() - birthday)/ONE_DAY;
  const currentWeek = Math.ceil(currentDays/7);
  if (lastCurrentWeek !== currentWeek){
    elDisplay.innerHTML = generateTable(lastCurrentWeek = currentWeek);
  }
  document.documentElement.style.setProperty('--day-of-week-percentage', (currentDays%7/7*100).toFixed(2) + '%');
}

setInterval(() => {
  update();
}, 1000);
update();