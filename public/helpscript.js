(function($) {

    var url  = window.location.href;  
    console.log("The current URL is: " + url);
    
    $('#app, #steps').fadeIn('slow');

    var loc,graph,pattern = false;
    
    $('#get-accounts-btn').on('click', function(e) {
      
      if(!loc)
      {
         $('#get-accounts-data').slideDown();
        
        $('#get-accounts-data').slideUp(function() {
          var html = ' ';
          
            html += '<div class="inner">';
            html += '1) Which place do I spend the most money on?<br>';
            html += '2) Where can I buy less expensive coffee? (Coming soon!)<br>';
            html += '3) Which place has my highest gas spending amount on?<br>';
            html += '4) How much did I spend at this shopping mall last month? (Coming soon!)<br>';
            html += '5) Where is the cheapest sandwich shop around me? (Coming soon!)';
            html += '</div>';

          $(this).html(html).slideDown();
        });
        loc = true;
      }
      else
      {
         $('#get-accounts-data').slideDown();
         $('#get-accounts-data').slideUp(function() { $(this).html('').slideDown(); });
         loc = false;
      }
      
    });

  $('#get-item-btn').on('click', function(e) {
      if(!graph)
      {
              
         $('#get-item-data').slideDown();
        
        $('#get-item-data').slideUp(function() {
          var html = ' ';
          
            html += '<div class="inner">';
            html += '1) Can you show me my buckets?<br>';
            html += '2) Can you show me how much I have donated this month<br>';
            html += '3) Can I afford to buy a $5 coffee?<br>';
            html += '4) How do I open an account?<br>';
            html += '5) What is the balance in my savings account?<br>';
            html += '6) How much money did I earn in December?<br>';
            html += '7) How much did I earn last month/week/year?<br>';
            html += '8) How much did I earn in the last 3 months/weeks/years<br>';
            html += '9) How much did I spend this month?<br>';
            html += '10) Can you transfer $50 from Food & Drink to Bills?<br>';
            html += '11) Show me my last 5 transactions';
            html += '</div>';

          $(this).html(html).slideDown();
        });
        graph = true;
      }
      else
      {
         $('#get-item-data').slideDown();
         $('#get-item-data').slideUp(function() { $(this).html('').slideDown(); });
         graph = false;
      }


    });
    
    
    
     $('#get-transactions-btn').on('click', function(e) {
      if(!pattern)
      {
        
        $('#get-transactions-data').slideDown();
        
        $('#get-transactions-data').slideUp(function() {
          var html = ' ';
          
            html += '<div class="inner">';
            html += '1) How much did I spend/save on traveling/rent/education/movies/food<br>';
            html += '2) How do I save $30 this week?<br>';
            html += '3) Can you help me save for a car?<br>';
            html += '4) When is my next credit card payment due?<br>';
            html += '5) How can I cut back on my spending?<br>';
            html += '6) Did I buy something from Amazon.com yesterday?<br>';
            html += '7) Can you transfer $15 from my movies budget to my rent bucket?<br>';
            html += '8) What was my most expensive purchase last week?<br>';
            html += '9) Where was my last deposit from?<br>';
            html += '10) I need to save $5 from my Food & Drink bucket';
            html += '</div>';

          $(this).html(html).slideDown();
        });
        pattern = true;
        
      }
      else
      {
         $('#get-transactions-data').slideDown();
         $('#get-transactions-data').slideUp(function() { $(this).html('').slideDown(); });
      }

    });
    
  })(jQuery);