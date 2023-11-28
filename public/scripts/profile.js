async function fetchProfilePicture() {
  try {
    const response = await fetch('/mydp');
    if (!response.ok) {
      throw new Error('Network Error');
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    const profileDpElement = document.getElementById('dp');
    const profileDP = document.getElementById('profileDP');

    if(profileDP) {
        profileDP.src = imageUrl;
    } 
    if(profileDpElement) {
        profileDpElement.src = imageUrl;
    }
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

fetchProfilePicture();
