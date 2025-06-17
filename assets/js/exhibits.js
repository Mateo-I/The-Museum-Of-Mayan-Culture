function show(selected) {
  // Update dropdown textbox
  document.querySelector('.textBox').value = selected;

  // Hide all exhibit text contents
  document.querySelectorAll('.exhibit-content').forEach(section => {
    section.style.display = 'none';
  });

  // Hide all left images
  document.querySelectorAll('#image-left img').forEach(img => {
    img.style.display = 'none';
  });

  // Hide all centered images
  document.querySelectorAll('#image-centered img').forEach(img => {
    img.style.display = 'none';
  });

  // Hide centered image container by default
  document.getElementById('image-centered').style.display = 'none';

  // Show text for selected exhibit
  const id = selected.toLowerCase().replace(/\s/g, '-');
  const selectedContent = document.getElementById(id);
  if (selectedContent) {
    selectedContent.style.display = 'block';
  }

  if (selected.toLowerCase() === 'blueprint' || selected.toLowerCase() === 'extras') {
    // Show centered container and correct image
    document.getElementById('image-centered').style.display = 'flex';

    const imgId = selected.toLowerCase(); // e.g., 'blueprint' or 'extras'
    const img = document.getElementById(`image-${imgId}`);
    if (img) img.style.display = 'block';
  } else {
    // Show left image for other exhibits
    const imgId = 'image-exhibit-' + selected.toLowerCase().replace('exhibit ', '');
    const img = document.getElementById(imgId);
    if (img) img.style.display = 'block';
  }

  // Close dropdown menu
  document.querySelector('.dropdown').classList.remove('active');
}

// Zoom overlay and functionality
const zoomOverlay = document.createElement('div');
zoomOverlay.id = 'zoom-overlay';
zoomOverlay.style.cssText = `
  display:none;
  position:fixed;
  top:0; left:0;
  width:100vw; height:100vh;
  background:rgba(0,0,0,0.8);
  justify-content:center;
  align-items:center;
  z-index:9999;
  cursor: zoom-out;
`;
const zoomedImg = document.createElement('img');
zoomedImg.id = 'zoomed-image';
zoomedImg.style.cssText = `
  max-width:90vw;
  max-height:90vh;
  border-radius:10px;
  box-shadow:0 4px 30px rgba(0,0,0,0.8);
`;
zoomOverlay.appendChild(zoomedImg);
document.body.appendChild(zoomOverlay);

// Zoom on click of left images
document.getElementById('image-left').addEventListener('click', function(event) {
  if (event.target.tagName === 'IMG') {
    zoomedImg.src = event.target.src;
    zoomedImg.alt = event.target.alt;
    zoomOverlay.style.display = 'flex';
  }
});

// Close zoom on clicking outside image
zoomOverlay.addEventListener('click', function(event) {
  if (event.target === zoomOverlay) {
    zoomOverlay.style.display = 'none';
    zoomedImg.src = '';
  }
});

// Dropdown toggle behavior (unchanged)
let dropdown = document.querySelector('.dropdown');
dropdown.onclick = function(event) {
  event.stopPropagation();
  dropdown.classList.toggle('active');
};
document.addEventListener('click', function(event) {
  if (!dropdown.contains(event.target)) {
    dropdown.classList.remove('active');
  }
});