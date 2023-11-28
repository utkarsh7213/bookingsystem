$(document).ready(function () {
    $('.rating').each(function () {
        const rating = parseInt($(this).data('star'));
        const stars = $(this).find('.star');
        stars.slice(0, rating).addClass('active');
    });
    
});

$(document).ready(function () {
    $('.dollar_cost').each(function () {
      const cost = parseInt($(this).data('cost'));
      const dollarSigns = $(this).find('.dollar_sign');
      
      dollarSigns.each(function () {
        const dollarValue = parseInt($(this).data('cost'));
        if (dollarValue <= cost) {
          $(this).addClass('active');
        }
      });
    });
  });