import React from 'react';
import lottie from 'lottie-web';
import { defineElement } from 'lord-icon-element';

function VerifiactionLinkSent() {


  defineElement(lottie.loadAnimation);

  return (
    <div class='container-fluid'>
      <div class='row'>
        <div class='col-md-4'></div>
        <div class='col-md-4'>
          <div class='card'>
            <h5 class='card-header text-primary text-center'>
              Email verification sent
            </h5>
            <div class='card-body text-center'>
              <script src='https://cdn.lordicon.com/bhenfmcm.js'></script> 
              <lord-icon
                src='https://cdn.lordicon.com/gzmgulpl.json'
                trigger='loop'
                delay='300'
                colors='outline:#121331,primary:#4bb3fd,secondary:#ebe6ef'
                style={{ width: '200px', height: '200px' }}
              ></lord-icon>
              <p class='card-text'>
                Please check your inbox and click the link to verify your email
                address. If you don't see the email, check your spam folder.
              </p>
            </div>
          </div>
        </div>
        <div class='col-md-4'></div>
      </div>
    </div>
  );
}

export default VerifiactionLinkSent;