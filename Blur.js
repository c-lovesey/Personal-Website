const blob = document.getElementById('blob')//gets the css element blob

document.addEventListener('mousemove', event => { //adds a listener for mousemove
  const { clientX, clientY } = event;

  blob.animate( //moves blob to the mouse position
    {
      left: `${clientX}px`,
      top: `${clientY}px`,
    },
    { duration: 3000, fill: 'forwards' }
  );
});

const track = document.getElementById("image-track"); //gets the image track element

const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;  //finds position where the mouse is clicked down at

const handleOnUp = () => {  //when the m1 button is released the new percentage is saved and the mouseDownAt variable is reset to
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return; //checks if mousedownat is 0 and retur
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX, //
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100,  //calculates the new starting point for calculating the percantage
        nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  
  track.dataset.percentage = nextPercentage;
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
  
  for(const image of track.getElementsByClassName("image")) { //creates the parralax effect on the images
    image.animate({
      objectPosition: `${100 + nextPercentage}% center` 
    }, { duration: 1200, fill: "forwards" });
  }
}

//touch event handling, not sure 

window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);



const navBtn = document.querySelector('#nav-btn');
const navMenu = document.querySelector('#nav-menu');
const menu = document.querySelector('#menu');

navBtn.addEventListener('click', () => {  //simple button which shows a dropdown menu of links
  if (navMenu.classList.contains('show-menu')) {
    navMenu.classList.remove('show-menu');
    navMenu.classList.add('hide-menu');
    setTimeout(() => {
      navMenu.style.display = 'none';
      menu.style.opacity = 0; // set the opacity of the title to 0 to make it disappear
    }, 500);
  } else {
    navMenu.style.display = 'block';
    navMenu.classList.remove('hide-menu');
    navMenu.classList.add('show-menu');
  }
});



