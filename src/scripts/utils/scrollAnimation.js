const scrollAnimation = (block, cls, offset = 0, infinity = false) => {
  let position = block.getBoundingClientRect();
  let top = position.top + window.pageYOffset;
  let hasClass = block.classList.contains('scroll-animation');
  let hasMod = block.classList.contains(cls);

  if (typeof block === 'object' && block && typeof cls === 'string') {
    if (window.pageYOffset + window.innerHeight + offset >= top && !hasMod && hasClass) {
      block.classList.add(cls);
    } else if (window.pageYOffset + window.innerHeight + offset < top && hasMod && hasClass && infinity) {
      block.classList.remove(cls);
    }
  }
};

export default scrollAnimation;