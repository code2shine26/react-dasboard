
export function isValidPecent (percentInput)  {
        // check it is a number and betwen 0 - 100
        console.log('validat percent called',percentInput);
        let numberPattern = /^\d+$/;
        console.log('regx',numberPattern.test(percentInput));
         return ((numberPattern.test(percentInput) && 
         (+percentInput >= 0 && +percentInput <=100)))
      }
