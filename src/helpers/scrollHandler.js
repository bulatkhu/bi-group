export const scrollBodyHandler = {
  body: document.querySelector('body'),
  lock() {
    this.body.classList.add('scroll-locked')
  },
  unLock() {
    this.body.classList.remove('scroll-locked')
  },
  switch() {
    this.body.classList.contains('scroll-locked')
      ? this.body.classList.remove('scroll-locked')
      : this.body.classList.add('scroll-locked')
  }
}