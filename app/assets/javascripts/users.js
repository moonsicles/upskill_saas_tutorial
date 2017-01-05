/* global $, Stripe, stripeResponseHandler */
// Document ready
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var signupBtn = $('#form-signup-btn')
  // Set Stripe Public Key
  Stripe.setPublishableKey ( $('meta[name="stripe-key"]').attr('content') );
  // When user clicks form submit button, 
  signupBtn.click(function(event){
    // we will prevent default submissionbehavior
    event.preventDefault();
    // Collect credit card fields
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    //Send card informaiton to Stripe
    Stripe.createToken({
      number: ccNum,
      cvc: cvcNum,
      exp_month: expMonth,
      exp_year: expYear
    }, stripeResponseHandler);
    
  });
  // Stripe will return card token.
  // Inject token as hidden field on form
  // Submit form to our rails app.
});