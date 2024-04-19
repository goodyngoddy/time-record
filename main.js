
let cont = document.querySelector('.cont')
let input = document.querySelector('#input')
let btn = document.querySelector('.btn')
let contItem = document.querySelectorAll('.cont-item')
let contItemText = document.querySelectorAll('.cont-item-text')
let num = 0

// let contObj
function getObj() {
  if (Object.keys(localStorage).includes("contObj")) {
    contObj = JSON.parse(localStorage.getItem("contObj"))
    for (var i = 0; i < contObj.length; i++) {
      console.log(contObj[i])
      cont.innerHTML += `
        <div class="cont-item">
          <div class="cont-item-text">${contObj[i].text}</div>
          <div class="cont-item-time"></div>
        </div>
      `
    }
  } else {
    let contObj = []
    localStorage.setItem("contObj", JSON.stringify(contObj))
  }
  return contObj
}

window.onload = getObj()

function setCont() {
  cont.innerHTML += `
    <div class="cont-item">
      <div class="cont-item-text">${contObj[contObj.length - 1].text}</div>
      <div class="cont-item-time">just now</div>
    </div>
  `
  input.value = ''
}

document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'Enter':
      setCont()
      break;
  }
})

btn.addEventListener('click', () => {
  let tempArr = []
  let clickTime = new Date()
  let obj = new Object()
  obj.id = num
  obj.time = Math.floor(clickTime.getTime()/1000)
  obj.text = input.value
  tempArr.push(obj)
  contObj = contObj.concat(tempArr)
  num++
  tempArr = []
  setCont()
  
  localStorage.setItem("contObj", JSON.stringify(contObj))
})


let interval = setInterval(() => {
  let contItemTime = document.querySelectorAll('.cont-item-time')
  let currTime = new Date()
  let t = Math.floor(currTime.getTime()/1000)
  
  for (let i = 0; i < contItemTime.length; i++) {
    let timeDiff = t - contObj[i].time
    let mins = Math.floor(timeDiff/60)
    let hrs = Math.floor(mins/60)
    let days = Math.floor(hrs/24)
    let weeks = Math.floor(days/7)
    let months = Math.floor(days/30)
    let yrs = Math.floor(months/12)
    
    if (mins < 1) {
      contItemTime[i].textContent = `just now`
    }
    else if (hrs < 1) {
      contItemTime[i].textContent = `${mins}mins ago`
    }
    else if (days < 1) {
      contItemTime[i].textContent = `${hrs}hrs ago`
    }
    else if (weeks < 1) {
      contItemTime[i].textContent = `${days}days ago`
    }
    else if (months < 1) {
      contItemTime[i].textContent = `${weeks}weeks ago`
    }
    else if (yrs < 1) {
      contItemTime[i].textContent = `${months}months ago`
    }
    else {
      contItemTime[i].textContent = `${yrs}years ago`
    }
  }
}, 1000)


