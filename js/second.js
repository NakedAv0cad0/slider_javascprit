// 1
const imgs = Array.from(document.querySelectorAll('.slider img'))
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const disc = document.getElementById('slide-number')
const indicators = document.getElementById('indicators')

// 5
const ul = document.createElement('ul')
indicators.appendChild(ul)
for (let img in imgs) {
  let li = document.createElement('li')
  li.innerHTML = +img + 1
  li.className = 'link'
  ul.appendChild(li)
}

const keys = Array.from(document.querySelectorAll('ul li'))

// 2
imgs[0].classList.add('active')
keys[0].classList.add('active')
prev.classList.add('disabled')
disc.innerHTML = `Slide #1`

// 3
next.onclick = ()=> {
  if (next.classList.contains('disabled')) return;
  for (let img in imgs) {
    if (imgs[img].classList.contains('active')) {
      imgs[img].classList.remove('active')
      imgs[+img + 1].classList.add('active');
      console.log(keys[img])
      keys[img].classList.remove('active')
      keys[+img + 1].classList.add('active');
      console.log(keys[img + 1])
      return
    }
  }
}

prev.onclick = ()=> {
  if (prev.classList.contains('disabled')) return;
  for (let img in imgs) {
    if (imgs[img].classList.contains('active')) {
      imgs[img].classList.remove('active')
      imgs[img - 1].classList.add('active');
      keys[img].classList.remove('active')
      keys[img - 1].classList.add('active');
      return;
    }
  }
}

// 4
document.addEventListener('click', (e)=> {
  if (!e.target.classList.contains('next') && !e.target.classList.contains('previous')) return
  disable()
})

// 5
document.addEventListener('click', (e)=> {
  if (!e.target.classList.contains('link') && !e.target.classList.contains('active')) return
  
  for (let key in keys) {
    keys[key].classList.remove('active')
    imgs[key].classList.remove('active')
  }
  e.target.classList.add('active')
  imgs[keys.indexOf(e.target)].classList.add('active')
  disable()
})

// 6
function disable() {
  let main = imgs.indexOf(document.querySelector('img.active'))
  let start = 0
  let end = (imgs.length - 1)

  disc.innerHTML = `Slide #${main + 1}`
  
  next.classList.remove('disabled')
  prev.classList.remove('disabled')
  if (main === start) prev.classList.add('disabled')
  if (main === end) next.classList.add('disabled')
}
