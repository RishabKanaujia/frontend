// QRCodeGenerator.js
import React, { useState } from 'react';
import QRCode from 'qrcode';


  const generateQRCode = async (text) => {

    try {
      const url = await QRCode.toDataURL(text);
      return url;
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  export default generateQRCode