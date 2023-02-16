const card = document.querySelector('.card');

card.addEventListener('mouseenter', e => {
  card.querySelector('.card-info').style.transform = 'translateY(0)';
});

card.addEventListener('mouseleave', e => {
  card.querySelector('.card-info').style.transform = 'translateY(100%)';
});
