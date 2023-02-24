let month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "STI"];
let RecentActive = document.querySelectorAll('.recActive > .images > div');
let images = document.querySelectorAll('.landing > .images > img');
images = new Array(...images);
let tuples = document.querySelectorAll('.tuples > span');
tuples = new Array(...tuples);
let btn2 = document.querySelector('.tfoot > button');
let idx = 0;
let start = 0;
let tsks = [];
let hour;
let men;
let sec;
let day;
let year;
window.onload = function () {
  document.querySelector('table').innerHTML = Table(31);
  start = (31 % 7);
}
setInterval(function () {
  let time = new Date;
  hour = (time.getHours()) % 12;
  men = time.getMinutes();
  sec = time.getSeconds() + 1;
  mon = time.getMonth() + 1;
  day = time.getUTCDate();
  year = time.getFullYear();
  let full = `<span>${mon}-${day}-${year}</span><span>${hour}:${(men < 10 ? '0' + men : men)}:${sec}</span>`;
  document.querySelector('.thead').innerHTML = full;
}, 1000)
let Blur = function (ele) {
  RecentActive.forEach((e) => {
    e.classList.add('blur');
  })
  ele.classList.remove('blur');
}
let AddBlur = function (e) {
  e.classList.add('blur');
}
setInterval(function () {
  if (idx == 3) idx = 0;
  images.forEach((e) => {
    e.classList.remove('active');
  })
  tuples.forEach((e) => {
    e.classList.remove('active');
  })
  tuples[idx].classList.add('active');
  images[idx].classList.add('active');
  idx++;
}, 3000);
setTimeout(() => {
  let data = (mon - 2);
  data = +data + 1;
  if (data > 11) data = 0;
  document.querySelector('.month').innerHTML = month[data];
  document.querySelector('.month').setAttribute('data-num', data);
  if (data == 1) {
    document.querySelector('table').innerHTML = Table(28);
    start = ((start + 28) % 7);
  }
  else if (data == 3 || data == 5 || data == 8 || data == 10) {
    document.querySelector('table').innerHTML = Table(30);
    start = ((start + 30) % 7);
  }
  else {
    document.querySelector('table').innerHTML = Table(31);
    start = ((start + 31) % 7);
  }document.querySelector(`#td${day}`).style = "background-color:#c12f6c;color:#fff;";
}, 1000);

function Table(n) {
  let cols = 0;
  let table = '<table><tr>';
  days.forEach((e) => {
    table += `<th>${e}</th>`;
  })
  table += '</tr><tr onclick="tasks(event)">';
  for (let i = 0; i < start; i++){
    table += "<td></td>";
    cols++;
  }
  for (let i = 1; i <= n; i++){
    let result = document.createElement("div");
    if (cols % 7 == 0) {
      table += '</tr>';
      if (cols != n) table += '<tr onclick="tasks(event)">';
    }
    let ele = `<div class="div${i}">
                <span class="span${i}" onclick="Close(this)" style="width: 15px;height: 15px;position: absolute;right: 11px;top: 5px;color: #e80505;border-radius: 50%;display: flex;justify-content: center;align-items: center;font-size: 12px;align-content: center;text-align: center;line-height: 10;border: 1px solid #e80505;cursor: pointer;">x</span>
                <div class="parent" style="height:40px; padding:10px;background-color:#eee;margin:20px auto;width:100%;border-radius:5px;display:flex;justify-content : space-evenly">
                  <input class="tsk${i}" type="text" placeholder="Write Task" style="width:100%;background-color:#eee";/>
                  <button onclick="add(this)" class="add${i}" style="padding:5px 10px;background-color:#e80505;color:#fff;border:none;border-radius:5px;font-size: 10px;">Add</button>
                </div>
                <div class="result${i}" style="display:flex; flex-wrap:wrap; flex-direction: row;padding : 10px ;height:100%; background-color:#eee;overflow: scroll; margin:0px auto;width:100%;border-radius:5px;justify-content : space-evenly">
                </div>
              </div>`;
    table += `<td class='td' id="td${i}">${ele}${i}</td>`;
    cols++;
  }
  while (cols % 7 != 0){
    table += '<td></td>';
    cols++;
  }
  table += '</tr></table>';
  return table;
}

btn2.onclick = function ChangeMonth (ele) {
  let data = document.querySelector('.month').getAttribute('data-num');
  data = +data + 1;
  if (data > 11) data = 0;
  document.querySelector('.month').innerHTML = month[data];
  document.querySelector('.month').setAttribute('data-num', data);
  if (data == 1) {
    document.querySelector('table').innerHTML = Table(28);
    start = ((start + 28) % 7);
  }
  else if (data == 3 || data == 5 || data == 8 || data == 10) {
    document.querySelector('table').innerHTML = Table(30);
    start = ((start + 30) % 7);
  }
  else {
    document.querySelector('table').innerHTML = Table(31);
    start = ((start + 31) % 7);
  }
  if (data + 1 == mon ) {
    document.querySelector(`#td${day}`).style = "background-color:#c12f6c;color:#fff;";
  }
}

function tasks(ele) {
  if (ele.target.className != 'td') return;
  document.querySelectorAll('td > div').forEach((e) => {
    e.classList.remove('task');
  });
  let x = ele.target.querySelector('div');
  x.classList.add('task');
}
function add(ele) {
  let newDiv = document.createElement("div");
  newDiv.textContent = document.querySelector(`.tsk${ele.className.substr(3)}`).value;
  newDiv.innerHTML += `<div style="color: #b1aaaa;display: inline-flex;gap: 6px;font-size: 10px;margin-left: 10px;"><span>${hour}:${(men < 10 ? '0' + men : men)}:${sec}</span></div>`;
  newDiv.className = `taskIn${ele.className.substr(3)}`;
  newDiv.style.cssText = "background-color:#fff;width:100%;padding:5px;margin: 5px 0px;border-radius:2px;height: fit-content;text-align: initial;";
  let btn2 = document.createElement("button");
  btn2.textContent = "Delete";
  btn2.style.cssText = "padding:4px;background-color:#e80505;color:#fff;border:none;border-radius:5px;float: right;font-size: 10px;";
  tsks.push(newDiv);
  newDiv.append(btn2);
  document.querySelector(`.result${ele.className.substr(3)}`).append(newDiv);
  btn2.addEventListener("click", (e) => {
    tsks = tsks.filter((el) => el !== `${e.currentTarget}`);
    window.localStorage.setItem('tasks', JSON.stringify(tsks));
    e.currentTarget.parentElement.remove();
  });
  document.querySelector(`#td${ele.className.substr(3)}`).style = "background-color:#b1aaaa;";
}

function Close(ele) {
  document.querySelector(`.div${ele.className.substr(4)}`).style = "display:none;";
}
