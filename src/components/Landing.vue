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

<template>
  <head>
  </head>
  <body class="main">
  <header class="d-flex align-items-center justify-content-center justify-content-md-between border-bottom">
    <img class="header-image" src="../assets/Flag.gif" alt="Flag Image">
    <p class="head">Japanese National Blood Donation Program</p>
    <img class="header-image" src="../assets/Flag.gif" alt="Flag Image">
  </header>

  <div class="image-container">
    <img src="../assets/mainimage2.jpg" alt="Blood Donation" class="full-size-image">
    <div class="time-display">{{ currentTime }}</div>
    <div class="form-container">
    <h4 class="form-title">Registration Form for New Donors</h4>
      <form class="needs-validation" novalidate="">
        <div class="row g-3">
          <h4 class="sub-title">Personal Details</h4>
          <hr style="margin-top: -2px">
          <div class="col-sm-4">
            <label for="firstName" class="form-label">First name</label>
            <input type="text" class="form-control" id="firstName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid first name is required.
            </div>
          </div>
          <div class="col-sm-4">
            <label for="middleName" class="form-label">Middle name (if you have)</label>
            <input type="text" class="form-control" id="middleName" placeholder="" value="">
            <div class="invalid-feedback">
              Valid middle name is required.
            </div>
          </div>
          <div class="col-sm-4">
            <label for="lastName" class="form-label">Last name</label>
            <input type="text" class="form-control" id="lastName" placeholder="" value="" required="">
            <div class="invalid-feedback">
              Valid last name is required.
            </div>
          </div>
          <div class="col-md-5">
            <label for="country" class="form-label">Nationality</label>
            <select class="form-select" id="country" required="">
              <option value="">Choose...</option>
              <option>Japanese (日本人)</option>
            </select>
            <div class="invalid-feedback">
              Please select a valid nationality.
            </div>
          </div>
          <div class="col-12">
            <label for="phone" class="form-label">Phone Number</label>
            <input type="text" class="form-control" id="phone" placeholder="123-4567-7891" required="">
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
          <div class="col-12">
            <label for="nationalId" class="form-label">National ID</label>
            <input type="text" class="form-control" id="nationalId" placeholder="123456789" required="">
            <div class="invalid-feedback">
              Please enter your National ID.
            </div>
          </div>
          <div class="col-md-6">
            <label for="height" class="form-label">Height (cm)</label>
            <input type="number" class="form-control" id="height" placeholder="170" required="">
            <div class="invalid-feedback">
              Please enter your height.
            </div>
          </div>
          <div class="col-md-6">
            <label for="weight" class="form-label">Weight (kg)</label>
            <input type="number" class="form-control" id="weight" placeholder="70" required="">
            <div class="invalid-feedback">
              Please enter your weight.
            </div>
          </div>
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
            <label for="city" class="form-label">City</label>
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
            <input type="text" class="form-control" id="zip" placeholder="" required="">
            <div class="invalid-feedback">
              Zip code required.
            </div>
          </div>
          <div class="col-12">
            <label for="address" class="form-label">Address</label>
            <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="">
            <div class="invalid-feedback">
              Please enter your address.
            </div>
          </div>
          <div class="col-12">
            <label for="emergencyContact" class="form-label">Emergency Contact Number</label>
            <input type="text" class="form-control" id="emergencyContact" placeholder="987-6543-210" required="">
            <div class="invalid-feedback">
              Please enter an emergency contact number.
            </div>
          </div>
        </div>
        <hr class="my-4">
        <div class="row g-3">
          <h4 class="sub-title">Medical History</h4>
          <hr style="margin-top: -2px">
          <div class="col-12">
            <label for="allergies" class="form-label">Allergies</label>
            <textarea class="form-control" id="allergies" rows="3" placeholder="List any allergies you have"></textarea>
            <div class="invalid-feedback">
              Please enter any allergies.
            </div>
          </div>
          <div class="col-12">
            <label for="medicalConditions" class="form-label">Medical Conditions</label>
            <textarea class="form-control" id="medicalConditions" rows="3" placeholder="List any medical conditions you have"></textarea>
            <div class="invalid-feedback">
              Please enter any medical conditions.
            </div>
          </div>
          <div class="col-12">
            <label for="bloodDiseases" class="form-label">Blood-Related Diseases</label>
            <textarea class="form-control" id="bloodDiseases" rows="3" placeholder="List any blood-related diseases you have"></textarea>
            <div class="invalid-feedback">
              Please enter any blood-related diseases.
            </div>
          </div>
          <div class="col-12">
            <label for="bloodtype" class="form-label">Blood Type</label>
            <div class="row gy-2">
              <div class="col-sm-6">
                <div class="form-check">
                  <input id="A+" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="A+">A+</label>
                </div>
                <div class="form-check">
                  <input id="B+" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="B+">B+</label>
                </div>
                <div class="form-check">
                  <input id="AB+" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="AB+">AB+</label>
                </div>
                <div class="form-check">
                  <input id="O+" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="O+">O+</label>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-check">
                  <input id="A-" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="A-">A-</label>
                </div>
                <div class="form-check">
                  <input id="B-" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="B-">B-</label>
                </div>
                <div class="form-check">
                  <input id="AB-" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="AB-">AB-</label>
                </div>
                <div class="form-check">
                  <input id="O-" name="bloodType" type="radio" class="form-check-input" required="">
                  <label class="form-check-label" for="O-">O-</label>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="same-address">
              <label class="form-check-label" for="same-address">I am 18+ years old</label>
            </div>
          </div>
          <div class="col-12">
            <div class="form-check">
              <input type="checkbox" class="form-check-input" id="consentToShare">
              <label class="form-check-label" for="consentToShare">Consent to Share Information with Medical Staff</label>
            </div>
          </div>
        </div>
        <hr class="my-4">
        <button class="w-100 btn btn-primary btn-lg" type="submit">Submit</button>
        <button class="w-100 btn btn-primary btn-lg" type="submit">View Data</button>
      </form>
    </div>
  </div>
  <footer class="footer">
    <p>© 2024 Japanese National Blood Donation Program</p>
  </footer>
  </body>
</template>

<style scoped>


header {
  background-color: white;
  color: #970A30;
  padding: 20px 0;
  box-shadow: 0 4px 8px;
  border-radius: 10px;
  border-color: #A00E34;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
}


.d-flex {
  display: flex;
}

.align-items-center {
  align-items: center;
}

.justify-content-center {
  justify-content: center;
}

.justify-content-md-between {
  justify-content: space-between;
}

.header-image {
  width: 120px;
  height: auto;
  margin-left: 30px;
  margin-right: 30px;
}

.head {
  font-size: 40px;
  font-weight: bold;
  text-align: center;
  margin: 0;
  letter-spacing: 1px;
  flex-grow: 1;
}

.main {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 80%;
}

.form-container h4 {
  color: #A00E34;
}
.btn-primary {
  background-color: #A00E34;
  border: none;
  margin-top: 8px;
  font-size: 14px;
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 0 auto 8px auto;
}

.btn-primary:hover {
  background-color: #FF4757;
}

.btn-secondary {
  background-color: #A00E34;
  border: none;
  margin-top: 8px;
  padding: 8px 20px;
  font-size: 14px;
  width: 100%;
  max-width: 200px;
  display: block;
  margin: 8px auto;
}

.btn-secondary:hover {
  background-color: #FF4757;
}

.footer {
  background-color: #970A30;
  color: #FFFFFF;

  text-align: center;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 20px;
  width: 100%;
}

.form-control {
  border: 1px solid #A00E34;
}
.form-title{
  color: #850B2C;
  text-align: center;
  font-weight:bold;
  font-size:25px;
  margin-bottom: 25px;
}
.sub-title{
  font-size: 21px;
}
.image-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  margin-top: 50px;
}

.full-size-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.9);
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  max-width: 80%;
  max-height: 90%;
  overflow-y: auto;
}

body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #A00E34;
}
.time-display {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color:#A00E34;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
}
</style>