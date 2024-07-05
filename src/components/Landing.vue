<template>
  <div class="main">
    <header class="d-flex align-items-center justify-content-center justify-content-md-between border-bottom">
      <img class="header-image" src="../assets/giphy.webp">
      <p class="head">Japanese National Blood Donation Program</p>
      <img class="header-image" src="../assets/Flag.gif">
    </header>
    <div class="row g-5">
      <div class="col-lg-3">
        <img src="../assets/blood_donation.avif" alt="bldonate" id="backimg"/>
      </div>
      <div class="col-md-7 col-lg-6">
        <br>
        <h4 class="mb-3">Registration Form for New Donors</h4>
        <form class="needs-validation" novalidate>
          <div class="row g-3">
            <div class="col-sm-4">
              <label for="firstName" class="form-label">First name</label>
              <input type="text" class="form-control" id="firstName" placeholder="" required>
              <div class="invalid-feedback">
                Valid first name is required.
              </div>
            </div>
            <div class="col-sm-4">
              <label for="middleName" class="form-label">Middle name (if you have)</label>
              <input type="text" class="form-control" id="middleName" placeholder="">
            </div>
            <div class="col-sm-4">
              <label for="lastName" class="form-label">Last name</label>
              <input type="text" class="form-control" id="lastName" placeholder="" required>
              <div class="invalid-feedback">
                Valid last name is required.
              </div>
            </div>

            <div class="col-md-5">
              <label for="country" class="form-label">Nationality</label>
              <select class="form-select" id="country" required>
                <option value="">Choose...</option>
                <option>Japanese(日本人)</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid city.
              </div>
            </div>

            <div class="col-12">
              <label for="phone" class="form-label">Phone Number</label>
              <input type="text" class="form-control" id="phone" placeholder="123-4567-7891" required>
              <div class="invalid-feedback">
                Please enter your phone number.
              </div>
            </div>

            <div class="col-12">
              <label for="email" class="form-label">Email <span class="text-body-secondary">(Optional)</span></label>
              <input type="email" class="form-control" id="email" placeholder="you@example.com">
              <div class="invalid-feedback">
                Please enter a valid email address.
              </div>
            </div>

            <hr class="my-4">
            <h3>Address</h3>
            <div class="col-md-5">
              <label for="prefecture" class="form-label">Prefecture</label>
              <select class="form-select" id="prefecture" v-model="selectedPrefecture" @change="updateCities" required>
                <option value="">Choose...</option>
                <option v-for="prefecture in prefectures" :key="prefecture">{{ prefecture }}</option>
              </select>
              <div class="invalid-feedback">
                Please select a valid prefecture.
              </div>
            </div>

            <div class="col-md-4">
              <label for="cities" class="form-label">City</label>
              <select class="form-select" id="cities" v-model="selectedCity" required>
                <option value="">Choose...</option>
                <option v-for="city in filteredCities" :key="city">{{ city }}</option>
              </select>
              <div class="invalid-feedback">
                Please provide a valid city.
              </div>
            </div>

            <div class="col-md-3">
              <label for="zip" class="form-label">Postal Code</label>
              <input type="text" class="form-control" id="zip" placeholder="" required>
              <div class="invalid-feedback">
                Zip code required.
              </div>
            </div>

            <div class="col-12">
              <label for="address" class="form-label">Address</label>
              <input type="text" class="form-control" id="address" placeholder="1234 Main St" required>
              <div class="invalid-feedback">
                Please enter your address.
              </div>
            </div>

            <hr class="my-4">
            <h4>Blood Type</h4>
            <div class="row gy-3">
              <div class="col-sm-6">
                <div class="form-check">
                  <input id="A+" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="A+">A+</label>
                </div>
                <div class="form-check">
                  <input id="B+" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="B+">B+</label>
                </div>
                <div class="form-check">
                  <input id="AB+" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="AB+">AB+</label>
                </div>
                <div class="form-check">
                  <input id="O+" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="O+">O+</label>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input id="A-" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="A-">A-</label>
                </div>
                <div class="form-check">
                  <input id="B-" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="B-">B-</label>
                </div>
                <div class="form-check">
                  <input id="AB-" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="AB-">AB-</label>
                </div>
                <div class="form-check">
                  <input id="O-" name="bloodType" type="radio" class="form-check-input" required>
                  <label class="form-check-label" for="O-">O-</label>
                </div>
              </div>
            </div>

            <hr class="my-4">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="same-address">
              <label class="form-check-label" for="same-address">I am 18+ years old</label>
            </div>

            <hr class="my-4">
            <button class="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <div class="col-lg-3">
        <div class="clock">
          {{ currentTime }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { ref, onMounted, computed } from 'vue';
import prefecturesData from '../data/perfecture.json';
import citiesData from '../data/cities.json';

export default {
  setup() {
    const currentTime = ref(moment().format('HH:mm:ss'));
    const prefectures = ref(prefecturesData);
    const cities = ref(citiesData);
    const selectedPrefecture = ref('');
    const selectedCity = ref('');

    const startClock = () => {
      setInterval(() => {
        currentTime.value = moment().format('HH:mm:ss');
      }, 1000);
    };

    onMounted(() => {
      startClock();
    });

    const updateCities = () => {
      if (selectedPrefecture.value) {
        selectedCity.value = ''; // Reset selected city when prefecture changes
      }
    };

    const filteredCities = computed(() => {
      return cities.value[selectedPrefecture.value] || [];
    });

    return {
      currentTime,
      prefectures,
      cities,
      selectedPrefecture,
      selectedCity,
      updateCities,
      filteredCities
    };
  },
};
</script>

<style scoped>
.head {
  color: darkred;
  font-weight: 900;
  font-size: xxx-large;
  align-items: center;
  font-family: "Sinhala Sangam MN";
}

header {
  background-color: black;
}

.header-image {
  width: 120px;
  height: 100px;
  margin-left: 30px;
  margin-right: 30px;
}

.main {
  color: black;
}

.hover-element {
  width: 200px;
  height: 50px;
  background-color: #ddd;
  text-align: center;
  line-height: 50px;
  cursor: pointer;
  margin-bottom: 10px;
}

.clock {
  font-size: 2em;
  font-family: 'Arial', sans-serif;
}
</style>
