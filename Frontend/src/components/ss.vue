<script>
import { ref, onMounted, computed } from 'vue';
import prefecturesData from '../data/perfecture.json';
import citiesData from '../data/cities.json';
import nationalityData from '../data/nationality.json';
import moment from 'moment';
import axios from 'axios';

export default {
  methods: {
    goToShowData() {
      this.$router.push({ name: 'ShowData' });
    },
    closeBanner() {
      this.showBanner = false;
    },
    updateSliderValue(val) {
      this.sliderValue = val; // Update the reactive slider value
    }
  },
  setup() {
    const currentTime = ref(moment().format('HH:mm:ss'));
    const prefectures = ref(prefecturesData);
    const cities = ref(citiesData);
    const national = ref(nationalityData);
    const selectedPrefecture = ref('');
    const selectedCity = ref('');
    const form = ref({
      fname: '',
      mname: '',
      lname: '',
      nationality: '',
      prefecture: '',
      city: '',
      phone_no: '',
      email: '',
      national_id: '',
      height: '',
      weight: '',
      postal_code: '',
      address: '',
      emergency_contact_number: '',
      allergies: '',
      medical_conditions: '',
      blood_related_diseases: '',
      blood_type: '',
      age_confirmation: false,
      consent_to_share: false,
    });
    const success = ref('');
    const response = ref('');
    const validationErrors = ref({});
    const sliderValue = ref(50); // Initialize slider value

    const startClock = () => {
      setInterval(() => {
        currentTime.value = moment().format('HH:mm:ss');
      }, 1000);
    };

    onMounted(() => {
      startClock();
    });

    const updateCities = () => {
      selectedCity.value = '';
      form.value.city = '';
    };

    const filteredCities = computed(() => {
      return cities.value[form.value.prefecture] || [];
    });

    const validateForm = () => {
      let errors = {};
      // Validation logic remains unchanged...
      return errors;
    };

    const submitForm = async () => {
      validationErrors.value = validateForm();
      if (Object.keys(validationErrors.value).length > 0) {
        alert('Please fix the validation errors');
        return;
      }

      try {
        const result = await axios.post('http://localhost:3000/api/donors', form.value, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        success.value = 'Data saved successfully';
        response.value = JSON.stringify(result.data, null, 2);
        resetForm();
        router.push({ name: 'ShowData' });
      } catch (error) {
        console.error('Error submitting data:', error);
        response.value = 'Error: ' + (error.response ? error.response.status : error.message);
      }
    };

    const resetForm = () => {
      form.value = {
        fname: '',
        mname: '',
        lname: '',
        nationality: '',
        prefecture: '',
        city: '',
        phone_no: '',
        email: '',
        national_id: '',
        height: '',
        weight: '',
        postal_code: '',
        address: '',
        emergency_contact_number: '',
        allergies: '',
        medical_conditions: '',
        blood_related_diseases: '',
        blood_type: '',
        age_confirmation: false,
        consent_to_share: false,
      };
      selectedPrefecture.value = '';
      selectedCity.value = '';
      sliderValue.value = 50; // Reset slider value
    };

    return {
      currentTime,
      prefectures,
      cities,
      national,
      selectedPrefecture,
      selectedCity,
      updateCities,
      filteredCities,
      form,
      success,
      response,
      validationErrors,
      validateForm,
      submitForm,
      resetForm,
      sliderValue, // Expose slider value
      showBanner: true,
    };
  }
};
</script>


<template>
  <head>
  </head>
  <body class="main">
  <div v-if="showBanner" class="banner">
      <span class="banner-text">Name: Nanayakkara Weragoda Vidanalage Chamod Kanishka Chathuranga | ID: M23W0628</span>
      <button class="close-btn" @click="closeBanner">X</button>
    <div class="time-display ">{{ currentTime }}</div>
    </div>
  <header class="d-flex align-items-center justify-content-center justify-content-md-between border-bottom">
    <img class="header-image" src="../assets/Flag.gif" alt="Flag Image">
    <p class="head">Japanese National Blood Donation Program</p>
    <img class="header-image" src="../assets/Flag.gif" alt="Flag Image">
  </header>

  <div class="image-container">
    <img src="../assets/mainimage2.jpg" alt="Blood Donation" class="full-size-image">
    <div class="form-container">
    <h4 class="form-title">Registration Form for New Donors</h4>
      <form @submit.prevent="submitForm" class="needs-validation" novalidate="">
        <div class="row g-3">
          <h4 class="sub-title">Personal Details</h4>
          <hr style="margin-top: -2px">
          <div class="col-sm-4">
              <label for="firstName" class="form-label">First name</label>
              <input type="text"
                     class="form-control"
                     id="firstName"
                     v-model="form.fname"
                     placeholder="First Name"
                     :class="{ 'is-invalid': validationErrors.fname }">
              <div class="invalid-feedback">
                {{ validationErrors.fname }}
              </div>
            </div>
          <div class="col-sm-4">
              <label for="middleName" class="form-label">Middle name (if you have)</label>
              <input type="text"
                     class="form-control"
                     id="middleName"
                     placeholder="Middle Name"
                     v-model="form.mname">
              <div class="invalid-feedback">
                Valid middle name is required.
              </div>
            </div>
         <div class="col-sm-4">
              <label for="lastName" class="form-label">Last name</label>
              <input type="text"
                     class="form-control"
                     id="lastName"
                     v-model="form.lname"
                     placeholder="Last Name"
                     :class="{ 'is-invalid': validationErrors.lname }">
              <div class="invalid-feedback">
                {{ validationErrors.lname }}
              </div>
            </div>
         <div class="col-md-5">
            <label for="nationality" class="form-label">Nationality</label>
            <select class="form-select" id="nationality"
                    v-model="form.nationality"
                    :class="{ 'is-invalid': validationErrors.nationality }">
              <option value="">Choose...</option>
              <option v-for="nation in national"
                      :key="nation" :value="nation">{{ nation }}</option>
            </select>
            <div class="invalid-feedback">
              {{ validationErrors.nationality }}
            </div>
          </div>
          <div class="col-12">
              <label for="phone" class="form-label">Phone Number</label>
              <input type="text"
                     class="form-control"
                     id="phoneNumber"
                     v-model="form.phone_no"
                     placeholder="Phone Number"
                     :class="{ 'is-invalid': validationErrors.phone_no }">
              <div class="invalid-feedback">
                {{ validationErrors.phone_no }}
              </div>
            </div>
          <div class="col-12">
          <label for="email" class="form-label">Email</label>
          <input type="email"
                 class="form-control"
                 id="email"
                 v-model="form.email"
                 placeholder="you@example.com"
                 :class="{ 'is-invalid': validationErrors.email }">
              <div class="invalid-feedback">
                {{ validationErrors.email }}
              </div>
            </div>
          <div class="col-12">
              <label for="nationalId" class="form-label">National ID</label>
              <input type="text"
                     class="form-control"
                     id="nationalId"
                     v-model="form.national_id"
                     placeholder="National ID"
                     :class="{ 'is-invalid': validationErrors.national_id }">
              <div class="invalid-feedback">
                {{ validationErrors.national_id }}
              </div>
            </div>
          <div class="col-md-5">
              <label for="height" class="form-label">Height (cm)</label>
              <input type="number"
                     class="form-control"
                     id="height"
                     v-model="form.height"
                     placeholder="Height"
                     :class="{ 'is-invalid': validationErrors.height }">
              <div class="invalid-feedback">
                {{ validationErrors.height }}
              </div>
            </div>
          <div class="col-md-5">
              <label for="weight" class="form-label">Weight (kg)</label>
              <input type="number"
                     class="form-control"
                     id="weight"
                     v-model="form.weight"
                     placeholder="Weight"
                     :class="{ 'is-invalid': validationErrors.weight }">
              <div class="invalid-feedback">
                {{ validationErrors.weight }}
              </div>
            </div>
          <div class="col-md-5">
            <label for="prefecture" class="form-label">Prefecture</label>
            <select class="form-select" id="prefecture"
                    v-model="form.prefecture"
                    @change="updateCities"
                    :class="{ 'is-invalid': validationErrors.prefecture }">
              <option value="">Choose...</option>
              <option v-for="pref in prefectures" :key="pref" :value="pref">{{ pref }}</option>
            </select>
            <div class="invalid-feedback">
              {{ validationErrors.prefecture }}
            </div>
          </div>

          <div class="col-md-5">
            <label for="city" class="form-label">City</label>
            <select class="form-select" id="city"
                    v-model="form.city"
                    :class="{ 'is-invalid': validationErrors.city }">
              <option value="">Choose...</option>
              <option v-for="city in filteredCities" :key="city" :value="city">{{ city }}</option>
            </select>
            <div class="invalid-feedback">
              {{ validationErrors.city }}
            </div>
          </div>
          <div class="col-md-5">
              <label for="postalCode" class="form-label">Postal Code</label>
              <input type="text"
                     class="form-control"
                     id="postalCode"
                     v-model="form.postal_code"
                     placeholder="Postal Code"
                     :class="{ 'is-invalid': validationErrors.postal_code }">
              <div class="invalid-feedback">
                {{ validationErrors.postal_code }}
              </div>
            </div>
          <div class="col-12">
              <label for="address" class="form-label">Address</label>
              <input type="text"
                     class="form-control"
                     id="address"
                     v-model="form.address"
                     placeholder="Address"
                     :class="{ 'is-invalid': validationErrors.address }">
              <div class="invalid-feedback">
                {{ validationErrors.address }}
              </div>
            </div>
          <div class="col-12">
              <label for="emergencyContact" class="form-label">Emergency Contact Number</label>
              <input type="text"
                     class="form-control"
                     id="emergencyContact"
                     v-model="form.emergency_contact_number"
                     placeholder="Emergency Contact Number">
            </div>
        </div>
        <hr class="my-4">
        <div class="row g-3">
          <h4 class="sub-title">Medical History</h4>
          <hr style="margin-top: -2px">
          <div class="col-12">
              <label for="allergies" class="form-label">Allergies</label>
              <textarea class="form-control"
                        id="allergies"
                        v-model="form.allergies"
                        placeholder="Allergies"></textarea>
            </div>
          <div class="col-12">
              <label for="medicalConditions" class="form-label">Medical Conditions</label>
              <textarea class="form-control"
                        id="medicalConditions"
                        v-model="form.medical_conditions"
                        placeholder="Medical Conditions"></textarea>
            </div>
          <div class="col-12">
              <label for="bloodRelatedDiseases" class="form-label">Blood Related Diseases</label>
              <textarea class="form-control"
                        id="bloodRelatedDiseases"
                        v-model="form.blood_related_diseases"
                        placeholder="Blood Related Diseases"></textarea>
            </div>
          <div class="col-12">
              <label for="bloodtype" class="form-label">Blood Type</label>
              <div class="row gy-2">
                <div class="col-sm-6">
                  <div class="form-check">
                    <input id="A+" name="bloodType" type="radio" class="form-check-input" value="A+" v-model="form.blood_type" required>
                    <label class="form-check-label" for="A+">A+</label>
                  </div>
                  <div class="form-check">
                    <input id="B+" name="bloodType" type="radio" class="form-check-input" value="B+" v-model="form.blood_type" required>
                    <label class="form-check-label" for="B+">B+</label>
                  </div>
                  <div class="form-check">
                    <input id="AB+" name="bloodType" type="radio" class="form-check-input" value="AB+" v-model="form.blood_type" required>
                    <label class="form-check-label" for="AB+">AB+</label>
                  </div>
                  <div class="form-check">
                    <input id="O+" name="bloodType" type="radio" class="form-check-input" value="O+" v-model="form.blood_type" required>
                    <label class="form-check-label" for="O+">O+</label>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="form-check">
                    <input id="A-" name="bloodType" type="radio" class="form-check-input" value="A-" v-model="form.blood_type" required>
                    <label class="form-check-label" for="A-">A-</label>
                  </div>
                  <div class="form-check">
                    <input id="B-" name="bloodType" type="radio" class="form-check-input" value="B-" v-model="form.blood_type" required>
                    <label class="form-check-label" for="B-">B-</label>
                  </div>
                  <div class="form-check">
                    <input id="AB-" name="bloodType" type="radio" class="form-check-input" value="AB-" v-model="form.blood_type" required>
                    <label class="form-check-label" for="AB-">AB-</label>
                  </div>
                  <div class="form-check">
                    <input id="O-" name="bloodType" type="radio" class="form-check-input" value="O-" v-model="form.blood_type" required>
                    <label class="form-check-label" for="O-">O-</label>
                  </div>
                </div>
              </div>
              <div v-if="validationErrors.blood_type" class="invalid-feedback d-block">
                {{ validationErrors.blood_type }}
              </div>
            </div>

          <div class="col-12">
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       id="ageConfirmation"
                       v-model="form.age_confirmation">
                <label class="form-check-label" for="ageConfirmation">
                  I confirm that I am 18 years of age or older
                </label>
              </div>
            <div class="slider-container slider" >
              <label for="range">Select the Age:</label>
              <input type="range" id="range" min="18" max="70" v-model="sliderValue" @input="updateSliderValue(sliderValue)">
              <span>{{ sliderValue }}</span>
            </div>
            <div class="textbox-container">
              <label for="numberInput">Enter Age</label>
              <input
                type="number"
                id="numberInput"
                min="18"
                max="70"
                v-model="sliderValue"
                @input="updateTextboxValue(sliderValue)"
              >
            </div>
            </div>
          <div class="col-12">
              <div class="form-check">
                <input class="form-check-input"
                       type="checkbox"
                       id="termsAndConditions"
                       v-model="form.terms_and_conditions"
                       required>
                <label class="form-check-label" for="termsAndConditions">
                  I agree to the terms and conditions
                </label>
                <div class="invalid-feedback">
                  You must agree to the terms and conditions before submitting.
                </div>
              </div>
            </div>
        </div>
        <hr class="my-4">
        <div class="col-12">
              <button class="btn btn-primary" type="submit" :disabled="isSubmitting">
                 Submit
               </button>
        </div>
      </form>
      <div class="col-12">
      <button  class="btn btn-primary" type="submit"  @click="goToShowData">Go to ShowData Page</button>
      </div>
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

.form-title {
  color: #850B2C;
  text-align: center;
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 25px;
}

.sub-title {
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
  background-color: #A00E34;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  z-index: 1;
  margin-top: 30px;
}

.banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #A00E34;
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1000;
}

.banner-text {
  font-size: 18px;
  margin-left: 20px;
}

.close-btn {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 20px;
  margin-right: 20px;
  cursor: pointer;
  opacity: 0.9;
}

.close-btn:hover {
  color: #FF4757;
}

.slider-container {
  margin-bottom: 20px;
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Label styles */
.slider-container label,
.textbox-container label {
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
}

/* Range input styles */
input[type="range"] {
  width: 100%;
  -webkit-appearance: none;
  background: #ddd;
  border-radius: 5px;
  height: 8px;
  outline: none;
  opacity: 0.9;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  background: #A00E34;
  border-radius: 50%;
  cursor: pointer;
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: #A00E34;
  border-radius: 50%;
  cursor: pointer;
}

/* Textbox container styles */
.textbox-container {
  background: #fff;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  opacity: 0.9;
}

/* Number input styles */
input[type="number"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s ease;
  opacity: 0.9;
}

input[type="number"]:focus {
  border-color: #A00E34;
}

/* Span styles */
.slider-container span {
  font-size: 18px;
  font-weight: bold;
  margin-top: 10px;
  display: inline-block;
}
</style>