var age_ ,annual_income_, empy_length_, loan_amount_, interest_rate_, percent_income_, credit_history_, home_ownership_, loan_intent_, loan_grade_, hist_default_;

$(document).ready(function(){
  // fetch all DOM elements for the input
  age_ = document.getElementById("Age");
  annual_income_ = document.getElementById("Annual Income");
  empy_length_ = document.getElementById("Employment length (in years)");
  loan_amount_ = document.getElementById("Loan amount");
  interest_rate_ = document.getElementById("Interest rate");
  percent_income_ = document.getElementById("Percent income");
  credit_history_ = document.getElementById("Credit history length");
  home_ownership_ = document.getElementById("Home ownership");
  loan_intent_ = document.getElementById("Loan intent");
  loan_grade_ = document.getElementById("Loan grade");
  hist_default_ = document.getElementById("Historical default");
})

$(document).on('click','.button',function(e){
    // on clicking submit fetch values from DOM elements and use them to make request to our flask API
    var age = age_.value;
    var annual_income = annual_income_.value;
    var empy_length = empy_length_.value;
    var loan_amount = loan_amount_.value;
    var interest_rate = interest_rate_.value;
    var percent_income = percent_income_.value;
    var credit_history = credit_history_.value;
    var home_ownership = home_ownership_.value;
    var loan_intent = loan_intent_.value;
    var loan_grade = loan_grade_.value;
    var hist_default = hist_default_.value;
    if(Age == ""){
      // you may allow it as per your model needs
      // you may mark some fields with * (star) and make sure they aren't empty here
      alert("empty fields not allowed");
    }
    else{
      // replace <username> with your pythonanywhere username
      // also make sure to make changes in the url as per your flask API argument names
      // var requestURL = "http://127.0.0.1:5000/predict?Age="+Age+"&Sex="+Sex+"&Job="+Job+"&Housing="+Housing+"&saving_account="+saving_account+"&checking_account="+checking_account+"&credit_amount="+credit_amount+"&duration="+duration+"&purpose="+purpose;
      // console.log(requestURL); // log the requestURL for troubleshooting
      
      // $.getJSON(requestURL, function(data) {
      //   console.log(data); // log the data for troubleshooting
      //   prediction = data['result'];
      //   $(".result").html("Prediction is: "+prediction);
      //   $(".result").css({
      //     "color": "#666666",
      //     "text-align": "center"
      //   });
      // });
      
      var data = {
         'cb_person_cred_hist_length': credit_history,
         'cb_person_default_on_file': hist_default,
         'loan_amnt': loan_amount,
         'loan_grade': loan_grade,
         'loan_int_rate': interest_rate,
         'loan_intent': loan_intent,
         'loan_percent_income': percent_income,
         'person_age': age,
         'person_emp_length': empy_length,
         'person_home_ownership': home_ownership,
         'person_income': annual_income
      };

      // # https://api.jquery.com/jquery.post/
      // # https://stackoverflow.com/questions/56032972/sending-a-dictionary-from-js-to-flask-via-ajax
      $.ajax({
        url: 'http://127.0.0.1:5555/predict',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({data}),
        dataType: "json",
        type: 'POST',
        success: function(response){
            // console.log(response);
            prediction = response['result'];
            $(".result").html("Prediction is: "+prediction);
            $(".result").css({
              "color": "#666666",
              "text-align": "center"
            });
        },
        error: function(error){
            console.log(error);
        }
    });
      // following lines consist of action that would be taken after the request has been read
      // for now i am just changing a <h2> tag's inner html using jquery
      // you may simple do: 
      // alert(prediction);
      e.preventDefault();
    }
  });
