export const emailTemplate = (email,userName,token,refreshToken,subject)=>{
    let content= ``
    if (subject== 'register'){
        content=`<p>نحن سعداء بانضمامك إلينا. نشكرك على التسجيل معنا.</p>
        <p>إذا كان لديك أي أسئلة، فلا تتردد في التواصل مع المسؤول 
        ! نتمنى لك رحلات مليئة بالافادة و المتعة </p>
        <a href='https://cycling-palestine.onrender.com/auth/confirmEmail/${token}' style="display: inline-block; 
        padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #4CAF50; text-align: center; 
        text-decoration: none; border-radius: 5px;">
       تأكيد الايميل</a> 
        <a href ='https://cycling-palestine.onrender.com/auth/newconfirmEmail/${refreshToken}' 
        style="display: inline-block; padding: 10px 20px; font-size: 16px; color: black; border: 2px solid black; 
        text-align: center; text-decoration: none; border-radius: 5px;">اعادة تأكيد الايميل</a> `
    }
    if(subject=='participate'){
        content=` <h1>اهلاً بك في رحلة جديدة في بلادنا!</h1>
        <p>'أهلاً بك في رحلة جديدة على البسكليت.. سعيدون لمشاركتنا معك رحلة مليئة بالمغامرات و المعلومات الجديدة.. نتمنى لك القدر الاكبر من الافادة و المتعة!</p>
        `
    }
    if(subject =='Invoice'){
        content=`<h1>!${userName},مرحباً</h1>
       <p> We are happy that you purchased our product. We hope you like it, here is your invoice  </p>`
      }
    if(subject=='sendCode')
        {
            content=`<h3>The Code is : ${token}</h3>`
        }
  return  ` <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .header {
                background-color: #4CAF50;
                color: white;
                padding: 10px;
                text-align: center;
                font-size: 24px;
            }
            .content {
                margin: 20px 0;
                text-align: center;
            }
            .content h1 {
                color: #333333;
            }
            .content p {
                color: #666666;
                font-size: 16px;
                line-height: 1.6;
            }
            .footer {
                text-align: center;
                padding: 10px;
                color: #999999;
                font-size: 14px;
            }
        </style>
    </head>
    <body>
        <div class="container" direction: "rtl">
            <div class="header">
                مرحباً بك في عائلة فلسطين ع البسكليت
            </div>
            <div class="content">
            
                <h1>!${userName},مرحباً</h1>
                ${content}
                </div>
           
            <div class="footer">
                &copy; ${new Date().getFullYear()} Our Service. All rights reserved.
            </div>
        </div>
    </body>
    </html>`
}
//${req.protocol}://${req.headers.host}