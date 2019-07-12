// console.log(getCardHtml({type:'User', mode:'base'}));

function getCardHtml(card) {

  let baseHtml = {
    base: `    <div style="text-align: center;">
                <hr><div class="headText3">
                  <b>
                    Congratulations ! <br>
                    Your account is activated successfully.<br>
                    Create new ######.</b>
                </div><hr><br>
                <span class="login-btn" ng-click="newPopupShow('######')">Create New ######</span>
              </div>
          `,

    user:`
            <span class="right cardOption" ng-click="popupShow('user')"><span>&#9778;</span></span>
            <div class="headText3"> <b>Company Details</b> </div>
            <h2 class="loadingDiv">{{defaultuser.name}}</h2> <hr>
            <div class="loadingDiv head2"> <b>{{defaultuser.address1}} <br> {{defaultuser.address2}} <br> {{defaultuser.address3}} </b></div>
            <div class="loadingDiv head3"> <b>Phone : </b>{{defaultuser.phone}} <br> <b>Email : </b>{{defaultuser.email}} </div><hr>
            <div class="loadingDiv head3"> <b>State : </b>{{defaultuser.pos}}<br><b>StateCode : </b>{{defaultuser.scode}} </div>
            <div class="loadingDiv head2"> <b>GST : </b>{{defaultuser.gst}}<br><b>PAN : </b>{{defaultuser.pan}} </div><hr>
           `,
    client:`
              <span class="right cardOption" ng-click="popupShow('client')"><span>&#9778;</span></span>
              <div class="headText3">
                <b>Client Detail</b> <select class="select" ng-init="selectedclient = client[0]" ng-model="selectedclient" ng-options="x.name for x in client"></select>
              </div>
              <h2>{{selectedclient.name}}</h2> <hr>
              <div class="head2"> <b>{{selectedclient.address1}} <br> {{selectedclient.address2}} <br> {{selectedclient.address3}} </b></div>
              <div class="head3"> <b>Phone : </b>{{selectedclient.phone}} <br> <b>Email : </b>{{selectedclient.email}} </div><hr>
              <div class="head3"> <b>State : </b>{{selectedclient.pos}}<br><b>StateCode : </b>{{selectedclient.scode}} </div>
              <div class="head2"> <b>GST : </b>{{selectedclient.gst}}<br><b>PAN : </b>{{selectedclient.pan}} </div><hr>
            `,
    invoice:`
            <span class="right cardOption" ng-click="popupShow('invoice')"><span>&#9778;</span></span>
            <div class="headText3">
              <b>Invoice Detail</b>
              <select class="select" ng-model="selectedinvoice" ng-init="selectedinvoice = invoice[0]" ng-options="x.number for x in invoice"></select>
            </div>
            <h2>{{selectedinvoice.client.name}}</h2>
            <hr>
            <span class="head2">
              <b>Trade Date : </b>{{selectedinvoice.invoicedate}}<br>
              <b>Total Tax : </b>{{selectedinvoice.invoice.tax}}<br>
              <b>Total Amount : </b>{{selectedinvoice.invoice.amount}}</span>
            <hr>
            <span class="head3" ng-repeat="x in selectedinvoice.product">
              <b>Product : </b>{{x.name}}<br>
              <b>Amount : </b>{{x.amount}}<br>
              <b>Tax : </b>{{x.tax}}<br>
              <b>Total Amount : </b>{{x.total}}
            </span>
            <hr>
          `,
    product:`
              <span class="right cardOption" ng-click="popupShow('product')"><span>&#9778;</span></span>
              <div class="headText3">
                <b>Product Detail</b>
                <select class="select" ng-model="selectedproduct" ng-init="selectedproduct = product[0]" ng-options="x.name for x in product"></select>
              </div>
              <h2>{{selectedproduct.name}}</h2>
              <hr>
              <span class="head2">
                <b>SGSTe : </b>{{selectedproduct.sgst}}<br>
                <b>CGST : </b>{{selectedproduct.cgst}}<br>
                <b>IGST : </b>{{selectedproduct.igst}}
              </span><hr>
              <b>Is Price Fixed : </b>{{selectedproduct.isfixed}}<br>
              <b>Price : </b>{{selectedproduct.igst}}<hr>

            `

  }


  if(card.mode==='base'){ return baseHtml.base.replace(/######/g,card.type) }
  else{ return baseHtml[card.type] }

};



function getSVGIcon(a) {
  console.log(a);
  let svg = {

    base: `<i> <svg  style="width: 25px;" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" class=""></path></svg> </i>`,

    invoice: `<i> <svg  style="width: 20px;" viewBox="0 0 384 512"> <path fill="currentColor" d="M288 248v28c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-28c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm-12 72H108c-6.6 0-12 5.4-12 12v28c0 6.6 5.4 12 12 12h168c6.6 0 12-5.4 12-12v-28c0-6.6-5.4-12-12-12zm108-188.1V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48C0 21.5 21.5 0 48 0h204.1C264.8 0 277 5.1 286 14.1L369.9 98c9 8.9 14.1 21.2 14.1 33.9zm-128-80V128h76.1L256 51.9zM336 464V176H232c-13.3 0-24-10.7-24-24V48H48v416h288z" class=""></path></svg> </i>`,

    product: `<i> <svg  style="width: 25px;" viewBox="0 0 640 512"><path fill="currentColor" d="M128 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm-24-80h192v48h48v-48h192v48h48v-57.59c0-21.17-17.23-38.41-38.41-38.41H344v-64h40c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H256c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h40v64H94.41C73.23 224 56 241.23 56 262.41V320h48v-48zm264 80h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm240 0h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z" class=""></path></svg> </i>`,

    client: `<i> <svg  style="width: 25px;" viewBox="0 0 640 512"> <path fill="currentColor" d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z" class=""></path></svg> </i>`,

    user: `<i> <svg  style="width: 20px;" viewBox="0 0 448 512"> <path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm95.8 32.6L272 480l-32-136 32-56h-96l32 56-32 136-47.8-191.4C56.9 292 0 350.3 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-72.1-56.9-130.4-128.2-133.8z" class=""></path></svg> </i>`,

    menu: `<i> <svg  style="width: 20px;" viewBox="0 0 448 512"> <path fill="currentColor" d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z" class=""></path></svg> </i>`,

  }

  return svg[a];






}
