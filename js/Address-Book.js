    const fullname = document.querySelector('#fullname');
    const fullnameerror = document.querySelector('.fullname-error');
    fullname.addEventListener('input',function(){
        let pattern = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
        if(pattern.test(fullname.value)) fullnameerror.textContent='';
        else fullnameerror.textContent = 'Invalid Full Name';    
    });

    const phone = document.querySelector('#phone');
    const phoneerror = document.querySelector('.phone-error');
    phone.addEventListener('input',function(){
        let Pattern = RegExp('^[0-9]{10}$');
        if(Pattern.test(phone.value)) phoneerror.textContent = '';
        else phoneerror.textContent = 'Invalid Mobile No.';
    });
