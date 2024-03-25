var emailLabel = document.querySelector("#loginEmailLabel"),
  email = document.querySelector("#loginEmail"),
  passwordLabel = document.querySelector("#loginPasswordLabel"),
  password = document.querySelector("#loginPassword"),
  showPasswordCheck = document.querySelector("#showPasswordCheck"),
  showPasswordToggle = document.querySelector("#showPasswordToggle"),
  mySVG = document.querySelector(".svgContainer"),
  twoFingers = document.querySelector(".twoFingers"),
  armL = document.querySelector(".armL"),
  armR = document.querySelector(".armR"),
  eyeL = document.querySelector(".eyeL"),
  eyeR = document.querySelector(".eyeR"),
  nose = document.querySelector(".nose"),
  mouth = document.querySelector(".mouth"),
  mouthBG = document.querySelector(".mouthBG"),
  mouthSmallBG = document.querySelector(".mouthSmallBG"),
  mouthMediumBG = document.querySelector(".mouthMediumBG"),
  mouthLargeBG = document.querySelector(".mouthLargeBG"),
  mouthMaskPath = document.querySelector("#mouthMaskPath"),
  mouthOutline = document.querySelector(".mouthOutline"),
  tooth = document.querySelector(".tooth"),
  tongue = document.querySelector(".tongue"),
  chin = document.querySelector(".chin"),
  face = document.querySelector(".face"),
  eyebrow = document.querySelector(".eyebrow"),
  outerEarL = document.querySelector(".earL .outerEar"),
  outerEarR = document.querySelector(".earR .outerEar"),
  earHairL = document.querySelector(".earL .earHair"),
  earHairR = document.querySelector(".earR .earHair"),
  hair = document.querySelector(".hair"),
  bodyBG = document.querySelector(".bodyBGnormal"),
  bodyBGchanged = document.querySelector(".bodyBGchanged");
var activeElement,
  curEmailIndex,
  screenCenter,
  svgCoords,
  emailCoords,
  emailScrollMax,
  chinMin = 0.5,
  dFromC,
  mouthStatus = "small",
  blinking,
  eyeScale = 1,
  eyesCovered = false,
  showPasswordClicked = false;
var eyeLCoords,
  eyeRCoords,
  noseCoords,
  mouthCoords,
  eyeLAngle,
  eyeLX,
  eyeLY,
  eyeRAngle,
  eyeRX,
  eyeRY,
  noseAngle,
  noseX,
  noseY,
  mouthAngle,
  mouthX,
  mouthY,
  mouthR,
  chinX,
  chinY,
  chinS,
  faceX,
  faceY,
  faceSkew,
  eyebrowSkew,
  outerEarX,
  outerEarY,
  hairX,
  hairS;

function calculateFaceMove(e) {
  var carPos = email.selectionEnd,
    div = document.createElement("div"),
    span = document.createElement("span"),
    copyStyle = getComputedStyle(email),
    caretCoords = {};
  if (carPos == null || carPos == 0) {
    carPos = email.value.length;
  }
  [].forEach.call(copyStyle, function (prop) {
    div.style[prop] = copyStyle[prop];
  });
  div.style.position = "absolute";
  document.body.appendChild(div);
  div.textContent = email.value.substr(0, carPos);
  span.textContent = email.value.substr(carPos) || ".";
  div.appendChild(span);

  if (email.scrollWidth <= emailScrollMax) {
    caretCoords = getPosition(span);
    dFromC = screenCenter - (caretCoords.x + emailCoords.x);
    eyeLAngle = getAngle(
      eyeLCoords.x,
      eyeLCoords.y,
      emailCoords.x + caretCoords.x,
      emailCoords.y + 25
    );
    eyeRAngle = getAngle(
      eyeRCoords.x,
      eyeRCoords.y,
      emailCoords.x + caretCoords.x,
      emailCoords.y + 25
    );
    noseAngle = getAngle(
      noseCoords.x,
      noseCoords.y,
      emailCoords.x + caretCoords.x,
      emailCoords.y + 25
    );
    mouthAngle = getAngle(
      mouthCoords.x,
      mouthCoords.y,
      emailCoords.x + caretCoords.x,
      emailCoords.y + 25
    );
  } else {
    eyeLAngle = getAngle(
      eyeLCoords.x,
      eyeLCoords.y,
      emailCoords.x + emailScrollMax,
      emailCoords.y + 25
    );
    eyeRAngle = getAngle(
      eyeRCoords.x,
      eyeRCoords.y,
      emailCoords.x + emailScrollMax,
      emailCoords.y + 25
    );
    noseAngle = getAngle(
      noseCoords.x,
      noseCoords.y,
      emailCoords.x + emailScrollMax,
      emailCoords.y + 25
    );
    mouthAngle = getAngle(
      mouthCoords.x,
      mouthCoords.y,
      emailCoords.x + emailScrollMax,
      emailCoords.y + 25
    );
  }

  eyeLX = Math.cos(eyeLAngle) * 20;
  eyeLY = Math.sin(eyeLAngle) * 2.5;

  eyeRX = Math.cos(eyeRAngle) * 20;
  eyeRY = Math.sin(eyeRAngle) * 2.5;

  noseX = Math.cos(noseAngle) * 6;
  noseY = Math.sin(noseAngle) * 6;

  mouthX = Math.cos(mouthAngle) * 4;
  mouthY = Math.sin(mouthAngle) * 4;

  chinX = Math.cos(noseAngle) * -8;
  chinY = Math.sin(noseAngle) * -8;
}
