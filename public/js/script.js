(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

//Tax Switches
let taxSwitch = document.getElementById("taxSwitch");
taxSwitch.addEventListener("click", () => {
  let taxInfo = document.getElementsByClassName("tax-info");
  for (taxes of taxInfo) {
    if (taxes.style.display !== "inline") {
      taxes.style.display = "inline";
    } else {
      taxes.style.display = "none";
    }
  }
});

//filters for icons
let filters = document.querySelectorAll(".filter");
let listingCategory = document.querySelectorAll(".listing-links");

filters.forEach((f) => {
  f.addEventListener("click", () => {
    const selectedFilter = f.id;

    listingsData.forEach((list, index) => {
      const selectedCategory = list.category;
  
      if (selectedFilter === selectedCategory) {
        listingCategory[index].style.display = "block";
      } else {
        listingCategory[index].style.display = "none";
      }
    });
  });
});

//search logic
const searchInput = document.querySelector(".search-input");
const listingElements = document.querySelectorAll(".listing-links");

searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  listingsData.forEach((list, index) => {
    const listTitle = list.title.toLowerCase().startsWith(value);
    const listCategory = list.category.toLowerCase().startsWith(value);
    if (listTitle || listCategory) {
      listingElements[index].style.display = "block";
    } else {
      listingElements[index].style.display = "none";
    }
  });
});
