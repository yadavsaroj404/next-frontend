// app/head.tsx
import Script from "next/script";

export default function Head() {
  return (
    <>
      <title>CareerNaksha • Form Details</title>
      <meta name="description" content="Psychometric career assessment" />

      {/* CloudFront JS (runs after interactive) */}
      <Script
        src="https://d2t0yxygbqzqe9.cloudfront.net/assets/js/careernaksha.js"
        strategy="afterInteractive"
      />

      {/* TuWidget init */}
      <Script
        id="tu-widget-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            TuWidget({
              start_form_div: "tu-widget",
              manager: "TUB0015",
              data_inquiry_show:0,
              data_inquiry_pop_up:0,
              data_free_show:0,
              data_free_pop_up:0,
              inquiry_form_div:"",
              inquiry_form_css:{},
              free_form_div:"",
              free_form_css:{},
              start_form_css:{
                tu_test_code_wrapper:"tu-widget-already-test-form",
                test_code_label:"Enter Code",
                tu_test_code:"tu_code_input",
                test_code_description:"",
                tu_email_wrapper:"form-group",
                tu_bulk_email_id:"",
                tu_bulk_email:"form-control",
                email_description:"",
                tu_reemail_wrapper:"form-group",
                tu_bulk_confirm_email_id:"",
                tu_bulk_confirm_email:"form-control",
                reemail_description:"",
                tu_submit_wrapper:"",
                start_form_submit:"btn btn-coupon"
              }
            });
          `,
        }}
      />
    </>
  );
}
