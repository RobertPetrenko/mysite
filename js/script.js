"use strict";

// Base-64 encoded mail and phone.
let myMail = "cm9iZXJ0cGV0cmVua285QGdtYWlsLmNvbQ==";
let myPhone = "MDYgMTAgOTIgMzYgNzg=";

// Dcode strings
let myMailDecoded = atob(myMail);
let myPhoneDecoded = atob(myPhone);

// Populate HTML tags.
$('#myMail').html(myMailDecoded);
$('#myPhone').html(myPhoneDecoded);

// Populate href attributes.
$('#mail-link').attr('href', myMailDecoded);
$('#phone-link').attr('href', 'tel:+33' + myPhoneDecoded);

// Toggle responsive class on nav for mobile display.
$('#nav-button').on('click', function () {
  // Get HTML DOM Object of JQuery object for nav element.
  let nav = $('#topnav')[0];

  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
});

// $.fn.isInViewport = function() {
//   var elementTop = $(this).offset().top;
//   var elementBottom = elementTop + $(this).outerHeight();
//   var viewportTop = $(window).scrollTop();
//   var viewportBottom = viewportTop + $(window).height();
//   return elementBottom > viewportTop && elementTop < viewportBottom;
//   };

// $(window).on('resize scroll', function() {
//   let element = $('.show-on-scroll');
//   element.each(function(){
//     element.addClass('is-visible');
//   })
// });

// Detect request animation frame
let scroll = window.requestAnimationFrame ||
  // IE Fallback
  function (callback) { window.setTimeout(callback, 1000 / 60) };
let elementsToShow = document.querySelectorAll('.show-on-scroll');

function loop() {

  elementsToShow.forEach(function (element) {
    if (isElementInViewport(element)) {
      element.classList.add('is-visible');
    }
  });

  scroll(loop);
}

// Call the loop for the first time
loop();

function isElementInViewport(el) {
  // special bonus for those using jQuery
  if (typeof jQuery === "function" && el instanceof jQuery) {
    el = el[0];
  }
  var rect = el.getBoundingClientRect();
  return (
    (rect.top <= 0
      && rect.bottom >= 0)
    ||
    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
    ||
    (rect.top >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
  );
}

// Changing form submit button when all fields are filled.
$('.form-field').on("input", function () {
  changeButtonColor();
});

function changeButtonColor() {

  let filledForm = true;

  $('.form-field').each(function () {
    if ($(this).val() == '') {
      filledForm = false;
    }
  });

  let validMail = mail.checkValidity();

  if (filledForm && validMail) {
    $('.submit-button').removeClass('non-active-button').attr("disabled", false);
  } else {
    $('.submit-button').addClass('non-active-button');
  }
}

$("#form").submit(function(event){
  event.preventDefault();
  var formElement = document.querySelector("#form");
  var request = new XMLHttpRequest();
  request.open("POST", "index.php");
  request.send(new FormData(formElement));

  request.onreadystatechange = function() {
    if (request.readyState == 4) {
      $("#result").html('Merci ! C\'est envoyé.');
    }
  };


//   event.preventDefault();
  
//   var term = $('#name').val();
//   var url = $(this).attr( "action" );
//   console.log(term);
//   console.log(url);
  
  

//   var posting = $.post( url, { name: term } );

// console.log(posting);

	// let post_url = $(this).attr("action");
	// let request_method = $(this).attr("method");
  // let form_data = $(this).serializeArray();

  //let data = 'name='+$('#name').val()+'mail='+$('#mail').val()+'msg='+$('#msg').val();
  // console.log(post_url);
  // console.log(request_method);
  // console.log(form_data);
  //console.log(data);
  
  //'userName='+$("#userName").val()+
  //$.post('index.php', {data});
	// $.ajax({
	// 	url : post_url,
	// 	type: request_method,
  //   data : 'name='+$('#name').val()+'mail='+$('#mail').val()+'msg='+$('#msg').val()
  // }).done(function(){ 
  //   $("#result").html('Merci ! C\'est envoyé.');
  // });
});