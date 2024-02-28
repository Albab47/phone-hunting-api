const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  if (data.status === false) {
    document.getElementById("phoneContainer").innerText = "Phone not found. Please search again"
  }

  const phones = data.data;
  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  // get ref of container div
  const phoneContainer = document.getElementById("phoneContainer");
  const showAll = document.getElementById('showAll')
  // clear container
  phoneContainer.textContent = "";

  if (phones.length > 9 && !isShowAll) {
    showAll.classList.remove('hidden');
  } else {
    showAll.classList.add('hidden');
  }

  if (!isShowAll) {
    phones = phones.slice(0,9);
  }
  
  phones.forEach((phone) => {
    // 2. create a div
    const phoneCard = document.createElement("div");
    phoneCard.classList = `card bg-gray-50 border`;
    // 3. set inner HTML
    phoneCard.innerHTML = `
      <figure class="px-10 pt-10">
        <img src="${phone.image}" alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
      <div class="card-actions">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn bg-blue-600 text-white">Show details</button>
      </div>
    </div>`;
    // append child
    phoneContainer.appendChild(phoneCard);
  });
  toggleLoadingSpinner(false);
};

// handle search button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.querySelector('.loading-spinner')
  if (isLoading) {
    loadingSpinner.parentElement.classList.remove('hidden');
  } else {
    loadingSpinner.parentElement.classList.add('hidden');
  }
}

const handleShowAll = () => {
  handleSearch(true)
}

const handleShowDetail = async(id) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone)
}

const showPhoneDetails = (phone) => {
  console.log(phone)
  const phoneName = document.getElementById('showDetailsPhoneName');
  phoneName.textContent = phone.name;
  const showDetailsContent = document.getElementById('showDetailsContent');
  showDetailsContent.innerHTML = `
    <img src="${phone.image}" />
    <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
    <p><span class="font-bold">Display size: </span>${phone?.mainFeatures?.displaySize}</p>
    <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
    <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
    <p><span class="font-bold">Slug: </span>${phone?.slug}</p>
    <p><span class="font-bold">Release data: </span>${phone?.releaseDate}</p>
    <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
    <p><span class="font-bold">GPS: </span>${phone.others?.GPS || "no GPS"}</p>
  `;

  showDetails.showModal();
}