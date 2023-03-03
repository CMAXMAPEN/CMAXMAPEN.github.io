"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

window.addEventListener("load", setupGallery);

function setupGallery() {
   //------
   //for the favourite section
   let favCount = favFiles.length;
   console.log(favCount);
   let favBox = document.getElementById("fav");
   
   let favTitle = document.createElement("h1");
   favTitle.id = "favTitle";
   let favSlidesTitle = favboxTitle;
   favTitle.textContent = favSlidesTitle;
   favBox.appendChild(favTitle);

   let favslideBox = document.createElement("div");
   favslideBox.id = "favslideBox";
   favBox.appendChild(favslideBox);
//------
//for the remove button
   let favremoveBox = document.getElementById("remove");
   let removeslideBox = document.createElement("div");
   removeslideBox.id = "removeslideBox"; 
   favremoveBox.appendChild(removeslideBox);

 
   
   
   
   
   
   
//--------
//for the image gallery
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("lightbox");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   let slidesTitle = lightboxTitle; //todo figure out
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   

   
   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }

   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }

      modalWindow.appendChild(closeBox);

      let addBox = document.createElement("div");
      addBox.id = "hhhh";
      addBox.innerHTML = "Add to fav";

      //make a new image in the slide box when add to fav is clicked
      addBox.onclick = function() {
         //console.log("amount of images "+favFiles.length);
         if(favCount>=5)
         {
            window.alert("Favourite list full, remove at least 1 image first");
         }
         else{
            let isDupe = false;
            for(let i = 0; i<favFiles.length; i++)
            {
               if(favFiles[i] == modalImage.src)
               {
                  window.alert("This is a duplicate image, cannot add to favourites");
                  isDupe = true;
               }
               
            } //end of loop
               if(isDupe == false)
               {
                  //console.log("made it");
                  let image = document.createElement("img"); //create an image element
            favFiles.unshift(modalImage.src); //insert the image into the favourite files images array
            favCount = favFiles.length;
            image.src = favFiles[0]; //make the image element have the same image as the one just added to the array
            image.onclick = createFavModal; //when clicked, make the overlay with it
            favslideBox.appendChild(image); //append the image to the slidebox 
            //the remove button is under the image
            let toRemove = document.createElement("div");
            toRemove.id = "toRemove";
            toRemove.innerHTML = "Remove from fav";
            removeslideBox.appendChild(toRemove);
         
         toRemove.addEventListener("click", function(e){
            let index = Array.from(toRemove.parentElement.children).indexOf(toRemove);
            removeslideBox.removeChild(removeslideBox.childNodes[index]);
            favslideBox.removeChild(favslideBox.childNodes[index]);
            favFiles.splice(index, 1);
            favCount -=1;
            //console.log("favCount: "+favFiles.length);
         })
               }


         }
         //console.log("amount of images after ifs: "+favFiles.length);
      }
      modalWindow.appendChild(addBox);
      document.body.appendChild(modalWindow);
   }

   function createFavModal()
   {
      let modalWindow = document.createElement("div");
      modalWindow.id = "lbOverlay";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let closeBox = document.createElement("div");
      closeBox.id = "lbOverlayClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      modalWindow.appendChild(closeBox);

      document.body.appendChild(modalWindow);
   }
}