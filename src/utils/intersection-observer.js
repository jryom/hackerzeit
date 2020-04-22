let intersectionObserver;

export default (handler) => {
  if (!intersectionObserver) {
    if (typeof window !== 'undefined' && !window.IntersectionObserver) {
      require('intersection-observer'); // eslint-disable-line global-require
    }

    intersectionObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          observer.unobserve(entry.target);
          handler();
        }
      });
    });
  }

  return intersectionObserver;
};
