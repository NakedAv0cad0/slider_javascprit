// Collect infromations
const imgs = Array.from(document.querySelectorAll('.slider img'))
const next = document.getElementById('next')
const prev = document.getElementById('prev')
const slideNumber = document.getElementById('slide-number')
const indicator = document.getElementById('indicators')

// creat indicators
const ul = document.createElement('ul')
indicator.appendChild(ul)

for (let img in imgs) {
  let li = document.createElement('li')
  li.innerHTML = +img + 1
  li.className = 'pagination'
  ul.appendChild(li)
}

const keys = Array.from(document.querySelectorAll('ul li'))

// Initial settings
imgs[2].classList.add('active')
keys[2].classList.add('active')
slideNumber.innerHTML = `Slide #3`

// next & previous buttons

function slide(btn, side) {
  if (btn.classList.contains('disabled')) return;
  for (let img in imgs) {
    if (!imgs[img].classList.contains('active')) continue;
    imgs[img].classList.remove('active')
    keys[img].classList.remove('active')
    imgs[+img + side].classList.add('active')
    keys[+img + side].classList.add('active')
    return;
  }
}

next.addEventListener('click', (e)=> slide(e.target, 1))
prev.addEventListener('click', (e)=> slide(e.target, -1))

// Indicators settings
document.addEventListener('click', (e)=> {
  const link = e.target
  if (!link.classList.contains('pagination') && !link.classList.contains('active')) return

  for (let key in keys) {
    keys[key].classList.remove('active')
    imgs[key].classList.remove('active')
  }
  link.classList.add('active')
  imgs[keys.indexOf(link)].classList.add('active')
  disable()
})

document.addEventListener('click', (e)=> {
  let btn = e.target
  if (!btn.classList.contains('next') && !btn.classList.contains('previous')) return
  disable()
})

// deal with the disable class and the slide-number
function disable() {
  let main = imgs.indexOf(document.querySelector('img.active'))
  let start = 0
  let end = (imgs.length - 1)
  
  slideNumber.innerHTML = `Slide #${main + 1}`

  next.classList.remove('disabled')
  prev.classList.remove('disabled')
  if (main === start) prev.classList.add('disabled')
  if (main === end) next.classList.add('disabled')
}